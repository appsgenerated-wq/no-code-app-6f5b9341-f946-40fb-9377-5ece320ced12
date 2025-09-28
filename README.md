# Dog Paws - A Manifest-powered Application

Welcome to Dog Paws, a full-stack application for managing your dogs' profiles and activities. This application is built using React for the frontend and powered entirely by Manifest for the backend.

## Features

- **User Authentication**: Secure sign-up and login for dog owners.
- **Dog Profiles**: Create, view, update, and delete profiles for your dogs.
- **Photo Uploads**: Add a photo for each dog using Manifest's built-in file storage.
- **Walk Tracking**: Log walk activities for each dog (feature available in the backend).
- **Ownership Policies**: Users can only view and manage their own data, ensuring privacy and security.
- **Automated Admin Panel**: A complete admin interface is available at `/admin` for managing all data.

## Tech Stack

- **Backend**: Manifest (YAML-based schema)
- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all backend communication

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Running the Application

1.  **Clone the repository**

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    The application relies on a Manifest backend instance, which is automatically deployed. The frontend is pre-configured to connect to it.
    ```bash
    npm run dev
    ```

4.  **Access the application**:
    Open your browser and navigate to `http://localhost:5173`.

### Default Credentials

- **Demo User**:
  - Email: `user@manifest.build`
  - Password: `password`

- **Admin User (for the Admin Panel)**:
  - Email: `admin@manifest.build`
  - Password: `admin`
