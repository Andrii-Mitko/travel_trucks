# TravelTrucks — Camper Rental App

TravelTrucks is a web application for browsing and renting camper vans. Users can explore the camper catalog, filter vehicles by location, vehicle type, engine, and transmission, view detailed camper information, read reviews, and submit a booking request.

## Demo

https://traveltrucks-ashy.vercel.app/

## Features

- **Home page**
  - Hero section with a call-to-action button
  - Navigation to the camper catalog

- **Camper catalog**
  - Camper list with Load More pagination
  - Loading additional campers while preserving active filters
  - Filtering by:
    - location
    - vehicle type
    - engine
    - transmission
  - Empty state when no campers match the selected filters
  - Ability to reset all filters

- **Camper details page**
  - Image gallery
  - Detailed camper information
  - Vehicle specifications
  - Available amenities
  - Customer reviews with ratings
  - Booking form with validation

- **Loading states**
  - Loaders are displayed during asynchronous requests

- **Responsive layout**
  - Desktop and mobile-friendly interface

## Technologies

- Next.js (App Router)
- TypeScript
- React
- TanStack Query
- Axios
- CSS Modules
- React Icons
- Vercel

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Andrii-Mitko/travel_trucks.git
cd travel_trucks
```

### 2. Install dependencies

npm install

### 3. Start the development server

npm run dev
Open `http://localhost:3000` in your browser.

### 4. Create a production build

npm run build

### 5. Start the production server

npm start

## API

The application uses the TravelTrucks backend API:
`https://campers-api.goit.study`

## Available endpoints

- GET /campers — get a list of campers with filtering and pagination
- GET /campers/filters — get available filter values
- GET /campers/{camperId} — get detailed camper information
- GET /campers/{camperId}/reviews — get camper reviews
- POST /campers/{camperId}/booking-requests — create a booking request

## Project Structure

src/
├── app/
│ ├── catalog/
│ │ ├── [camperId]/
│ │ └── page.tsx
│ ├── layout.tsx
│ └── page.tsx
├── components/
├── hooks/
├── lib/
└── types/

## Author

Andrii Mitko

### GitHub:

`https://github.com/Andrii-Mitko`

### Portfolio:

`https://andrii-mitko-brand.vercel.app/`
