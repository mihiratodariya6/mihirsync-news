/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './Home';
import ArticlePage from './ArticlePage';
import CategoryPage from './CategoryPage';
import SearchPage from './SearchPage';
import AdminDashboard from './AdminDashboard';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import CareersPage from './CareersPage';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import TermsOfServicePage from './TermsOfServicePage';
import AdvertisePage from './AdvertisePage';
import FirebaseProvider from './components/FirebaseProvider';

export default function App() {
  return (
    <HelmetProvider>
      <FirebaseProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/advertise" element={<AdvertisePage />} />
            </Routes>
          </Layout>
        </Router>
      </FirebaseProvider>
    </HelmetProvider>
  );
}






