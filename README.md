# Property Management System (PMS) - Frontend UI

A modern, responsive Single Page Application (SPA) built with **Angular 17** using **Standalone Components**. It provides a user-friendly interface for landlords and agents to manage their real estate portfolio.

## 🚀 Tech Stack

*   **Framework:** Angular 17 (Standalone, No NgModules)
*   **Styling:** Angular Material, Bootstrap 5 (Grid/Utilities), CSS
*   **Http Client:** Angular HttpClient with Interceptors (Auth/JWT)
*   **Deployment:** AWS S3 (Static Website Hosting)

## ✨ Key Features

*   **Responsive Design:** Sidenav layout with mobile "Hamburger" menu support.
*   **Dashboard:** Real-time KPI cards (Occupancy, Active Issues) and Lease Expiry Alerts.
*   **Property & Tenant Management:** Full CRUD with detailed views.
*   **Document Handling:** Upload and download lease documents securely.
*   **Financials:** Income and Expense logging with Date pickers.
*   **Reporting:** Generate T776 Tax Summary tables.
*   **Security:** Route Guards, Auto-Logout, JWT handling.

## 🛠️ Prerequisites

*   Node.js (v18 or v20 recommended)
*   Angular CLI (`npm install -g @angular/cli`)

## ⚙️ Configuration

The API URL is configured in the environment files.

**1. Local Development (`src/environments/environment.ts`)**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
