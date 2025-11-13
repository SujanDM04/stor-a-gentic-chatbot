#  Storage Unit Assistant

An intelligent chatbot for storage unit facility management using natural language queries powered by Groq's LLM API. Helps users find available storage units, check pricing, and manage their storage rentals through conversational AI.

##  Features

- **Natural Language Queries**: Ask about storage unit availability, sizes, and pricing using conversational language
- **AI-Powered Assistance**: Integrated with Groq API for intelligent responses about storage facilities
- **User Authentication**: Secure login and session management via Supabase Auth
- **Admin Dashboard**: Role-based access controls for facility managers
- **Real-time Chat Interface**: Continuous conversation flow for customer inquiries
- **Storage Unit Management**: Browse available units, pricing, and facility information

##  Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Supabase (Database + Authentication)
- **LLM Integration**: Groq API for natural language processing
- **State Management**: React Context (AuthContext, ChatContext)
- **Routing**: React Router with protected routes
- **Styling**: Tailwind CSS

##  Project Structure
```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Navigation bar
│   └── sidebar/
│       └── StorageSidebar.tsx  # Storage unit browsing
├── contexts/
│   ├── AuthContext.tsx         # Authentication state management
│   └── ChatContext.tsx         # Chat conversation management
├── integrations/
│   └── supabase/               # Supabase client configuration
├── App.tsx                     # Main application component
└── main.tsx                    # Application entry point
```

##  Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account
- Groq API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SujanDM04/stor-a-gentic-chatbot.git
cd stor-a-gentic-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application at `http://localhost:3000`

##  Environment Variables

Create a `.env` file with the following variables:
```
VITE_SUPABASE_URL=           # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=      # Your Supabase anonymous key
VITE_GROQ_API_KEY=           # Your Groq API key
```

**Note**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

##  Use Cases

### Customer Features
- "What storage units do you have available?"
- "How much does a 10x10 unit cost per month?"
- "Do you have climate-controlled units?"
- "What are your access hours?"

### Admin Features
- View all customer inquiries
- Manage storage unit inventory
- Update pricing and availability
- Role-based access controls

##  Key Features Implementation

### Authentication Flow
- Users authenticate through Supabase Auth
- Session management via `AuthContext`
- Protected routes for admin dashboard

### Chat Functionality
- Continuous conversation with context retention
- Integration with Groq API for intelligent responses about storage units
- Real-time message updates via `ChatContext`

### Storage Unit Management
- Browse available storage units via sidebar
- Natural language queries for unit information
- Admin controls for inventory management

## ⚠️ Note

The Supabase backend instance used during development has been decommissioned due to free tier inactivity limits. The frontend code demonstrates the complete architecture and component design. To run this project, you'll need to:

1. Create a new Supabase project
2. Set up the database schema for storage units
3. Configure authentication providers
4. Update environment variables

#



---


```
---
