import React from "react";
import Game from "./components/Game";
import Rules from "./components/Rules";
import Controls from "./components/Controls";

const App: React.FC = () => {
  return (
    <>
      <Game />
      <Controls />
      <Rules />
    </>
  );
};

export default App;
