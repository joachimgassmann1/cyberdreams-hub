import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Buchreihe from "./pages/Buchreihe";
import BandDetail from "./pages/BandDetail";
import Neuerscheinung from "./pages/Neuerscheinung";
import Autoren from "./pages/Autoren";
import AutorDetail from "./pages/AutorDetail";
import Gesellschaft from "./pages/Gesellschaft";
import Aktuelles from "./pages/Aktuelles";
import Kontakt from "./pages/Kontakt";
import Kuratorium from "./pages/Kuratorium";
import MitgliedWerden from "./pages/MitgliedWerden";
import Dokumente from "./pages/Dokumente";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buchreihe" component={Buchreihe} />
      <Route path="/band/:slug" component={BandDetail} />
      <Route path="/neuerscheinung" component={Neuerscheinung} />
      <Route path="/autoren" component={Autoren} />
      <Route path="/autoren/:slug" component={AutorDetail} />
      <Route path="/gesellschaft" component={Gesellschaft} />
      <Route path="/aktuelles" component={Aktuelles} />
      <Route path="/kontakt" component={Kontakt} />
      <Route path="/kuratorium" component={Kuratorium} />
      <Route path="/mitglied-werden" component={MitgliedWerden} />
      <Route path="/dokumente" component={Dokumente} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
