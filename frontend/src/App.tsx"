import { Route, Routes, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardLayout } from "./pages/app/DashboardLayout";
import { VoicePage } from "./pages/app/VoicePage";
import { MemoryPage } from "./pages/app/MemoryPage";
import { SummaryPage } from "./pages/app/SummaryPage";
import { SettingsPage } from "./pages/app/SettingsPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Navigate to="voice" replace />} />
            <Route path="voice" element={<VoicePage />} />
            <Route path="memory" element={<MemoryPage />} />
            <Route path="summary" element={<SummaryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

