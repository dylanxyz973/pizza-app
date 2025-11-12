import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Menu({ search, favourites, onToggleFav }) {
  const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients:
        "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];

  const filteredPizzas = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <div className="pizzas">
        {filteredPizzas.map((pizza) => (
          <Pizza
            key={pizza.name}
            pizza={pizza}
            isFav={favourites.includes(pizza.name)}
            onToggleFav={onToggleFav}
          />
        ))}
      </div>
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

// Reusable Pizza component with props
function Pizza({ name, ingredients, price, photoName, soldOut, isFav, onToggleFav }) {
  return (
    <article className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
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
        <span>{soldOut ? "SOLD OUT" : `$${price}`}</span>
      </div>
    </article>
  );
}

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

// Separate Order component (for when shop is open)
function Order() {
  return (
    <div className="order">
      <p>We are currently open, place your order now!</p>
      <button className="order-btn">Order</button>
    </div>
  );
}

// Footer handles shop open/close condition
function Footer() {
  const hour = new Date().getHours();
  const isOpen = hour >= 10 && hour < 22;

  return (
    <footer className="footer">
      {isOpen ? <Order /> : <p>Sorry, we are closed for the day.</p>}
    </footer>
  );
}

// Root App component
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
