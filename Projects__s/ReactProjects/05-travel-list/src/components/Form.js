import { useState } from "react";

export default function Form({ onAddItems }) {
  // Creating control elements
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      {/* Note: input elements like select and input maintain their state inside the DOM. React doesn't like this, so we use control elements to overcome. To create a control element from an input element, we set the input element's "value" prop to a state variable and set up and onChange event handler as shown below */}
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {/* Array from in the code below is used to create an array of 20 elements, 1 - 20. It takes in two values, an object used to specify its number of elements and a callback function used to populate its slots. 
        Note: when rendering a list, a unique key prop must be passed for each element being rendered */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        //The state of this input element is controlled by react now. Hence, input is a controlled element
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}
