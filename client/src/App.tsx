import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import ScrollRestoration from "./components/ScrollRestoration";
import { MusicPlayerProvider } from "./contexts/MusicPlayerContext";
import { detectLanguage } from "./lib/i18n";
import { useEffect, lazy, Suspense } from "react";

// Lazy load route components for better code splitting
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const BlogOverview = lazy(() => import("./pages/blog/BlogOverview"));
const BlogArticle = lazy(() => import("./pages/blog/BlogArticle"));
const CookieBanner = lazy(() => import("./components/CookieBanner"));
const MusicPlayer = lazy(() => import("./components/MusicPlayer"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function Router() {
  return (
    <>
      <ScrollRestoration />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/impressum"} component={Impressum} />
          <Route path={"/datenschutz"} component={Datenschutz} />
          <Route path={"/blog"} component={BlogOverview} />
          <Route path={"/blog/:slug"} component={BlogArticle} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  // Set html lang attribute based on domain
  useEffect(() => {
    const lang = detectLanguage();
    document.documentElement.lang = lang;
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider
          defaultTheme="dark"
          switchable
        >
          <MusicPlayerProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              <Suspense fallback={null}>
                <CookieBanner />
                <MusicPlayer />
              </Suspense>
            </TooltipProvider>
          </MusicPlayerProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
