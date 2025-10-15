# MudahPrompt - Your AI Prompt Engineering Assistant

## Project Overview

MudahPrompt is a web application designed to simplify and enhance your AI prompt engineering workflow. Built with modern web technologies, it provides a user-friendly interface for crafting, managing, and optimizing prompts for various AI models. Whether you're a developer, researcher, or enthusiast, MudahPrompt aims to make prompt engineering "mudah" (easy in Malay).

## Features

*   **Intuitive Prompt Editor:** Craft and refine your AI prompts with a rich and responsive editor.
*   **Prompt Management:** Organize and store your prompts for easy access and reuse.
*   **Authentication:** Secure user authentication powered by Supabase.
*   **Responsive Design:** A seamless experience across various devices, built with shadcn-ui and Tailwind CSS.
*   **Learning Resources:** Dedicated sections for learning and exploring prompt engineering concepts.

## Technologies Used

*   **Frontend:**
    *   [Vite](https://vitejs.dev/)
    *   [React](https://react.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [shadcn-ui](https://ui.shadcn.com/)
    *   [Tailwind CSS](https://tailwindcss.com/)
*   **Backend/Database:**
    *   [Supabase](https://supabase.com/) (for authentication, database, and potentially other services)

## Getting Started

Follow these steps to set up and run MudahPrompt locally.

### Prerequisites

*   Node.js (LTS recommended)
*   npm or Yarn
*   A Supabase project with the necessary tables and authentication configured. You'll need your Supabase URL and Anon Key.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <YOUR_REPOSITORY_URL>
    cd mudahprompt-malaysia
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    # or yarn install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the root directory of the project and add your Supabase credentials:
    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project details.

### Running the Development Server

To start the development server with hot-reloading:

```sh
npm run dev
# or yarn dev
```

Open your browser and navigate to `http://localhost:5173` (or the port indicated in your terminal).

## Deployment

(Instructions for deployment can be added here, e.g., Vercel, Netlify, etc., once the project is ready for deployment.)

## Contributing

We welcome contributions! Please see our `CONTRIBUTING.md` (if available) for guidelines on how to contribute.

## License

This project is licensed under the MIT License.
