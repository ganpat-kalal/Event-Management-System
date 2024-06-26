# Event Management Application

This is a demo project for an Event Management Application developed as part of an interview submission. The project uses Angular for the frontend, ASP.NET Core Web API for the backend, and Microsoft SQL Server as the database server.

## Technologies Used

- **Frontend:**
  - Angular
  - Angular Material

- **Backend:**
  - ASP.NET Core Web API
  - Entity Framework Core

- **Database:**
  - Microsoft SQL Server

## Project Structure

### Frontend

The frontend part of the application is built using Angular and Angular Material. The main components include:

1. **app.component.ts:** The root component of the application.
2. **home.component.ts:** The home page component.
3. **login.component.ts:** The login page component.
4. **register.component.ts:** The registration page component.
5. **calendar.component.ts:** The calendar view component where events are displayed.
6. **event-detail.component.ts:** The component to display the details of a specific event.
7. **event-form.component.ts:** The form component to create or edit events.
8. **app-routing.module.ts:** The routing module for navigation between components.
9. **app.module.ts:** The main module where all components and services are declared.
10. **auth.guard.ts:** The guard to protect routes that require authentication.

### Backend

The backend is built using ASP.NET Core Web API and Entity Framework Core. The main functionalities include user authentication, event creation, updating, deletion, and retrieval.

### Database

The application uses Microsoft SQL Server as the database server. Entity Framework Core is used for database interactions, including migrations, seeding, and CRUD operations.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Angular CLI installed
- .NET Core SDK installed
- SQL Server installed and running

### Steps to Run the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ganpat-kalal/Event-Management-System.git
   cd Event-Management-System

1. **Clone the repository:**
  Navigate to the frontend directory:
  ```bash
  cd frontend
