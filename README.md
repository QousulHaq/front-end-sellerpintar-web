# front-end-sellerpintar-web

front end development web test

## Key Features & Benefits

- **Authentication:** Secure user login and registration functionality using NextAuth.js.
- **Dynamic Routing:** Utilizes Next.js dynamic routing for handling details of specific content (e.g., articles based on their ID).
- **Data Fetching:** Demonstrates fetching data from an API endpoint using Axios.
- **Modular Structure:** Well-organized project structure separating concerns such as authentication, user accounts, and admin functionalities.
- **TypeScript:** Leverages TypeScript for enhanced code maintainability and type safety.
- **Tailwind CSS:** Integrated with Tailwind CSS for rapid and consistent styling.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (version >= 18) - [https://nodejs.org/](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** or **bun**: Package managers for installing dependencies.

## Installation & Setup Instructions

Follow these steps to get the project up and running:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:QousulHaq/front-end-sellerpintar-web.git
   cd front-end-sellerpintar-web
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

   Using pnpm:

   ```bash
   pnpm install
   ```

   Using bun:

   ```bash
   bun install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory. This file will hold your environment variables.  You might need to define API keys, database connection strings, etc., depending on the backend implementation. A basic example might look like this:

   ```
   NEXTAUTH_SECRET=<your_secret_key>
   NEXTAUTH_URL=http://localhost:3000
   ```

   **Note:** Replace `<your_secret_key>` with a strong, randomly generated secret.  The `NEXTAUTH_URL` should point to your application's URL.

4. **Run the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

   Using pnpm:

   ```bash
   pnpm dev
   ```

   Using bun:

   ```bash
   bun dev
   ```

5. **Open in Browser:**

   Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage Examples & API Documentation

### Data Fetching with Axios

The `lib/axios.ts` file demonstrates a pre-configured Axios instance for making API calls to the backend:

```typescript
import axios from "axios"

const AxiosInstance = axios.create({
    baseURL: "https://test-fe.mysellerpintar.com/api"
})

export default AxiosInstance;
```

You can use this instance in your components to fetch data:

```typescript
import AxiosInstance from "@/lib/axios";

const fetchData = async () => {
  try {
    const response = await AxiosInstance.get('/articles');
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
```

### Authentication with NextAuth.js

The project utilizes NextAuth.js for authentication. The `app/api/auth/[...nextauth]/route.ts` file handles the authentication routes and credentials provider.

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import AxiosInstance from "@/lib/axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type:...
```

## Configuration Options

- **Environment Variables:**  Configuration is primarily managed through environment variables (as described in the installation section).  Key variables include API endpoints, authentication secrets, and any other settings specific to your environment.

## Project Structure

```
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── README.md                 # Project documentation
└── app/                      # Next.js application directory
    ├── (auth)/               # Layout and pages related to authentication
    │   ├── layout.tsx          # Layout for authentication pages
    │   └── login/              # Login page
    │       └── page.tsx        # Login page component
    │   └── register/           # Registration page
    │       └── page.tsx        # Registration page component
    ├── (user)/               # Layout and pages related to user functionalities
    │   └── account/            # User account page
    │       └── page.tsx        # User account page component
    │   └── detail-content/    # Detail content page (e.g., article details)
    │       └── [id]/           # Dynamic route for individual content based on ID
    │           ├── page.tsx    # Detail content page component
    │           ├── layout.tsx # Layout for detail content pages
    │       └── page.tsx        # Main detail content listing page
    │   └── preview/            # Preview page
    │       └── page.tsx        # Preview page component
    └── admin/                # Admin page (implementation not shown in provided files)
```

## Contributing Guidelines

Contributions are welcome! To contribute to this project, please follow these guidelines:

1.  **Fork the repository:** Create your own fork of the repository.
2.  **Create a branch:** Create a new branch for your feature or bug fix.

    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  **Make your changes:** Implement your changes, adhering to the project's coding standards.
4.  **Commit your changes:** Commit your changes with descriptive messages.

    ```bash
    git commit -m "Add: Implemented new feature"
    ```

5.  **Push to your fork:** Push your changes to your fork.

    ```bash
    git push origin feature/your-feature-name
    ```

6.  **Create a Pull Request:** Submit a pull request to the main repository.

## License Information

License not specified. All rights reserved unless otherwise stated.

## Acknowledgments

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
