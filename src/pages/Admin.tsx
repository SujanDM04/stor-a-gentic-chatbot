import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plus, Trash, Edit, Save } from "lucide-react";
import {
  FAQ,
  fetchFaqs,
  createFaq,
  CustomerInquiry,
  fetchCustomerInquiries,
  ServiceRequest,
  fetchServiceRequests
} from "@/lib/supabase";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("faqs");
  
  // FAQs state
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newFaq, setNewFaq] = useState<FAQ>({ question: "", answer: "" });
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  
  // Customer inquiries state
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  
  // Service requests state
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  
  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load FAQs
        const faqData = await fetchFaqs();
        setFaqs(faqData);
        
        // Load customer inquiries
        const inquiryData = await fetchCustomerInquiries();
        setInquiries(inquiryData);
        
        // Load service requests
        const serviceData = await fetchServiceRequests();
        setServiceRequests(serviceData);
      } catch (error) {
        console.error("Error loading admin data:", error);
        toast({
          title: "Error",
          description: "Failed to load data. Please try again."
        });
      }
    };
    
    loadData();
  }, [toast]);
  
  // Handle adding new FAQ
  const handleAddFaq = async () => {
    if (!newFaq.question || !newFaq.answer) {
      toast({
        title: "Error",
        description: "Please provide both a question and an answer."
      });
      return;
    }
    
    try {
      const result = await createFaq(newFaq);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "FAQ has been added successfully."
        });
        
        // Add to local state
        setFaqs([...faqs, { ...newFaq, id: result.id }]);
        
        // Reset form
        setNewFaq({ question: "", answer: "" });
        setIsAddingFaq(false);
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to add FAQ. Please try again."
      });
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => navigate("/landing")}>Back to Home</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="inquiries">Customer Inquiries</TabsTrigger>
          <TabsTrigger value="services">Service Requests</TabsTrigger>
        </TabsList>
        
        {/* FAQs Tab */}
        <TabsContent value="faqs">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Manage your FAQ database here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button onClick={() => setIsAddingFaq(!isAddingFaq)}>
                  <Plus className="mr-2 h-4 w-4" />
                  {isAddingFaq ? "Cancel" : "Add New FAQ"}
                </Button>
              </div>
              
              {isAddingFaq && (
                <Card className="mb-6 border border-dashed">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Question</label>
                        <Input
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                          placeholder="Enter question"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Answer</label>
                        <textarea
                          className="w-full min-h-[100px] p-2 border rounded-md"
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                          placeholder="Enter answer"
                        />
                      </div>
                      <Button onClick={handleAddFaq}>
                        <Save className="mr-2 h-4 w-4" />
                        Save FAQ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faqs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">No FAQs found</TableCell>
                    </TableRow>
                  ) : (
                    faqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell className="font-medium">{faq.question}</TableCell>
                        <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customer Inquiries Tab */}
        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Customer Inquiries</CardTitle>
              <CardDescription>Track and respond to customer inquiries.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">No inquiries found</TableCell>
                    </TableRow>
                  ) : (
                    inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="font-medium">{inquiry.name}</TableCell>
                        <TableCell>{inquiry.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{inquiry.message}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            inquiry.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {inquiry.status}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(inquiry.created_at)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Respond
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Service Requests Tab */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>Manage collection and other service requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">No service requests found</TableCell>
                    </TableRow>
                  ) : (
                    serviceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-sm text-gray-500">{request.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.service_type}</TableCell>
                        <TableCell>{`${request.date} at ${request.time}`}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            request.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
