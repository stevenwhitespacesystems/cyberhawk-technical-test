# Project Analysis

## Overview
Laravel-based web application with a React TypeScript frontend, focused on managing equipment inspections (primarily for wind turbines). The project uses modern tooling and follows industry best practices.

## Tech Stack

### Backend
- Laravel 9.x
- PHP 8.1
- Laravel Sanctum for authentication
- PHPStan for static analysis
- ECS (Easy Coding Standard) for PHP code style

### Frontend
- React with TypeScript
- Vite as build tool
- TanStack Router for routing
- TanStack Query for data fetching
- TanStack Form for form handling
- Tailwind CSS with shadcn/ui components
- MapboxGL for interactive mapping
- Zustand for state management

## Architecture

### Authentication
The application implements a token-based authentication system using Laravel Sanctum. The authentication flow includes:
- Login route
- Registration route
- Token verification
- Protected routes

### Routing
The application uses TanStack Router with a file-based routing system. Main routes include:
- `/login` - Authentication
- `/register` - User registration
- `/interactive` - Interactive map view
- `/inspections` - Inspection management
- `/components` - Component management
- `/equipment` - Equipment management
- `/sites` - Site management
- `/settings` - Application settings

### Features

#### Interactive Map
- Uses MapboxGL for visualization
- Displays sites and equipment locations
- Custom markers for different entity types
- Popup information for equipment details

#### Inspection Management
- Component grading system (1-5 scale)
- Detailed inspection views with site and equipment information
- Pagination and filtering capabilities

#### Data Tables
The application implements reusable table components with:
- Sorting
- Filtering
- Pagination
- Global actions

## Development Environment

### Setup
- Docker-based development environment using Laravel Sail
- Node.js v20.18.0 (specified in .nvmrc)
- Composer for PHP dependencies
- NPM for JavaScript dependencies

### Code Quality Tools
- ESLint with Airbnb configuration
- Prettier for code formatting
- PHPStan for PHP static analysis
- Husky for Git hooks
- TypeScript for type safety

### Testing
- PHPUnit for PHP testing
- Feature tests for API endpoints
- Test coverage for authentication flows

## API Structure

The API follows RESTful principles with protected routes:
- Authentication endpoints
- Site management
- Equipment management
- Component management
- Inspection management

## Project Organization
- Modern Laravel structure for backend
- React components organized by feature
- Shared UI components using shadcn/ui
- Type definitions for all major entities
- Centralized state management
- Modular CSS using Tailwind

## Deployment Considerations
- Environment configuration through .env
- Production build optimizations
- Asset compilation through Vite
- Database migrations and seeding
- API authentication security

## Notes
- The project is developed with modern best practices
- Strong focus on type safety and code quality
- Well-structured component hierarchy
- Comprehensive authentication system
- Interactive mapping capabilities for equipment tracking
