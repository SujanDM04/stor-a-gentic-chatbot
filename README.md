# Stor-a-gentic Chatbot

Stor-a-gentic is a chatbot application designed to assist with storage-related queries. It integrates various technologies to provide a seamless user experience.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SujanDM04/stor-a-gentic-chatbot.git
   cd stor-a-gentic-chatbot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

## Usage

- Access the application at `http://localhost:3000` after starting the development server.
- Use the chatbot to interact with storage-related queries.

## Features

- **Authentication**: Managed through the `AuthContext`.
- **Chat Functionality**: Continuous conversation flow using `ChatContext`.
- **Admin Dashboard**: Protected route for admin access.
- **Integration with Supabase**: For data management.

## Project Structure

- **src/App.tsx**: Main application component.
- **src/components/layout/Navbar.tsx**: Navigation bar component.
- **src/components/sidebar/StorageSidebar.tsx**: Sidebar for storage options.
- **src/contexts/AuthContext.tsx**: Context for authentication.
- **src/contexts/ChatContext.tsx**: Context for chat functionality.
- **src/integrations/supabase/**: Integration with Supabase for backend services.
- **src/main.tsx**: Entry point of the application.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.