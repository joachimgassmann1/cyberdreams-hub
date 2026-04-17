import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import BusinessDetail from "./pages/BusinessDetail";
import Branchen from "./pages/Branchen";
import Eintragen from "./pages/Eintragen";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/suche" component={Search} />
      <Route path="/eintrag/:id" component={BusinessDetail} />
      <Route path="/branchen" component={Branchen} />
      <Route path="/eintragen" component={Eintragen} />
      <Route path="/staedte" component={() => <Search />} />
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
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
