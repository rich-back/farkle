import React, { createContext, useState } from "react";

const GameTypeContext = createContext();

const GameTypeProvider = ({ children }) => {
  const [typeOfGame, setTypeOfGame] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [sliderValue, setSliderValue] = useState(2000);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
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
        sliderValue,
        setSliderValue,
        player1Wins,
        setPlayer1Wins,
        player2Wins,
        setPlayer2Wins,
      }}
    >
      {children}
    </GameTypeContext.Provider>
  );
};

export { GameTypeContext, GameTypeProvider };
