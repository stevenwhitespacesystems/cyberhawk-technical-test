# Getting Started

## Prerequisites
- Docker Desktop installed and running
- Node.js v20.18.0 (recommended to use nvm)
- Composer
- Mapbox account for map functionality

## Environment Setup

1. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Configure essential environment variables:
- `VITE_MAPBOX_ACCESS_TOKEN`: Your Mapbox public access token
  - Create an account at [Mapbox](https://www.mapbox.com/)
  - Generate a public token
  - Add to your `.env` file

## Installation Steps

1. Follow the ["Setting Everything Up"](<../README.md#setting-everything-up>) guide in the README.md

2. Start Docker containers:

```bash
vendor/bin/sail up -d
```

3. Generate application key:

```bash
vendor/bin/sail artisan key:generate
```

4. Set up database with sample data:    

```bash
vendor/bin/sail artisan migrate:refresh --seed
```

5. Build and run frontend (choose one):

```bash
# Development Mode
vendor/bin/sail npm run dev

# Production Mode
vendor/bin/sail npm run build
```

## Accessing the Application

1. Navigate to [http://localhost](http://localhost) (or use the port specified in the `.env` file)

2. Login options:
   - Register a new account, or
   - Use seeded test account:
     - Email: `test@example.com`
     - Password: `password`

## Troubleshooting

If you encounter any issues, a reference `.env` file is available for 3 months or 100 views (shared via email). Note that this file contains no sensitive information and is provided purely for configuration reference.

## Next Steps

After successful setup, you can:
- Explore the interactive map view
- View Sites, Equipment and Components
- View Inspections
- View and adjust the grade of components

For development guidelines and architecture details, refer to the other documentation in the `notes/` directory.