# Saanvi Films & Production

## Project Overview

A modern, professional website for Saanvi Films & Production - a talent discovery and film production company. The platform offers casting opportunities, workshops, and events for aspiring artists across India.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn-ui** - Reusable component library
- **Framer Motion** - Animation library
- **Firebase** (planned) - Backend services

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd saanvi-gateway-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/        # React components
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Events.tsx
│   ├── Portfolio.tsx
│   ├── CastingForm.tsx
│   └── ...
├── pages/            # Page components
├── lib/              # Utility functions
└── index.css         # Global styles
```

## Features

- **Responsive Design** - Works seamlessly across all devices
- **Film-themed UI** - Elegant design with cinema aesthetics
- **Smooth Animations** - Professional transitions using Framer Motion
- **Casting Forms** - Easy application process for talent
- **Event Management** - Workshops and talent hunt listings
- **Portfolio Gallery** - Showcase of previous work

## Deployment

You can deploy this project to:

- **Vercel** - Recommended for React/Vite projects
- **Netlify** - Simple drag-and-drop deployment
- **Firebase Hosting** - If using Firebase backend

### Vercel Deployment

```sh
npm install -g vercel
vercel
```

### Build for Production

```sh
npm run build
```

The optimized production build will be in the `dist/` directory.

## Backend Setup (Coming Soon)

The project is designed to integrate with Firebase for:
- Event management
- Application submissions
- Admin authentication
- Portfolio management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

© 2024 Saanvi Films & Production. All rights reserved.
