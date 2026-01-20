# Enterprise Usage Monitoring & Admin Platform

## Overview
This project is a high-fidelity, premium "Enterprise Usage Monitoring & Admin Platform" built as a Single Page Application (SPA). It provides administrators with a comprehensive view of system resource usage, user management capabilities, and detailed activity logging. The platform is designed with a focus on modern aesthetics (glassmorphism, dark mode) and responsiveness.

## System Design
The application is architected using **React** with **Vite** for a performant development experience.
-   **Frontend**: React (Functional Components, Hooks).
-   **Styling**: TailwindCSS for utility-first styling, enabling rapid UI development with a custom "Premium Dark" theme configuration.
-   **Routing**: React Router for seamless navigation between Dashboard, Users, and Settings.
-   **State Management**: React Context API for managing global application state (User Session, Theme, Data Filters).
-   **Charts/Visualization**: Recharts for rendering performant and responsive data visualizations.

## API Structure (Mock Layer)
Since this is a frontend-focused implementation, we utilize a **Service Layout** pattern to simulate backend interactions. All API calls are routed through `src/services/mockApi.js`.
Easily replaceable mock APIs with real backend services

src/
 ├── components/
 ├── pages/
 ├── context/
 ├── services/
 │    └── mockApi.js
 └── utils/

### Endpoints (Simulated)
-   `GET /api/stats/summary`: Returns high-level KPI metrics (Total Calls, Active Users, Health Score).
-   `GET /api/stats/trends`: Returns time-series data for usage charts.
-   `GET /api/users`: Returns a paginated list of users.
-   `POST /api/users`: Simulates adding a new user (updates local state).
-   `DELETE /api/users/:id`: Simulates user deletion.
-   `GET /api/logs/activity`: Returns a stream of system activity logs.

## Data Modeling Approach
The data is modeled using TypeScript-like interfaces (conceptually) to ensure consistency.

### User Model
```json
{
  "id": "u_123",
  "name": "Jane Doe",
  "email": "jane@enterprise.com",
  "role": "admin", // 'admin' | 'editor' | 'viewer'
  "status": "active", // 'active' | 'inactive'
  "avatar": "url_to_image"
}
```

### Usage Metric Model
```json
{
  "timestamp": "2023-10-27T10:00:00Z",
  "apiCalls": 450,
  "storageUsed": 1024, // MB
  "activeSessions": 89
}
```

## Assumptions Made
1.  **Single Tenant**: The view assumes a single organization context.
2.  **Role-Based Access**: The current user is a "Super Admin" with full permissions.
3.  **Data Persistence**: Data is "session-based" or hardcoded for demonstration; a browser refresh mimics a fresh login (unless LocalStorage is added later).
4.  **Network Latency**: The Mock API artificially delays responses by 300-800ms to simulate real-world loading states.

## How Dummy Data is Used
To ensure the dashboard looks "alive" immediately:
-   **Seed Data**: We use `faker.js` (or similar logic) to generate realistic user profiles and activity logs on initialization.
-   **Deterministic Randomness**: Chart data is generated using mathematical functions (e.g., sine waves with noise) to create realistic-looking trends that don't look purely random.
-   **Live Simulation**: A `setInterval` loop in the `Dashboard` component creates "live" incoming log entries to demonstrate real-time monitoring capabilities.

## Future Improvements
1.  **Backend Integration**: Replace `mockApi.js` with calls to a real Node.js/Express or Python/FastAPI backend.
2.  **Authentication**: Implement JWT-based auth flows (Login/Logout).
3.  **Real-time Sockets**: Use WebSockets for actual real-time data instead of polling/simulation.
4.  **Export Features**: Add CSV/PDF export for usage reports.


## How to Run

1. **Install Dependencies (if not already done):**

npm install

2. **Start Development Server:**

npm run dev

**Access at** http://localhost:5173
