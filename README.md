# Event Management Application

This is a demo project for an Event Management Application. The project uses Angular for the frontend, ASP.NET Core Web API for the backend, and Microsoft SQL Server as the database server.

## Technologies Used

- **Frontend:**
  - Angular
  - Angular Material

- **Backend:**
  - ASP.NET Core Web API
  - Entity Framework Core

- **Database:**
  - Microsoft SQL Server
 
## Features and Functionalities

### User Management
1. **User Registration:**
   - New users can register an account by providing necessary details such as username, password, email, etc.
   
2. **User Login:**
   - Registered users can log in to the application using their credentials.
   
3. **Authentication:**
   - The application uses authentication mechanisms to ensure that only registered users can access certain features.

### Event Management
4. **Create Event:**
   - Authenticated users can create new events by filling out a form with event details like name, date, time, location, and description.
   
5. **View Events:**
   - Users can view a list of all events in a calendar view, providing a clear and organized display of events by date.
   
6. **Event Details:**
   - Users can click on an event to view detailed information about it, including the event's name, date, time, location, and description.
   
7. **Edit Event:**
   - Users can edit the details of an existing event using an event form.
   
8. **Delete Event:**
   - Users can delete an event from the event details page.

### Navigation
9. **Routing:**
   - The application includes a routing module for smooth navigation between different components such as home, login, register, calendar, event details, and event form.

### Security
10. **Route Protection:**
    - Certain routes are protected using route guards to ensure that only authenticated users can access specific parts of the application.

### Backend Operations
11. **CRUD Operations:**
    - The backend supports Create, Read, Update, and Delete operations for managing events.
    
12. **Database Integration:**
    - The application uses Entity Framework Core to interact with a Microsoft SQL Server database for storing and retrieving data.

### User Interface
13. **Responsive Design:**
    - The frontend is built using Angular Material to ensure a responsive and user-friendly interface.

### Error Handling
14. **Form Validation:**
    - Forms include validation to ensure that users provide necessary and correctly formatted information before submission.

15. **Error Messages:**
    - The application provides user-friendly error messages and feedback for invalid operations or failed requests.

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
