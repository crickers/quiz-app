import React from "react";
import ReactDOM from "react-dom";
import Quiz from "./Quiz";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Quiz></Quiz>
    </div>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App></App>, rootElement); //renders the component(first parameter) as a child of the element(second parameter)
