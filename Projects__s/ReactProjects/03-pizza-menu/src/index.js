//Note:"Create React App" sets up a git repository for us whenever we create a project with it.

//Our entry file has to be named index.js. Webpack, the byndler used in react expects it this way.
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; //using CSS files to style jSX components. Import the CSS file and assign corresponding classnames to the components you want to have certain styles. These properties are globally scoped.

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
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    //setting classes in JSX
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  //   const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};

  return (
    <header className="header">
      {/*in-line jsx styling. The property values must be in string. in-line
      styling takes precedence. */}
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  //   const pizzas = [];
  const numPizzas = pizzas.length; //we do this instead because an empty arrat is a truthy value
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {/* name, ingredients, imageName, and price are called props, A.K.A properties. The order of passing props doesn't matter. Plus, you can pass in anything as a prop. You just have to use JavaScript mode.
      Props is data that should only be changed by a parent component. State, on the other hand, is data that a child component can modify  */}

      {/* Conditional reandering(Ternary operator) and Rendering a list. You render a list with the map method*/}
      {numPizzas > 0 ? (
        // React fragments are created by enclosing JSX in <></>. They allow a component return multiple JSX elements. There is another way to use react fragments with keys(End of Vid 52).
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our oven, all organic, all delicious.{" "}
          </p>

          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
              //for optimization reasons, react expects a unique key for each element when rendering a list.
            ))}
          </ul>
        </>
      ) : (
        <p>We're working on our menu. Please, come back later.</p>
      )}
    </main>
  );
}

//Destructuring Props
function Pizza({ pizzaObj }) {
  //   console.log(props);

  //   if (pizzaObj.soldOut) return null;

  //Functions are components in react
  return (
    // Setting conditional classes
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      {/* Webpack gets all the data used in components from the "public" folder, so all we have to do is specify the path to the data we need */}
      <img src={pizzaObj.photoName} alt="Pizza Funghi" />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* Setting conditional text*/}
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
  //   Note: each react component can only return one element
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  //   if (hour >= openHour && hour <= closeHour) alert("We're curerently open!");
  //   else alert("Sorry we're closed");

  /* Conditional rendering with multiple returns. This is useful when you want to rendr a component conditionally.*/
  if (!isOpen)
    return (
      <footer className="footer">
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      </footer>
    );

  return (
    <footer className="footer">
      {/* Conditional rendering is rendering a component or a piece of JSX based on a certain condition. Note: react doesn't render booleans */}
      {/* Conditional rendering with the "&&" operator." */}
      {isOpen && <Order closeHour={closeHour} />}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>
        We're open until {props.closeHour}:00. Come visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

//Rendering an app in React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* strict mode proofreads our code. */}
    <App />
  </React.StrictMode>
);

//Rendering an app before v18
//ReactDom.render(<App/>, document.getElementById("root"))
