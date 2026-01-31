import React, { useState } from 'react';
import Modal from './Modal';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send to Formspree (replace with your Formspree form ID)
      const formspreeEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT || 'https://formspree.io/f/your-form-id';
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: 'Landing Page Waitlist',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setError('Failed to join waitlist. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after modal closes
    setTimeout(() => {
      setEmail('');
      setName('');
      setPhone('');
      setIsSubmitted(false);
      setError(null);
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Coming Soon">
      <div className="space-y-6">
        {!isSubmitted ? (
          <>
            {/* Coming Soon Message */}
            <div className="text-center space-y-4">
              <div className="size-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-4xl font-black">rocket_launch</span>
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-2">We're Launching Soon!</h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Our platform is in final development. Join the waitlist to get early access and exclusive launch benefits.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
                For Immediate Inquiries
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">call</span>
                <a href="tel:01211100767" className="text-xl font-black text-white hover:text-primary transition-colors">
                  01211100767
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-primary text-2xl">mail</span>
                <a href="mailto:team@seekersai.org" className="text-lg font-bold text-white hover:text-primary transition-colors">
                  team@seekersai.org
                </a>
              </div>
            </div>

            {/* Waitlist Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
                Join the Waitlist
              </p>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold focus:border-primary outline-none transition-all placeholder:text-slate-600"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold focus:border-primary outline-none transition-all placeholder:text-slate-600"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (Optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm font-bold focus:border-primary outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-primary text-background-dark rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl disabled:opacity-50 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="size-5 border-2 border-background-dark border-t-transparent rounded-full animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">notifications_active</span>
                    Notify Me at Launch
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-500">
            <div className="size-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <span className="material-symbols-outlined text-4xl font-black">check_circle</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">You're on the List!</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                We'll notify you at <span className="text-primary font-bold">{email}</span> as soon as we launch.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                Want to talk sooner?
              </p>
              <a href="tel:01211100767" className="text-xl font-black text-primary hover:text-white transition-colors">
                Call 01211100767
              </a>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-background-dark transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ComingSoonModal;
