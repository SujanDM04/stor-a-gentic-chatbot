
import { Home, MessageCircle, MapPin, HelpCircle, CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StorageSidebar = () => {
  return (
    <div className="h-full w-full max-w-xs border-r bg-background p-4 flex flex-col">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">S</div>
        <h2 className="text-xl font-bold ml-2">Stor-a-gentic</h2>
      </div>
      
      <nav className="space-y-1 flex-1">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Home
          </a>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/chat">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat Assistant
          </a>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/locations">
            <MapPin className="mr-2 h-4 w-4" />
            Store Locations
          </a>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/faq">
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQ
          </a>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/booking">
            <CalendarRange className="mr-2 h-4 w-4" />
            Book Collection
          </a>
        </Button>
      </nav>
      
      <div className="border-t pt-4">
        <Button variant="outline" className="w-full">
          Contact Support
        </Button>
      </div>
    </div>
  );
};
