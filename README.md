# Sign Up & Login Dashboard

> **Every account has a story.  
> This is where it begins. 🐾**

Sign Up & Login Dashboard is a responsive user interface built with **HTML, CSS, and Vanilla JavaScript**, combining sign-up and login forms with an interactive user dashboard.

Beyond the forms, this project explores how frontend applications communicate with APIs, retrieve user data, and manage account information through dynamic UI updates.

From remembering login details to editing and deleting users, the goal was to build more than a static form — it was to practice creating a complete, interactive frontend experience.

## 💡 The Concept

A sign-up form is often just a collection of input fields. But what happens after a user submits their information?

This project focuses on that next step: connecting the interface to an API, retrieving user data, and displaying it in a personalized dashboard.

The application includes separate experiences for regular users and administrators, with account management features powered by API requests.

> **A form is just the beginning. The real learning starts when the data moves.**

## What I Practiced

This project helped me strengthen my JavaScript skills and understand how frontend applications interact with external APIs.

- **API Integration:** Using `fetch()` to retrieve and update user data through MockAPI.
- **Asynchronous JavaScript:** Handling API requests with Promises and `.then()`, along with `async/await` for asynchronous dashboard rendering.
- **CRUD Operations:** Implementing user data retrieval, editing with `PUT`, and deletion with `DELETE`.
- **Dynamic DOM Manipulation:** Building dashboard components, user cards, statistics, and action buttons using `createElement()`, `append()`, and `classList`.
- **User & Admin Interfaces:** Displaying different dashboard views based on the user's role.
- **Form Handling:** Reading input values, checking login credentials, and providing feedback for failed login attempts.
- **Cookies:** Using the `js-cookie` library to implement a Remember Me feature.
- **Interactive UI:** Creating a password visibility toggle and an animated dog character that reacts to input focus and password visibility.
- **Error Handling:** Handling unsuccessful API responses and network errors with `.catch()` and `try...catch`.
- **Responsive UI Design:** Practicing a consistent interface for forms and dashboard components across screen sizes.

## 🎬 Ready to explore?

**Live Demo** → [Click here to view the project online](https://your-live-demo-link.com)

**Preview**

<br>

<img width="1536" alt="Sign Up & Login Dashboard Preview" src="path/to/your-preview-image.png" />

## Features

- **Sign Up & Login UI:** Dedicated pages for account registration and login.
- **API-Powered Data:** Retrieves user information from MockAPI.
- **Remember Me:** Saves login form values in browser cookies.
- **Interactive Password Toggle:** Show or hide the password with a custom eye icon.
- **Animated Character:** A playful dog illustration that reacts to user interactions.
- **User Dashboard:** Displays account details dynamically.
- **Admin Dashboard:** Shows account statistics and a list of registered users.
- **User Management:** Edit and delete user records through API requests.
- **Dynamic Rendering:** Generates user cards, statistics, and action buttons with JavaScript.
- **Error Handling:** Provides feedback when account data cannot be retrieved or login fails.
- **Responsive Design:** Designed to provide a consistent experience across different screen sizes.

## Built With

This project uses **Vanilla JavaScript** without a frontend framework.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MockAPI](https://img.shields.io/badge/MockAPI-6C63FF?style=for-the-badge)
![Cookies](https://img.shields.io/badge/JS--Cookie-8B5CF6?style=for-the-badge)

**Data & API:** [MockAPI](https://mockapi.io/) for storing and managing demo user records.

**Cookie Library:** [js-cookie](https://github.com/js-cookie/js-cookie) for managing browser cookies.

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Visual Studio Code (recommended)
- The Live Server extension for local development

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/FtmDhn/signup-login-dashboard.git
cd signup-login-dashboard
```

2. **Configure the API endpoint:**

The application uses a MockAPI endpoint defined in the JavaScript code:

```js
const Api = 'https://' + sObj[skey] + '.mockapi.io/login-app';
```

Make sure `sObj` and `skey` are defined correctly and that the endpoint points to your MockAPI resource.

3. **Configure the demo data:**

Create the necessary user records in MockAPI, including the fields expected by the application, such as `email`, `password`, `fullName`, and `role`.

4. **Run the application:**

Open the project in VS Code and launch `index.html` using Live Server.

> **Note:** This project uses a mock backend for learning and demonstration. It is not intended for production authentication.

## 🗂️ How It Works

| Step | What happens |
| --- | --- |
| **1. Enter** | The user enters their login credentials. |
| **2. Request** | JavaScript sends a `GET` request to MockAPI to retrieve matching account records. |
| **3. Verify** | The application compares the provided password with the retrieved record. |
| **4. Display** | The dashboard renders the account details or the admin user list. |
| **5. Manage** | Users or administrators can edit or delete records through API requests. |
| **6. Update** | After a successful operation, the dashboard reloads the relevant data. |

## Future Ideas

- [ ] Add stronger client-side validation and clearer form feedback.
- [ ] Replace mock authentication with a secure backend authentication system.
- [ ] Add role-based authorization enforced by the backend.
- [ ] Improve session management and secure credential handling.
- [ ] Add search, filtering, and pagination to the admin dashboard.
- [ ] Add confirmation dialogs and success notifications instead of browser alerts.
- [ ] Improve accessibility and keyboard navigation.
- [ ] Expand automated testing for form validation and API operations.
- [ ] Improve responsive design and optimize the layout for mobile, tablet, and desktop screens.

## 👩‍💻 Developer

This project was designed and built by:

### **Fatemeh Dehghani**
*Front-End Developer in the making*

I'm a frontend developer focused on building interactive web experiences and strengthening my skills in JavaScript, API integration, and dynamic UI development.

I created this project to practice connecting frontend interfaces to an API, handling asynchronous data, and building interactive dashboards with Vanilla JavaScript.

Feedback and collaboration are always welcome!

[![GitHub](https://img.shields.io/badge/GitHub-FtmDhn-181717?style=for-the-badge&logo=github)](https://github.com/FtmDhn)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Fatemeh%20Dehghani-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/FatemehDehghani)
[![Instagram](https://img.shields.io/badge/Instagram-@ftm.dehgni-E4405F?style=for-the-badge&logo=instagram)](https://instagram.com/ftm.dehgni)

---

<div align="center">
  <b>Sign in. Explore. Manage. 🐾</b>
  <br>
  <sub>From forms to dynamic dashboards — one API request at a time.</sub>
</div>
