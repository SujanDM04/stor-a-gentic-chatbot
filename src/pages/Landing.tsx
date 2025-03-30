import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, MapPin, Truck, HelpCircle, User } from "lucide-react";
import { fetchFaqs, fetchLocations } from "@/lib/airtable";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chat");

  const handleStartChat = () => {
    toast({
      title: "Chat started",
      description: "You'll be connected with our AI assistant",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-20 pb-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
              S
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Stor-a-gentic Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your friendly AI storage assistant, ready to help with all your storage needs
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={handleStartChat}
            >
              <MessageSquare className="mr-2" />
              Start Chat Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="chat" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="chat" className="flex flex-col items-center py-3">
              <MessageSquare className="h-5 w-5 mb-1" />
              <span className="text-xs sm:text-sm">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex flex-col items-center py-3">
              <HelpCircle className="h-5 w-5 mb-1" />
              <span className="text-xs sm:text-sm">FAQs</span>
            </TabsTrigger>
            <TabsTrigger value="locate" className="flex flex-col items-center py-3">
              <MapPin className="h-5 w-5 mb-1" />
              <span className="text-xs sm:text-sm">Locate</span>
            </TabsTrigger>
            <TabsTrigger value="collect" className="flex flex-col items-center py-3">
              <Truck className="h-5 w-5 mb-1" />
              <span className="text-xs sm:text-sm">Collect</span>
            </TabsTrigger>
            <TabsTrigger value="human" className="flex flex-col items-center py-3">
              <User className="h-5 w-5 mb-1" />
              <span className="text-xs sm:text-sm">Support</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <TabsContent value="chat" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>AI Chat Assistant</CardTitle>
                  <CardDescription>
                    Get instant answers to your storage questions with our AI assistant.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-start mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                        S
                      </div>
                      <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-gray-800">
                          👋 Hello! I'm Stor-a-gentic, your friendly storage assistant. How can I help you today?
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="outline" size="sm">Book a collection</Button>
                      <Button variant="outline" size="sm">Store hours</Button>
                      <Button variant="outline" size="sm">Storage sizes</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={handleStartChat}
                  >
                    Start Chatting
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find quick answers to common storage questions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FaqSection />
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleStartChat}
                  >
                    Ask More Questions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="locate" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Find a Store</CardTitle>
                  <CardDescription>
                    Locate our storage facilities near you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LocationSection />
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("chat")}
                  >
                    Ask for Directions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="collect" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Collection Service</CardTitle>
                  <CardDescription>
                    We'll pick up your items and store them for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4">
                    <Truck className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-medium mb-2">Door-to-Door Collection</h3>
                    <p className="text-gray-600 mb-4">
                      Our team will come to your location, carefully pack your items, and transport them to our secure storage facility.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium">✓ Professional Team</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium">✓ Safe Transportation</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium">✓ Flexible Scheduling</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium">✓ Packing Assistance</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={handleStartChat}
                  >
                    Book Collection Service
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="human" className="mt-0">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Human Support</CardTitle>
                  <CardDescription>
                    Need to speak with a real person? We're here to help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-4">
                    <User className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-medium mb-2">Contact Our Team</h3>
                    <p className="text-gray-600 mb-6">
                      Our customer service representatives are available during business hours to assist with any complex inquiries.
                    </p>
                    <div className="space-y-4 mb-4 text-left">
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                        <div className="mr-3 text-blue-500">📞</div>
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-gray-600">(555) 123-4567</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                        <div className="mr-3 text-blue-500">✉️</div>
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-gray-600">support@storagentic.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleStartChat}
                  >
                    Start with AI First
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </section>
      
      <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Stor-a-gentic?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We combine AI technology with excellent service to provide the best storage experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">24/7 Assistance</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="text-gray-600">
                Get answers and support anytime, day or night, with our AI assistant.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Easy Booking</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="text-gray-600">
                Schedule collection services with just a few taps. No phone calls needed.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Human Touch</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <p className="text-gray-600">
                Seamlessly transition to human support whenever you need it.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <footer className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
              S
            </div>
            <span className="font-bold text-lg">Stor-a-gentic</span>
          </div>
          
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Stor-a-gentic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FaqSection = () => {
  const [faqs, setFaqs] = useState([
    { id: "1", question: "What size storage units do you offer?", answer: "We offer a variety of sizes, from small 5x5 lockers to large 10x30 units suitable for business inventory or household storage during a move." },
    { id: "2", question: "Are your storage units climate controlled?", answer: "Yes, we offer climate-controlled units that maintain a consistent temperature and humidity level to protect sensitive items." },
    { id: "3", question: "How secure are your facilities?", answer: "Our facilities feature 24/7 video surveillance, electronic gate access, on-site management, and individually alarmed units." },
  ]);

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} className="border rounded-lg p-4">
          <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

const LocationSection = () => {
  const [locations, setLocations] = useState([
    { id: "1", name: "Downtown Storage Center", address: "123 Main St, Downtown", phone: "(555) 123-4567", hours: "Mon-Fri: 9am-7pm, Sat-Sun: 10am-5pm" },
    { id: "2", name: "Westside Storage Facility", address: "456 West Ave, Westside", phone: "(555) 987-6543", hours: "Mon-Fri: 9am-7pm, Sat-Sun: 10am-5pm" },
  ]);

  return (
    <div className="space-y-4">
      {locations.map((location) => (
        <div key={location.id} className="border rounded-lg p-4">
          <h3 className="font-medium text-lg mb-1">{location.name}</h3>
          <p className="text-gray-600 mb-1">{location.address}</p>
          <p className="text-gray-600 mb-1">Phone: {location.phone}</p>
          <p className="text-gray-600 text-sm">{location.hours}</p>
        </div>
      ))}
    </div>
  );
};

export default Landing;
