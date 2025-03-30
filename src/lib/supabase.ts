import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

// Use environment variables for Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if we have valid Supabase configuration
export const hasValidSupabaseConfig = () => {
  return supabaseUrl && supabaseAnonKey;
};

// Mock data for development when not connected to Supabase
const MOCK_FAQS = [
  { id: "1", question: "What size storage units do you offer?", answer: "We offer a variety of sizes, from small 5x5 lockers to large 10x30 units suitable for business inventory or household storage during a move." },
  { id: "2", question: "Are your storage units climate controlled?", answer: "Yes, we offer climate-controlled units that maintain a consistent temperature and humidity level to protect sensitive items." },
  { id: "3", question: "How secure are your facilities?", answer: "Our facilities feature 24/7 video surveillance, electronic gate access, on-site management, and individually alarmed units." },
  { id: "4", question: "What are your business hours?", answer: "Our office is open Monday to Friday from 9am to 7pm, and on weekends from 10am to 5pm. Gate access is available 24/7 for customers." },
  { id: "5", question: "Do I need to sign a long-term contract?", answer: "No, our rental agreements are month-to-month with no long-term commitment required." },
];

const MOCK_LOCATIONS = [
  { id: "1", name: "Downtown Storage Center", address: "123 Main St, Downtown", phone: "(555) 123-4567", hours: "Mon-Fri: 9am-7pm, Sat-Sun: 10am-5pm" },
  { id: "2", name: "Westside Storage Facility", address: "456 West Ave, Westside", phone: "(555) 987-6543", hours: "Mon-Fri: 9am-7pm, Sat-Sun: 10am-5pm" },
  { id: "3", name: "Eastside Storage Units", address: "789 East Blvd, Eastside", phone: "(555) 456-7890", hours: "Mon-Fri: 9am-7pm, Sat-Sun: 10am-5pm" },
];

const MOCK_COLLECTION_SLOTS = [
  { id: "1", date: "2023-12-01", timeSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
  { id: "2", date: "2023-12-02", timeSlots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
  { id: "3", date: "2023-12-03", timeSlots: ["9:00 AM", "12:00 PM", "5:00 PM"] },
];

// Types for database tables
export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  created_at?: string;
}

export interface CustomerInquiry {
  id?: string;
  created_at?: string;
  user_id?: string;
  message: string;
  response: string;
}

export interface ServiceRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  date: string;
  time: string;
  address?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface Location {
  id?: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface CollectionSlot {
  id?: string;
  date: string;
  timeSlots: string[];
}

// Table names in Supabase
const TABLES = {
  FAQS: 'faqs',
  CUSTOMER_INQUIRIES: 'customer_inquiries',
  SERVICE_REQUESTS: 'service_requests',
  LOCATIONS: 'locations',
  COLLECTION_SLOTS: 'collection_slots'
};

// Helper function to check if connected to Supabase
const isConnectedToSupabase = () => {
  return hasValidSupabaseConfig();
};

// FAQ functions
export async function fetchFaqs() {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, using mock data");
      return MOCK_FAQS;
    }

    const { data, error } = await supabase
      .from(TABLES.FAQS)
      .select('*');

    if (error) throw error;
    return data || MOCK_FAQS;
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    toast.error("Failed to load FAQs. Please try again later.");
    return MOCK_FAQS;
  }
}

export async function createFaq(faq: FAQ) {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, simulating successful creation");
      return { success: true, id: `mock-${Date.now()}` };
    }

    const { data, error } = await supabase
      .from(TABLES.FAQS)
      .insert([faq])
      .select();

    if (error) throw error;
    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error("Failed to create FAQ:", error);
    toast.error("Failed to create FAQ. Please try again.");
    return { success: false };
  }
}

// Customer Inquiry functions
export async function fetchCustomerInquiries() {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, using mock data");
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.CUSTOMER_INQUIRIES)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch customer inquiries:", error);
    toast.error("Failed to load customer inquiries. Please try again later.");
    return [];
  }
}

export const createCustomerInquiry = async (inquiry: CustomerInquiry): Promise<{ success: boolean; data?: any; error?: any }> => {
  console.log('=== Starting createCustomerInquiry ===');
  console.log('Inquiry data:', inquiry);
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return { success: false, error: 'Supabase client not initialized' };
    }

    console.log('Attempting to insert into customer_inquiries table...');
    const { data, error } = await supabase
      .from('customer_inquiries')
      .insert([inquiry])
      .select();

    if (error) {
      console.error('Supabase insert error:', {
        code: error.code,
        message: error.message,
        details: error.details
      });
      return { success: false, error };
    }

    console.log('Successfully inserted data:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Error in createCustomerInquiry:', error);
    return { success: false, error };
  }
}

