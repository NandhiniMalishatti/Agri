# AgriConnect - Smart Tractor & Agricultural Labour Booking Platform

## Overview
AgriConnect is a MERN stack application designed to help farmers quickly connect with nearby tractor owners and agricultural labourers. It features role-based access for Farmers, Tractor Owners, Labourers, and Admins.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on `mongodb://127.0.0.1:27017` (or change `MONGO_URI` in `server/.env`)

## Installation & Setup

### 1. Server Setup
```bash
cd server
npm install
# Ensure MongoDB is running.
npm start
```
The server will run on `http://localhost:5000`

### 2. Client Setup
Open a new terminal.
```bash
cd client
npm install
npm run dev
```
The client will run on `http://localhost:5173` (or port provided by Vite).

## Features Implemented
- **Landing Page**: Modern hero section with features and call-to-actions.
- **Authentication**: JWT-based login and registration with role selection.
- **Farmer Dashboard**: Create booking requests for Tractors or Labour, view active and past bookings.
- **Provider Dashboard**: For Tractor Owners and Labourers to view available jobs in their area and accept them.
- **Admin Dashboard**: Overview of platform statistics, user management, and booking tracking.
- **UI/UX**: Built with Tailwind CSS and Lucide React icons, using an agriculture-inspired green and white theme.

## Testing
1. Register a user as an **Admin** to manage the platform.
2. Register a user as a **Farmer**.
3. Register a user as a **Tractor Owner** and another as an **Agricultural Labourer**.
4. Log in as a **Farmer** and create a booking.
5. Log in as a **Tractor Owner** or **Labourer** to see the booking in your dashboard and accept it.
6. The farmer will see the updated status with contact details of the provider.

## Built With
- **Frontend**: React (Vite), Tailwind CSS, React Router DOM, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, BcryptJS
