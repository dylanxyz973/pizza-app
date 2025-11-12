import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from 'react-router-dom';
import "./index.css";

// --- Reusable Pizza data ---
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    image: "pizzas/focaccia.jpg",
    sold: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozzarella",
    price: 10,
    image: "pizzas/margherita.jpg",
    sold: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozzarella, spinach, and ricotta cheese",
    price: 12,
    image: "pizzas/spinaci.jpg",
    sold: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozzarella, mushrooms, and onion",
    price: 12,
    image: "pizzas/funghi.jpg",
    sold: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozzarella, and pepperoni",
    price: 15,
    image: "pizzas/salamino.jpg",
    sold: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozzarella, ham, arugula, and burrata cheese",
    price: 18,
    image: "pizzas/prosciutto.jpg",
    sold: false,
  },
];

// --- Menu Component ---
function Menu({ pizzas, search, favourites, onToggleFav }) {
  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzas.length > 0 ? (
        <>
          <SearchBar search={search} onSearchChange={onToggleFav.changeSearch} />

          <section className="pizzas">
            {filteredPizzas.map((pizza) => (
              <Pizza
                key={pizza.name}
                {...pizza}
                isFav={favourites.includes(pizza.name)}
                onToggleFav={onToggleFav.toggleFav}
              />
            ))}
          </section>
        </>
      ) : (
        <p>Our menu is currently empty. Please check back later!</p>
      )}
    </main>
  );
}

// --- Components ---
function Header({ isOpen }) {
  return (
    <header className="header">
      <h1>Ding Rui (Dylan)'s Pizza Co.</h1>
      {isOpen && <p className="tagline">Authentic Italian Cuisine</p>}
    </header>
  );
}

function SearchBar({ search, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search pizzas..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

function Pizza({ name, ingredients, price, image, sold, isFav, onToggleFav }) {
  return (
    <article className={`pizza ${sold ? "sold-out" : ""}`}>
      <img src={image} alt={name} />
      <div>
        <div className="pizza-header">
          <h3>{name}</h3>
          <button
            className={`fav-btn ${isFav ? "faved" : ""}`}
            onClick={() => onToggleFav(name)}
            title={isFav ? "Remove from favourites" : "Add to favourites"}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>
        <p>{ingredients}</p>
        <span>{sold ? "SOLD OUT" : `$${price}`}</span>
      </div>
    </article>
  );
}

function Order() {
  return (
    <div className="order">
      <p>We are currently open, place your order now!</p>
      <button className="order-btn">Order</button>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const isOpen = hour >= 10 && hour < 22;

  return (
    <footer className="footer">
      {isOpen ? <Order /> : <p>Sorry, we are closed for the day.</p>}
    </footer>
  );
}

// --- Root App Component ---
function App() {
  const [search, setSearch] = useState("");
  const [favourites, setFavourites] = useState([]);

  const hour = new Date().getHours();
  const isOpen = hour >= 10 && hour < 22;

  // Toggle favourites
  function handleToggleFav(pizzaName) {
    setFavourites((prevFavs) =>
      prevFavs.includes(pizzaName)
        ? prevFavs.filter((name) => name !== pizzaName)
        : [...prevFavs, pizzaName]
    );
  }

  const handlers = {
    toggleFav: handleToggleFav,
    changeSearch: setSearch,
  };

  return (
    <div className="app">
      <Header isOpen={isOpen} />
      <Menu
        pizzas={pizzaData}
        search={search}
        favourites={favourites}
        onToggleFav={handlers}
      />
      <Footer />
    </div>
  );
}

// --- Render Root ---
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
