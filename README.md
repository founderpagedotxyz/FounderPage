# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/79a2eddf-a106-4071-b4ab-211b2b7e1683

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/79a2eddf-a106-4071-b4ab-211b2b7e1683) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Database via Lovable Cloud)
- React Router DOM
- React Helmet Async (SEO)

## Dynamic User Profile Routes

This application implements a dynamic routing system similar to Linktree and IndiePages:

### How it works

Each user gets a public profile page accessible at: `yourdomain.com/username`

- **Route**: `/:username` (defined in `src/App.tsx`)
- **Page Component**: `src/pages/Profile.tsx`
- **Database**: Uses Supabase with a unique `username` field in the `profiles` table

### Username Requirements

- Minimum 3 characters
- Only lowercase letters, numbers, hyphens (`-`) and underscores (`_`)
- Must be unique across all users
- Cannot use reserved names (admin, dashboard, api, settings, etc.)

### Reserved Usernames

The following usernames are protected and cannot be registered:
admin, dashboard, api, settings, login, register, auth, profile, user, users, signup, signin, signout, logout, account, new, edit, delete, create, update, about, contact, help, support, terms, privacy, policy, legal, blog, news, home, index, root, www, ftp, mail, pop, smtp, new-startup, startups

See full list in `src/lib/validation.ts`

### SEO & Metadata

Each profile page generates dynamic SEO metadata including:
- Page title with user's name
- Meta description from user's bio
- Open Graph tags for social sharing
- Twitter Card support
- Profile photo as OG image

### User Profile Features

Public profiles display:
- Profile photo
- Name and bio
- Location
- Startup list with logos
- Monthly revenue (if public)
- Interactive revenue growth charts
- Links to startup websites

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/79a2eddf-a106-4071-b4ab-211b2b7e1683) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
