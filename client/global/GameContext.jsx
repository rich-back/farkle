import React, { createContext, useState } from "react";

const GameTypeContext = createContext();

const GameTypeProvider = ({ children }) => {
  const [typeOfGame, setTypeOfGame] = useState();
  return (
    <GameTypeContext.Provider value={{ typeOfGame, setTypeOfGame}}>
      {children}
    </GameTypeContext.Provider>
  );
};

export { GameTypeContext, GameTypeProvider };
