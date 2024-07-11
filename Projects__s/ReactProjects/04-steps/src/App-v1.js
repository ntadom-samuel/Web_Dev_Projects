import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

function Steps() {
  //STATE is data that a component stores throughout an application's lifecycle. Whenever a component's state is updated, react re-renders it.

  //Using state. To create a piece/unit of state, we use the useState function. The function takes in a value which serves as the default state value and returns an array containing two elements. The first element is the variable that stores the component's state and the second is a function that is used to update its state. Note: never update a state variable manually.
  //Note: it is good practice to update a components state based on its current state
  const [step, setStep] = useState(1); //Functions like "useState" are called "hooks". They can only be called at the top level of a Component
  const [isOpen, setIsOpen] = useState(true);

  //Note:we can define functions inside our component
  function handlePrevious() {
    //Note: the argument for our state setting function can be a value or call back function. The argument of this callback function is the initial state value. It is advised to always use a callback function as our state setting function's argument.
    // if (step > 1) setStep((step - 1);
    if (step > 1) setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) setStep((s) => s + 1); //The values passed into setStep replaces the value in the state variable
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              previous
            </button>
            {/* Handling Events in react. The process of doing this is inline. */}
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
