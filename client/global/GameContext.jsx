import React, { createContext, useState } from "react";

const GameTypeContext = createContext();

const GameTypeProvider = ({ children }) => {
  const [typeOfGame, setTypeOfGame] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  return (
    <GameTypeContext.Provider
      value={{
        typeOfGame,
        setTypeOfGame,
        player1,
        setPlayer1,
        player2,
        setPlayer2,
        currentPlayer,
        setCurrentPlayer,
      }}
    >
      {children}
    </GameTypeContext.Provider>
  );
};

export { GameTypeContext, GameTypeProvider };
