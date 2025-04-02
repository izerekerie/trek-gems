# Tourism Booking System - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-13.x-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue?style=flat&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern tourism booking platform built with Next.js, providing an intuitive interface for users to browse, search and book tourism experiences.

![Tourism Booking Frontend](https://main--trek-gems.netlify.app/)

## ✨ Features

- 🔒 Secure user authentication
- 🗺️ Browse tourism packages and destinations
- 💳 Seamless booking experience
- 📱 Responsive design for all devices
- 📸 Image uploads via Cloudinary
- ⭐ Reviews and rating system

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/izerekerie/trek-gems.git
cd trek-gems
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment variables

```bash
# Create a .env.local file with the following variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Authentication
NEXT_PUBLIC_JWT_TOKEN_NAME=tourism_auth_token
```

## 📁 Project Structure

```
├── public/                # Static files
├── src/
│   ├── app/               # App router pages
│   ├── components/        # Reusable components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and API clients
│   ├── styles/            # Global styles
│   └── types/             # TypeScript type definitions
├── .env.local             # Environment variables (not committed)
├── next.config.js         # Next.js configuration
└── package.json           # Project dependencies and scripts
```

## 🔄 API Integration

The frontend communicates with the backend API running on `http://localhost:3000/api` (or your specified port). Explore the API documentation by visiting the Swagger UI at `http://localhost:3000/api`.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [SWR](https://swr.vercel.app/) - Data fetching
- [JWT](https://jwt.io/) - Authentication

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


