# Environment Variables Setup Guide

This application uses environment variables to configure different environments (development and production). Follow these steps to set up your environment variables.

## Required Environment Variables

The application requires the following environment variables:

- `NEXT_PUBLIC_API_BASE_URL`: The base URL of the API server
- `NEXT_PUBLIC_DEBUG_MODE`: Set to 'true' to enable debug logging, 'false' to disable

## Setting Up Environment Variables

### Development Environment

1. Create a file named `.env.local` in the root directory of the project with the following content:

```
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000

# Debug Settings
NEXT_PUBLIC_DEBUG_MODE=true
```

2. This file will be automatically loaded by Next.js during development.

### Production Environment

1. Create a file named `.env.production` in the root directory of the project with the following content:

```
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-production-api-url.com

# Debug Settings
NEXT_PUBLIC_DEBUG_MODE=false
```

2. When building the application for production using `npm run build`, Next.js will use these environment variables.

## Deployment Platforms

### Vercel

If deploying to Vercel, you can set environment variables in the Vercel dashboard:

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add each environment variable with its corresponding value
4. Deploy your application

### Other Platforms

For other platforms, refer to their documentation on how to set environment variables for Next.js applications.

## Important Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not store sensitive information in these variables.
- For local development, `.env.local` takes precedence over `.env`.
- For production builds, `.env.production` takes precedence over `.env`.
- Never commit your `.env.local` or `.env.production` files to version control. Add them to your `.gitignore` file. 