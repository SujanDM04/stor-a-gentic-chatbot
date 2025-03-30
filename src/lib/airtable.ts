
import { toast } from "sonner";

// Airtable API base URL
const AIRTABLE_BASE_URL = "https://api.airtable.com/v0";

// This would be your Airtable base ID
const AIRTABLE_BASE_ID = "YOUR_BASE_ID";

// Mock data for development until user provides real Airtable credentials
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

// Function to fetch FAQs from Airtable or use mock data
export async function fetchFaqs() {
  try {
    // In a real implementation, you would fetch from Airtable with:
    // const response = await fetch(`${AIRTABLE_BASE_URL}/${AIRTABLE_BASE_ID}/FAQs`, {
    //   headers: {
    //     Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    //   },
    // });
    // const data = await response.json();
    // return data.records.map((record) => ({
    //   id: record.id,
    //   question: record.fields.question,
    //   answer: record.fields.answer,
    // }));
    
    // For now, return mock data
    return MOCK_FAQS;
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    toast.error("Failed to load FAQs. Please try again later.");
    return [];
  }
}

// Function to fetch store locations
export async function fetchLocations() {
  try {
    // In a real implementation, fetch from Airtable
    // For now, return mock data
    return MOCK_LOCATIONS;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    toast.error("Failed to load store locations. Please try again later.");
    return [];
  }
}

// Function to fetch available collection slots
export async function fetchCollectionSlots() {
  try {
    // In a real implementation, fetch from Airtable
    // For now, return mock data
    return MOCK_COLLECTION_SLOTS;
  } catch (error) {
    console.error("Failed to fetch collection slots:", error);
    toast.error("Failed to load collection slots. Please try again later.");
    return [];
  }
}

// Function to book a collection
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
    // In a real implementation, post to Airtable
    // For now, simulate a successful booking
    console.log("Booking collection:", collectionData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, id: `booking-${Date.now()}` };
  } catch (error) {
    console.error("Failed to book collection:", error);
    toast.error("Failed to book collection. Please try again later.");
    return { success: false };
  }
}
