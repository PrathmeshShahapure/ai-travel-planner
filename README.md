# AI Travel Planner

AI Travel Planner is a full-stack web application that helps users generate personalized travel itineraries using AI. Users can create trips based on destination, duration, budget, and interests, then receive a complete travel plan including daily activities, hotel recommendations, budget estimates, must-do experiences, and travel tips.

---

## Project Overview

The application allows travelers to quickly generate customized travel plans without spending hours researching destinations and activities.

Users can:

* Register and log in securely
* Create AI-generated travel itineraries
* View all created trips in a dashboard
* Add activities to specific days
* Remove activities from a trip
* Regenerate a specific day's itinerary using AI
* Delete trips
* Receive destination-specific travel tips
* Discover must-do experiences for each destination

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* Tailwind CSS
* Zustand
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

### AI Integration

* Groq API

---

## Why This Tech Stack?

### Next.js

Chosen for its modern React architecture, file-based routing, and excellent developer experience.

### Tailwind CSS

Used for rapid UI development and consistent responsive design.

### Zustand

Provides lightweight global state management for authentication without the complexity of Redux.

### MongoDB

Flexible document-based database suitable for storing trip itineraries and nested travel data.

### Groq API

Provides fast AI inference for itinerary generation while remaining cost-effective for development and testing.

---

## Setup Instructions

### Backend Setup

Clone the repository:

```bash
git clone <repository-url>
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Run the backend:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

### Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Update API URL in:

```txt
lib/axios.js
```

For local development:

```js
baseURL: "http://localhost:5000/api"
```

Run frontend:

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:3000
```

---

## Deployment

### Backend

Deployed on Render.

### Frontend

Deployed on Vercel.

### Deployment Process

1. Deploy backend to Render.
2. Copy the deployed backend URL.
3. Update the Axios base URL in `lib/axios.js`.
4. Deploy frontend to Vercel.

---

## High-Level Architecture

```txt
Frontend (Next.js)
        |
        v
Axios API Requests
        |
        v
Backend (Express.js)
        |
        +------ JWT Authentication
        |
        +------ Trip Controllers
        |
        +------ Groq AI Service
        |
        v
MongoDB Atlas
```

### Request Flow

1. User submits trip preferences.
2. Frontend sends request to backend.
3. Backend validates user authentication.
4. Backend sends prompt to Groq AI.
5. AI returns structured travel data.
6. Backend stores the generated trip in MongoDB.
7. Frontend displays the generated itinerary.

---

## Authentication and Authorization

### Authentication

JWT-based authentication is used.

Upon successful login:

1. Backend generates a JWT token.
2. Token is returned to the frontend.
3. Frontend stores the token in localStorage.
4. Axios automatically sends the token in the Authorization header.

### Authorization

Protected routes verify:

* Valid JWT token
* User ownership of resources

Users can only access, modify, regenerate, or delete their own trips.

---

## AI Agent Design and Purpose

The AI component acts as a travel planning assistant.

Based on:

* Destination
* Number of days
* Budget preference
* User interests

The AI generates:

* Day-by-day itinerary
* Budget estimation
* Hotel recommendations
* Must-do experiences
* Travel tips

The AI is also used for regenerating a specific day of an itinerary without affecting the rest of the trip.

---

## Custom Feature

### Must-Do Experiences

For every generated trip, the AI recommends experiences that travelers should not miss at the destination.

Examples:

* Water sports in Goa
* Sunset viewpoints
* Local food experiences
* Cultural attractions

### Travel Tips

The AI provides destination-specific safety and travel guidance.

Examples:

* Avoid swimming after consuming alcohol.
* Respect local customs and dress codes.
* Prepare for high-altitude conditions.

These features help users travel more confidently and gain practical destination knowledge beyond a standard itinerary.

---

## Key Design Decisions and Trade-offs

### Structured AI Responses

The AI is instructed to return JSON rather than plain text.

Benefits:

* Easier parsing
* Consistent UI rendering
* Simpler database storage

### Regenerate Individual Day

Instead of regenerating the entire itinerary, users can regenerate only a selected day.

Benefits:

* Faster response time
* Lower AI usage cost
* Better user control

### Local State Updates

Trip modifications update the frontend state immediately after API success.

Benefits:

* Better user experience
* No full-page refresh required

---

## Known Limitations

* Travel tips are generated by AI and should be independently verified for critical travel decisions.
* Budget estimates are approximate and may vary by season.
* Hotel recommendations are AI-generated and not connected to live hotel booking APIs.
* Authentication currently uses localStorage instead of HTTP-only cookies.
* No real-time flight or weather integration is currently available.

---

## Future Improvements

* Flight API integration
* Live hotel search
* Weather forecasting
* AI chat assistant for travel questions
* User profile customization
* Saved favorite destinations

---

## Author

Prathmesh Shahapure

Built as part of a Full Stack Developer assessment project.
