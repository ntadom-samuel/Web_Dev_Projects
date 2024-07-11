import { useState } from "react";
import { Item } from "./Item";

export function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  handleClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  /* Vid 86. Sorting Items */
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice() //this creates an independent copy f 'items'
      .sort((a, b) => a.description.localeCompare(b.description)); //this sorts all the string elements in the copy alphabetically
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed)); //this sorts the elements of a copy of the items array by their packed status. That is, packed items are moved to the end.

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      {/* Vid 86. Sorting Items */}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description"> Sort by description</option>
          <option value="packed"> Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  );
}
