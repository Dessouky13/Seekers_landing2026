import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from './Reveal';

/**
 * ParticleHero — a GPU particle cloud that morphs: first the Seekers logo MARK,
 * then it "writes" the full SEEKERS wordmark, then an agent/robot face. Both the
 * mark and wordmark are sampled from the real logo PNGs in /public (auto-cropped
 * to their opaque bounds), recolored to the Seekers brand. Mouse + scroll
 * parallax, mobile scaling, and prefers-reduced-motion support.
 */

const SHAPE_NAMES = ['Seekers', 'Seekers AI', 'Autonomous Agents'];

const ParticleHero: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeShape, setActiveShape] = useState(0);
  // exposed so dot-nav can request a jump into the running animation
  const jumpRef = useRef<((idx: number) => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = prefersReducedMotion();
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 12000 : 30000;

    // Preload the logo MARK (S-symbol) and the full WORDMARK so the particles
    // can show the mark, then "write" the rest of the logo.
    const symbolImg = new Image();
    symbolImg.src = '/seekers-symbol.png';
    const wordImg = new Image();
    wordImg.src = '/seekers-logo.png';

    // ---- renderer ----
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.3;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.4);

    // ---- text rasterizer ----
    function rasterizeText(text: string, fontSize: number, CW: number, CH: number) {
      const cvs = document.createElement('canvas');
      cvs.width = CW;
      cvs.height = CH;
      const ctx = cvs.getContext('2d')!;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, CW, CH);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const words = text.split(' ');
      if (words.length > 2 && text.length > 12) {
        const mid = Math.ceil(words.length / 2);
        const fs1 = fontSize * 0.9;
        ctx.font = `bold ${fs1}px "Space Grotesk", sans-serif`;
        ctx.fillText(words.slice(0, mid).join(' '), CW / 2, CH / 2 - fs1 * 0.6);
        ctx.fillText(words.slice(mid).join(' '), CW / 2, CH / 2 + fs1 * 0.6);
      } else {
        ctx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
        ctx.fillText(text, CW / 2, CH / 2);
      }
      return ctx.getImageData(0, 0, CW, CH);
    }

    function textToParticles(text: string, count: number, sx: number, sy: number, fs: number) {
      const CW = 512, CH = 256;
      const data = rasterizeText(text, fs, CW, CH).data;
      const bright: [number, number][] = [];
      for (let y = 0; y < CH; y++) {
        for (let x = 0; x < CW; x++) {
          if (data[(y * CW + x) * 4] > 128) bright.push([x, y]);
        }
      }
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        if (!bright.length) {
          pos[i * 3] = (Math.random() - 0.5) * 6;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
          continue;
        }
        const p = bright[(Math.random() * bright.length) | 0];
        pos[i * 3] = (p[0] / CW - 0.5) * sx + (Math.random() - 0.5) * 0.04;
        pos[i * 3 + 1] = -(p[1] / CH - 0.5) * sy + (Math.random() - 0.5) * 0.04;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      }
      return pos;
    }

    // ---- image (logo) → particles ----
    // Samples opaque pixels of a transparent PNG, auto-crops to the content's
    // bounding box (so padding never matters), then fits it to `targetW` world
    // units preserving aspect ratio. Returns positions + the fitted height.
    function imageToParticles(img: HTMLImageElement, count: number, targetW: number) {
      const CW = 600;
      const CH = Math.max(1, Math.round((CW * img.naturalHeight) / (img.naturalWidth || 1)));
      const cvs = document.createElement('canvas');
      cvs.width = CW;
      cvs.height = CH;
      const ctx = cvs.getContext('2d')!;
      ctx.clearRect(0, 0, CW, CH);
      ctx.drawImage(img, 0, 0, CW, CH);
      const data = ctx.getImageData(0, 0, CW, CH).data;

      const bright: [number, number][] = [];
      let minX = CW, minY = CH, maxX = 0, maxY = 0;
      for (let y = 0; y < CH; y++) {
        for (let x = 0; x < CW; x++) {
          if (data[(y * CW + x) * 4 + 3] > 90) {
            bright.push([x, y]);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      const pos = new Float32Array(count * 3);
      if (!bright.length) {
        for (let i = 0; i < count; i++) {
          pos[i * 3] = (Math.random() - 0.5) * 5;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
        }
        return { pos, height: targetW };
      }
      const bw = maxX - minX + 1;
      const bh = maxY - minY + 1;
      const sx = targetW;
      const sy = (targetW * bh) / bw; // preserve aspect from cropped bbox
      for (let i = 0; i < count; i++) {
        const p = bright[(Math.random() * bright.length) | 0];
        pos[i * 3] = ((p[0] - minX) / bw - 0.5) * sx + (Math.random() - 0.5) * 0.03;
        pos[i * 3 + 1] = -((p[1] - minY) / bh - 0.5) * sy + (Math.random() - 0.5) * 0.03;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.18;
      }
      return { pos, height: sy };
    }

    // ---- robot / agent face ----
    function makeRobotFace(count: number) {
      const pos = new Float32Array(count * 3);
      const pts: [number, number, number][] = [];
      const addRect = (cx: number, cy: number, w: number, h: number, density: number, filled?: boolean) => {
        const num = density | 0;
        if (filled) {
          for (let i = 0; i < num; i++)
            pts.push([cx + (Math.random() - 0.5) * w, cy + (Math.random() - 0.5) * h, (Math.random() - 0.5) * 0.1]);
        } else {
          const perim = 2 * (w + h);
          for (let i = 0; i < num; i++) {
            const t = Math.random() * perim;
            let px, py;
            if (t < w) { px = cx - w / 2 + t; py = cy - h / 2; }
            else if (t < w + h) { px = cx + w / 2; py = cy - h / 2 + (t - w); }
            else if (t < 2 * w + h) { px = cx + w / 2 - (t - w - h); py = cy + h / 2; }
            else { px = cx - w / 2; py = cy + h / 2 - (t - 2 * w - h); }
            pts.push([px + (Math.random() - 0.5) * 0.04, py + (Math.random() - 0.5) * 0.04, (Math.random() - 0.5) * 0.12]);
          }
        }
      };
      const addCircle = (cx: number, cy: number, r: number, density: number, thickness = 0.06) => {
        const num = density | 0;
        for (let i = 0; i < num; i++) {
          const a = Math.random() * Math.PI * 2;
          const rad = r + (Math.random() - 0.5) * thickness;
          pts.push([cx + Math.cos(a) * rad + (Math.random() - 0.5) * 0.03, cy + Math.sin(a) * rad + (Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.1]);
        }
      };
      const addEllipse = (cx: number, cy: number, rx: number, ry: number, density: number) => {
        const num = density | 0;
        for (let i = 0; i < num; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = Math.sqrt(Math.random());
          pts.push([cx + Math.cos(a) * rx * r + (Math.random() - 0.5) * 0.02, cy + Math.sin(a) * ry * r + (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.08]);
        }
      };
      const addLine = (x1: number, y1: number, x2: number, y2: number, density: number) => {
        const num = density | 0;
        for (let i = 0; i < num; i++) {
          const t = Math.random();
          pts.push([x1 + (x2 - x1) * t + (Math.random() - 0.5) * 0.03, y1 + (y2 - y1) * t + (Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.1]);
        }
      };

      addRect(0, 0.1, 3.2, 3.8, 2200);
      addRect(0, -2.15, 0.7, 0.5, 400);
      addLine(0, 2.05, 0, 2.7, 300);
      addCircle(0, 2.8, 0.18, 300);
      addRect(-0.85, 0.65, 0.9, 0.7, 800);
      addEllipse(-0.85, 0.65, 0.28, 0.22, 700);
      addEllipse(-0.72, 0.75, 0.07, 0.05, 150);
      addRect(0.85, 0.65, 0.9, 0.7, 800);
      addEllipse(0.85, 0.65, 0.28, 0.22, 700);
      addEllipse(0.98, 0.75, 0.07, 0.05, 150);
      addLine(-0.12, 0.05, 0, -0.2, 120);
      addLine(0.12, 0.05, 0, -0.2, 120);
      addLine(-0.12, 0.05, 0.12, 0.05, 100);
      addRect(0, -0.72, 1.8, 0.52, 900);
      for (let i = -3; i <= 3; i++) addLine(i * 0.25, -0.48, i * 0.25, -0.96, 80);
      addRect(0, -0.72, 1.68, 0.1, 500, true);
      addRect(-1.22, -0.1, 0.5, 0.9, 500);
      addRect(1.22, -0.1, 0.5, 0.9, 500);
      for (let r = 0; r < 3; r++) {
        addEllipse(-1.22, 0.12 - r * 0.28, 0.06, 0.06, 80);
        addEllipse(1.22, 0.12 - r * 0.28, 0.06, 0.06, 80);
      }
      addRect(0, 1.55, 2.2, 0.42, 900);
      for (let s = 0; s < 4; s++) addLine(-0.95, 1.42 + s * 0.09, 0.95, 1.42 + s * 0.09, 60);
      for (let v = 0; v < 4; v++) {
        addLine(-1.65, 0.5 - v * 0.22, -1.58, 0.5 - v * 0.22, 60);
        addLine(1.65, 0.5 - v * 0.22, 1.58, 0.5 - v * 0.22, 60);
      }
      addRect(0, -1.55, 1.6, 0.3, 500);
      for (let i = 0; i < 800; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 1.8 + Math.random() * 0.8;
        pts.push([Math.cos(a) * r * 1.1, Math.sin(a) * r, (Math.random() - 0.5) * 0.3]);
      }
      for (let i = 0; i < count; i++) {
        const p = pts[(Math.random() * pts.length) | 0];
        pos[i * 3] = p[0] + (Math.random() - 0.5) * 0.02;
        pos[i * 3 + 1] = p[1] + (Math.random() - 0.5) * 0.02;
        pos[i * 3 + 2] = p[2];
      }
      return pos;
    }

    let shapes: Float32Array[] = [];
    let particles: THREE.Points | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let rafId = 0;
    let disposed = false;

    // ---- brand colors ----
    const cLav = new THREE.Color(0xa19eff);
    const cIndigo = new THREE.Color(0x7c78f0);
    const cWhite = new THREE.Color(0xf0ebff);
    const cCyan = new THREE.Color(0x22d3ee);
    const cViolet = new THREE.Color(0xc4b5fd);

    const build = () => {
      if (disposed) return;
      const markShape =
        symbolImg.naturalWidth > 0
          ? imageToParticles(symbolImg, PARTICLE_COUNT, 3.4).pos
          : textToParticles('S', PARTICLE_COUNT, 2.6, 2.8, 150);
      const wordShape =
        wordImg.naturalWidth > 0
          ? imageToParticles(wordImg, PARTICLE_COUNT, 6.4).pos
          : textToParticles('SEEKERS', PARTICLE_COUNT, 6.4, 2.8, 96);
      shapes = [markShape, wordShape, makeRobotFace(PARTICLE_COUNT)];

      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);
      const randoms = new Float32Array(PARTICLE_COUNT);
      const colorPhase = new Float32Array(PARTICLE_COUNT);
      positions.set(shapes[0]);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const r = Math.random();
        let col: THREE.Color;
        if (r < 0.45) col = cLav.clone().lerp(cWhite, Math.random() * 0.5);
        else if (r < 0.7) col = cIndigo.clone().lerp(cLav, Math.random() * 0.6);
        else if (r < 0.88) col = cWhite.clone();
        else col = cCyan.clone().lerp(cViolet, Math.random());
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
        sizes[i] = 0.008 + Math.random() * 0.018;
        randoms[i] = Math.random();
        colorPhase[i] = Math.random() * Math.PI * 2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
      geometry.setAttribute('aColorPhase', new THREE.BufferAttribute(colorPhase, 1));

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: renderer.getPixelRatio() },
          uBurst: { value: 0 },
          uMouse: { value: new THREE.Vector3(999, 999, 999) },
          uMouseForce: { value: 0 },
        },
        vertexShader: `
          attribute float aSize; attribute float aRandom; attribute float aColorPhase;
          varying vec3 vColor; varying float vAlpha; varying float vGlow;
          uniform float uTime; uniform float uPixelRatio; uniform float uBurst;
          uniform vec3 uMouse; uniform float uMouseForce;
          void main() {
            vColor = color;
            vec3 pos = position;
            float breath = sin(uTime * 0.6 + aRandom * 6.28 + aColorPhase) * 0.012;
            pos += normalize(pos + vec3(0.001)) * breath;
            float burstFactor = uBurst * (0.5 + aRandom * 0.5);
            float burstAngle = aRandom * 6.28318 + uTime * 0.5;
            float burstElev = (aRandom - 0.5) * 3.14159;
            vec3 burstDir = vec3(cos(burstAngle)*cos(burstElev), sin(burstElev), sin(burstAngle)*cos(burstElev));
            pos += burstDir * burstFactor * 2.5;
            pos.z += sin(uTime * 0.4 + aRandom * 9.0) * 0.05;
            // interactive cursor repulsion ripple + swirl
            vec2 toM = pos.xy - uMouse.xy;
            float md = length(toM);
            float force = smoothstep(1.35, 0.0, md) * uMouseForce;
            vec2 dir2 = normalize(toM + vec2(0.0001));
            vec2 swirl = vec2(-dir2.y, dir2.x);
            pos.xy += (dir2 * 0.62 + swirl * 0.28) * force;
            pos.z += force * 0.35;
            float mGlow = force;
            vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
            float sz = aSize * uPixelRatio * 600.0 / -mvPos.z;
            sz = max(sz, 1.2);
            sz *= (1.0 + uBurst * 1.5 + mGlow * 0.9);
            gl_PointSize = sz;
            gl_Position = projectionMatrix * mvPos;
            vAlpha = (1.0 - uBurst * 0.7) * (0.75 + 0.25 * sin(uTime * 1.2 + aColorPhase));
            vGlow = 0.4 + 0.6 * aRandom + mGlow * 0.9;
          }
        `,
        fragmentShader: `
          varying vec3 vColor; varying float vAlpha; varying float vGlow;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            if (d > 0.5) discard;
            float core = smoothstep(0.5, 0.0, d);
            float halo = smoothstep(0.5, 0.1, d) * 0.4 * vGlow;
            float alpha = (core + halo) * vAlpha;
            vec3 col = vColor * 2.3 + 0.06;
            col += vec3(smoothstep(0.25, 0.0, d) * 0.6);
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
      applyFit();
    };

    // Scale the cloud so the widest wordmark (~7.6 units) always fits the frustum
    // width — keeps the text fully visible on narrow/portrait screens.
    const BASE_Z = 7.4;
    const TEXT_W = 6.6;
    const applyFit = () => {
      if (!particles) return;
      const visH = 2 * Math.tan((42 * Math.PI) / 180 / 2) * BASE_Z;
      const visW = visH * camera.aspect;
      const base = Math.min(1.0, (visW * 0.84) / TEXT_W);
      // On phones, shrink a bit more so the cloud sits in the top area and never
      // crowds the hero copy below it.
      const fit = isMobile ? Math.max(0.24, base * 0.8) : Math.max(0.3, base);
      particles.scale.setScalar(fit);
    };

    // ---- state machine ----
    let currentShape = 0;
    let targetShape = 0;
    const HOLD = 2.4, OUT = 0.6, IN = 0.85;
    let state: 'hold' | 'out' | 'in' = 'hold';
    let timer = 0;
    const clock = new THREE.Clock();

    const easeInOutQuart = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);
    const easeOutBack = (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };

    jumpRef.current = (idx: number) => {
      if (idx === currentShape && state === 'hold') return;
      targetShape = idx;
      state = 'out';
      timer = 0;
    };

    // ---- mouse parallax + interactive cursor repulsion ----
    let mx = 0, my = 0, smx = 0, smy = 0;
    const pointerNDC = new THREE.Vector2(0, 0);
    let mouseForce = 0, mouseForceTarget = 0;
    const _v = new THREE.Vector3();
    const _wp = new THREE.Vector3();
    const localMouse = new THREE.Vector3(999, 999, 999);
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseForceTarget = 1;
    };
    const onPointerLeave = () => {
      mouseForceTarget = 0;
    };
    if (!reduced) {
      window.addEventListener('mousemove', onMouse, { passive: true });
      container.addEventListener('pointermove', onPointerMove, { passive: true });
      container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!material || !geometry || !particles) return;
      const delta = clock.getDelta();
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      if (!reduced) {
        timer += delta;
        if (state === 'hold') {
          const pct = Math.min(timer / HOLD, 1) * 100;
          if (progressRef.current) progressRef.current.style.width = pct + '%';
          if (timer >= HOLD) { targetShape = (currentShape + 1) % shapes.length; state = 'out'; timer = 0; }
        } else if (state === 'out') {
          const p = Math.min(timer / OUT, 1);
          material.uniforms.uBurst.value = easeInOutQuart(p);
          if (progressRef.current) progressRef.current.style.width = '0%';
          if (p >= 1) {
            (geometry.attributes.position.array as Float32Array).set(shapes[targetShape]);
            geometry.attributes.position.needsUpdate = true;
            currentShape = targetShape;
            setActiveShape(currentShape);
            state = 'in';
            timer = 0;
          }
        } else if (state === 'in') {
          const p = Math.min(timer / IN, 1);
          material.uniforms.uBurst.value = Math.max(1 - easeOutBack(Math.min(p / 0.85, 1)), 0);
          if (p >= 1) { material.uniforms.uBurst.value = 0; state = 'hold'; timer = 0; }
        }

        // gentle float + mouse parallax + scroll parallax.
        // yBase lifts the cloud into the upper-center so the headline below has room.
        smx += (mx - smx) * 0.05;
        smy += (my - smy) * 0.05;
        particles.rotation.y = smx * 0.16;
        particles.rotation.x = -smy * 0.09;
        const scroll = window.scrollY;
        const yBase = isMobile ? 1.4 : 0.5;
        particles.position.y = yBase + Math.sin(t * 0.25) * 0.06 + scroll * 0.0016;
        camera.position.z = 7.4 + Math.min(scroll, 900) * 0.0009;

        // cursor repulsion: project the pointer onto the cloud plane → local space
        particles.updateMatrixWorld();
        _v.set(pointerNDC.x, pointerNDC.y, 0.5).unproject(camera).sub(camera.position).normalize();
        if (Math.abs(_v.z) > 1e-4) {
          const distp = (0 - camera.position.z) / _v.z;
          _wp.copy(camera.position).addScaledVector(_v, distp);
          particles.worldToLocal(_wp);
          localMouse.lerp(_wp, 0.25);
        }
        mouseForce += (mouseForceTarget - mouseForce) * 0.08;
        material.uniforms.uMouse.value.copy(localMouse);
        material.uniforms.uMouseForce.value = mouseForce;
      }

      renderer.render(scene, camera);
    };

    // build once fonts (for the text shape) AND the logo image are ready
    const start = () => {
      build();
      animate();
    };
    const fontsReady = (document as any).fonts?.ready ?? Promise.resolve();
    const imgLoad = (im: HTMLImageElement) =>
      new Promise<void>((res) => {
        if (im.complete) return res();
        im.onload = () => res();
        im.onerror = () => res();
      });
    Promise.all([fontsReady, imgLoad(symbolImg), imgLoad(wordImg)]).then(start);

    // ---- resize (container-relative) ----
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (material) material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      applyFit();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      geometry?.dispose();
      material?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />

      {/* Active-form indicator (bottom-right) */}
      <div className="pointer-events-none absolute bottom-6 right-5 sm:bottom-8 sm:right-8 z-20 hidden sm:flex flex-col items-end gap-2 select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">Active form</span>
        <span className="font-serif italic text-xl md:text-2xl text-primary transition-all duration-500">
          {SHAPE_NAMES[activeShape]}
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-primary/50">
          {`0${activeShape + 1} / 0${SHAPE_NAMES.length}`}
        </span>
        <div className="mt-1 h-[2px] w-20 overflow-hidden rounded-full bg-primary/10">
          <div ref={progressRef} className="h-full w-0 bg-gradient-to-r from-primary to-accent" />
        </div>
      </div>

      {/* Dot navigation (bottom-center) */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {SHAPE_NAMES.map((name, i) => (
          <button
            key={name}
            aria-label={`Show ${name}`}
            onClick={() => jumpRef.current?.(i)}
            className={`h-2 w-2 rounded-full border transition-all duration-300 ${
              i === activeShape ? 'scale-125 border-primary bg-primary' : 'border-primary/40 bg-transparent hover:bg-primary/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticleHero;
