import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/auth/AuthPage';
import CollectionPage from './components/testimonial/CollectionPage';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Features from './components/Features';
import Pricing from './components/Pricing';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Analytics from './components/dashboard/Analytics';
import Testimonials from './components/dashboard/Testimonials';
import CollectionLinks from './components/dashboard/CollectionLinks';
import InstagramImports from './components/dashboard/InstagramImports';
import FacebookImports from './components/dashboard/FacebookImports';
import XImports from './components/dashboard/XImports';
import YouTubeImports from './components/dashboard/YouTubeImports';
import Widgets from './components/dashboard/Widgets';
import DashboardAnalytics from './components/dashboard/DashboardAnalytics';
import Settings from './components/dashboard/Settings';
import CreateWidget from './components/dashboard/CreateWidget';
import EditWidget from './components/dashboard/EditWidget';
import DemoLandingPage from './components/widget/DemoLandingPage';

// New component for custom URL collection pages
const CustomCollectionPage: React.FC = () => {
  const { username, slug } = useParams<{ username: string; slug: string }>();
  return <CollectionPage customUrl={{ username: username!, slug: slug! }} />;
};

const LandingPage = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <Hero />
      <Problem />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQ />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/collect/:linkId" element={<CollectionPage />} />
          <Route path="/c/:username/:slug" element={<CustomCollectionPage />} />
          <Route path="/preview/:previewId" element={<DemoLandingPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Analytics />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="links" element={<CollectionLinks />} />
            <Route path="instagram" element={<InstagramImports />} />
            <Route path="facebook" element={<FacebookImports />} />
            <Route path="x" element={<XImports />} />
            <Route path="youtube" element={<YouTubeImports />} />
            <Route path="widgets" element={<Widgets />} />
            <Route path="widgets/create" element={<CreateWidget />} />
            <Route path="widgets/edit/:widgetId" element={<EditWidget />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;