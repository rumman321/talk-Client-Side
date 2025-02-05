# TALK  

![TALK Platform Screenshot](https://i.ibb.co.com/Y4LgzHtV/img.png)  

---

## Table of Contents  

- [Project Overview](#project-overview)  
- [Screenshot](#screenshot)  
- [Technologies Used](#technologies-used)  
- [Core Features](#core-features)  
- [Dependencies](#dependencies)  
- [Environment Configuration](#environment-configuration)  
- [Installation and Running Locally](#installation-and-running-locally)  
- [Live Project](#live-project)  
- [Relevant Resources](#relevant-resources)  

---

## Project Overview  

**TALK** is a user-friendly forum platform where users can post questions, share knowledge, and engage in interactive discussions. Unlike traditional forums, comments are private and accessible only to the original poster, who can provide feedback on received comments.  

The platform features distinct dashboards for users and admins. Admins can manage users, view user feedback, and make announcements. Regular users have a limited number of free posts, with additional posts requiring payment.  

---

## Screenshot  
**User Dashboard:** 
![*(Insert a screenshot showing the user dashboard or post interface)*  ](https://i.ibb.co.com/Ldppf5sX/virat.png)
**Admin Dashboard:** 
![*(Insert a screenshot showing the admin dashboard or post interface)*  ](https://i.ibb.co.com/tp8dWpgF/admin.png)

---

## Technologies Used  

- **Frontend:** React, React Router DOM,Firebase  
- **Backend and Services:** Express.js,MongoDB 
- **Styling:** Tailwind CSS, DaisyUI  
- **Payment Integration:** Stripe  
- **Utilities:** Axios, Moment.js, React Hook Form, Recharts  

---

## Core Features  

- **User Features:**  
  - Post questions and share knowledge  
  - Like, dislike, and privately comment on posts  
  - Comments visible only to the post author  
  - Five free posts per user; additional posts require payment  
  - Personalized user dashboard  

- **Admin Features:**  
  - View user feedback and delete comments  
  - Manage user accounts, including account deletions  
  - Create announcements visible on user notification pages  

- **Additional:**  
  - Secure payment processing via Stripe  
  - Mobile-friendly and responsive design  

---

## Dependencies  

### Production Dependencies  

```json
{
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "firebase": "^11.1.0",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "moment": "^2.30.1",
  "react": "^18.3.1",
  "react-axios": "^2.0.6",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.54.2",
  "react-icons": "^5.4.0",
  "react-moment": "^1.1.3",
  "react-router-dom": "^7.1.1",
  "react-select": "^5.9.0",
  "react-share": "^5.1.2",
  "recharts": "^2.15.0",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.15.10"
}
```

### Development Dependencies  

```json
{
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "daisyui": "^4.12.23",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "postcss": "^8.5.1",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.5"
}
```

---

## Environment Configuration  

Create a `.env.local` file in the project root with the following variables:  

```env.local
VITE_apiKey=<Your Firebase API Key>
VITE_authDomain=<Your Firebase Auth Domain>
VITE_projectId=<Your Firebase Project ID>
VITE_storageBucket=<Your Firebase Storage Bucket>
VITE_messagingSenderId=<Your Firebase Messaging Sender ID>
VITE_appId=<Your Firebase App ID>
VITE_Payment_Gateway_PK=<Your Stripe Public Key>
```

### Important  
- Keep these keys secure and do not share them publicly.  

---

## Installation and Running Locally  

1. **Clone the repository:**  
   ```bash
   git clone <repository-link>
   cd talk-platform
   ```  

2. **Install dependencies:**  
   ```bash
   npm install
   ```  

3. **Set up environment variables:**  
   Create a `.env` file as described in the Environment Configuration section.  

4. **Start the development server:**  
   ```bash
   npm run dev
   ```  

5. **Access the project:**  
   Navigate to `http://localhost:5000` in your browser.  

---

## Live Project  

Visit the live platform here: [TALK](https://forumweb-15576.web.app/)  

---

## Relevant Resources  

- [Firebase Documentation](https://firebase.google.com/docs)  
- [Stripe API Documentation](https://stripe.com/docs/api)  