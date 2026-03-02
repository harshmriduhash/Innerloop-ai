import { Route, Routes, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { LandingPage } from "./pages/LandingPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PricingPage } from "./pages/PricingPage";
import { BlogPage } from "./pages/BlogPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
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

          <Route path="/login" element={
            <div className="flex min-h-[80vh] items-center justify-center py-12">
              <SignIn routing="path" path="/login" signUpUrl="/signup" />
            </div>
          } />
          <Route path="/signup" element={
            <div className="flex min-h-[80vh] items-center justify-center py-12">
              <SignUp routing="path" path="/signup" signInUrl="/login" />
            </div>
          } />

          <Route path="/demo" element={<DashboardLayout isDemo={true} />}>
            <Route index element={<Navigate to="voice" replace />} />
            <Route path="voice" element={<VoicePage />} />
            <Route path="memory" element={<MemoryPage />} />
            <Route path="summary" element={<SummaryPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/app" element={
            <>
              <SignedIn>
                <DashboardLayout />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }>
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

