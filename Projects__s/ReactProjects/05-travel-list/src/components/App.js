import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";
//State vs Prop
//State is data that belongs to a component. Prop is data that is passed from a parent component to a child child component. Whenever a state passed as a prop changes, all the components involved are re-rendered.

export default function App() {
  //Vid 80: lifting state up. 9:08
  const [items, setItems] = useState([]);

  //This function is used in the form component
  function handleAddItems(item) {
    //In react, we areen't allowed to mutate state
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((itesms) => items.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map(
        (item) => (item.id === id ? { ...item, packed: !item.packed } : item)
        //This code toggles the value of packed between true and false
      )
    );
  }

  const handleClearList = function () {
    //window.confirm displays a pop up window where a user can select 'ok' or 'cancel'. I fa user selects 'ok', confrmed is true, else false.
    const confirmed = window.confirm(
      "Are you sure you want to delete all item?"
    );
    if (confirmed) setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        onDeleteItem={handleDeleteItems}
        items={items}
        handleClearList={handleClearList}
        onToggleItem={handleToggleItems}
      />
      <Stats items={items} />
    </div>
  );
}