// Service Request functions
export async function fetchServiceRequests() {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, using mock data");
      return [];
    }

    const { data, error } = await supabase
      .from(TABLES.SERVICE_REQUESTS)
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Failed to fetch service requests:", error);
    toast.error("Failed to load service requests. Please try again later.");
    return [];
  }
}

export async function createServiceRequest(request: ServiceRequest) {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, simulating successful creation");
      return { success: true, id: `mock-${Date.now()}` };
    }

    const { data, error } = await supabase
      .from(TABLES.SERVICE_REQUESTS)
      .insert([request])
      .select();

    if (error) throw error;
    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error("Failed to create service request:", error);
    toast.error("Failed to book your service. Please try again.");
    return { success: false };
  }
}

// Location functions
export async function fetchLocations() {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, using mock data");
      return MOCK_LOCATIONS;
    }

    const { data, error } = await supabase
      .from(TABLES.LOCATIONS)
      .select('*');

    if (error) throw error;
    return data || MOCK_LOCATIONS;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    toast.error("Failed to load store locations. Please try again later.");
    return MOCK_LOCATIONS;
  }
}

// Collection slot functions
export async function fetchCollectionSlots() {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, using mock data");
      return MOCK_COLLECTION_SLOTS;
    }

    const { data, error } = await supabase
      .from(TABLES.COLLECTION_SLOTS)
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data || MOCK_COLLECTION_SLOTS;
  } catch (error) {
    console.error("Failed to fetch collection slots:", error);
    toast.error("Failed to load collection slots. Please try again later.");
    return MOCK_COLLECTION_SLOTS;
  }
}

export async function bookCollection(collectionData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  address: string;
  items: string;
}) {
  try {
    if (!isConnectedToSupabase()) {
      console.warn("Supabase connection not configured, simulating successful booking");
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, id: `booking-${Date.now()}` };
    }

    const serviceRequest: ServiceRequest = {
      name: collectionData.name,
      email: collectionData.email,
      phone: collectionData.phone,
      service_type: 'collection',
      date: collectionData.date,
      time: collectionData.time,
      address: collectionData.address,
      notes: collectionData.items,
      status: 'pending'
    };

    const result = await createServiceRequest(serviceRequest);
    return result;
  } catch (error) {
    console.error("Failed to book collection:", error);
    toast.error("Failed to book collection. Please try again later.");
    return { success: false };
  }
}

// Test Supabase connection
export async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");
    const { data, error } = await supabase
      .from(TABLES.CUSTOMER_INQUIRIES)
      .select('*')
      .limit(1);

    console.log("Test Supabase connection result:", { data, error });
    return { success: !error, data, error };
  } catch (error) {
    console.error("Supabase connection test failed:", error);
    return { success: false, error };
  }
}

// Test table structure
export async function verifyCustomerInquiriesTable() {
  try {
    console.log("Verifying customer_inquiries table...");
    
    // Try to get the table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from(TABLES.CUSTOMER_INQUIRIES)
      .select('*')
      .limit(0);

    if (tableError) {
      console.error("Table verification error:", tableError);
      return {
        exists: false,
        error: tableError,
        message: "Failed to verify table structure"
      };
    }

    // Try to insert a test record with the correct structure
    const testInquiry = {
      message: "Table structure test",
      response: "Test response",
      user_id: "test_user"
    };

    const { error: insertError } = await supabase
      .from(TABLES.CUSTOMER_INQUIRIES)
      .insert([testInquiry])
      .select();

    if (insertError) {
      console.error("Test insert error:", insertError);
      return {
        exists: true,
        error: insertError,
        message: "Table exists but insert failed - possible structure mismatch"
      };
    }

    // Clean up test record
    await supabase
      .from(TABLES.CUSTOMER_INQUIRIES)
      .delete()
      .eq('message', 'Table structure test');

    return {
      exists: true,
      error: null,
      message: "Table exists and structure is valid"
    };
  } catch (error) {
    console.error("Table verification failed:", error);
    return {
      exists: false,
      error,
      message: "Failed to verify table"
    };
  }
}
