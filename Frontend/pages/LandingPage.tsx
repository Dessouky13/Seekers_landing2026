import React from 'react';
import MarketingLayout from '../components/MarketingLayout';
import Home from './marketing/Home';

/**
 * Thin wrapper kept for backward compatibility with the full-app routing.
 * The real marketing landing lives in pages/marketing/Home.tsx and is composed
 * with the shared MarketingLayout (navbar + ambient background + footer).
 */
const LandingPage: React.FC = () => (
  <MarketingLayout>
    <Home />
  </MarketingLayout>
);

export default LandingPage;
