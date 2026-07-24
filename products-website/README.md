# 🌌 Zenith

Zenith is a sleek, premium, dark-themed e-commerce storefront built with modern web technologies. It features a fully responsive design, dynamic routing, category filtering, and a persistent shopping cart, all powered by the FakeStore API.

**[🚀 View Live Demo](https://e-commerce-website-nu-azure.vercel.app/)**

![Zenith Preview](https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop) 

## ✨ Features

*   **Premium Dark UI:** A highly polished, minimalist dark mode aesthetic utilizing deep slates, charcoal backgrounds, and indigo accents.
*   **Dynamic Product Catalog:** Fetches and displays products in real-time using the FakeStore API.
*   **Search & Filtering:** Instantly filter products by category or search via text input.
*   **Persistent Shopping Cart:** Cart data is managed via React Context API and synced with `localStorage` so users never lose their items on reload.
*   **Interactive Cart Modal:** A slide-out cart featuring quantity controls (+/-), item removal, and a mock checkout form with a success state.
*   **Dynamic Routing:** Seamless navigation and dedicated product detail pages using React Router v7.
*   **Scroll Restoration:** Custom utility to ensure pages always load at the top when navigating.

## 🛠️ Tech Stack

*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM v7
*   **Data API:** [FakeStore API](https://fakestoreapi.com/)
*   **State Management:** React Context API + LocalStorage

## 🌍 Deployment

This project is deployed on **Vercel**. 

Because this app utilizes React Router for client-side routing, a `vercel.json` file is included in the root directory to rewrite all requests to `index.html`. This prevents 404 errors when navigating directly to specific routes (like `/products` or `/contact`) or refreshing the page.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
🚀 Getting Started
To get a local copy up and running in your environment, follow these simple steps.

Prerequisites
Make sure you have Node.js installed on your machine.

Installation
Clone the repository:

Bash
git clone [https://github.com/your-username/zenith-ecommerce.git](https://github.com/your-username/zenith-ecommerce.git)
Navigate into the project directory:

Bash
cd products-website
Install the dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open your browser and visit http://localhost:5173.

📂 Project Structure
Plaintext
├── public/
│   └── favicon.svg          # Custom Zenith Z Logo
├── src/
│   ├── components/
│   │   ├── About/           # About page component
│   │   ├── Contact/         # Contact form component
│   │   ├── Footer/          # Global footer
│   │   ├── Header/          # Global header with Cart & Mobile Nav
│   │   ├── Home/            # Landing page with featured products
│   │   └── Products/        # Product grid and individual detail pages
│   ├── context/
│   │   └── CartContext.jsx  # Global state for cart and localStorage sync
│   ├── App.jsx
│   ├── Layout.jsx           # Main layout wrapper including ScrollToTop
│   └── main.jsx             # Entry point and Router configuration
├── index.html
├── tailwind.config.js
├── vercel.json              # Vercel routing configuration
└── vite.config.js
👨‍💻 Author
Salman Abbas

Full Stack Developer