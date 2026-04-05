import { ThemeProvider } from "@/contexts/ThemeContext";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import MusicPlayer from "@/components/MusicPlayer";
import { ReactNode } from "react";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" switchable>
      <MusicPlayerProvider>
        <TooltipProvider>
          <Toaster />
          {children}
          <MusicPlayer />
        </TooltipProvider>
      </MusicPlayerProvider>
    </ThemeProvider>
  );
}
