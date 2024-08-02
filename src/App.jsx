import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from './wining-combination';
import GameOver from "./components/GameOver";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];



function driveActivePlayer(GameTurns) {
  let currentPlayer = 'X';
  if (GameTurns.length > 0 && GameTurns[0].player === 'X')
    currentPlayer = "O";

  return currentPlayer;
}


function App() {
  // const [activePlayer, setActivePlayer] = useState('X');

  const [playerName, setPlayerName] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })
  const [GameTurns, setGameTurns] = useState([]);
  const activePlayer = driveActivePlayer(GameTurns);

  const gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of GameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstPlayerSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondPlayerSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdPlayerSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstPlayerSymbol && firstPlayerSymbol === secondPlayerSymbol && firstPlayerSymbol === thirdPlayerSymbol)
      winner = playerName[firstPlayerSymbol];
  }

  const hasDrow = GameTurns.length === 9 && !winner;

  function HandlePlayerNameChanged(symbol, name) {
    setPlayerName((prev) => {
      return {
        ...prev,
        [symbol]: name,
      }
    });
  }

  function HandleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((Player) => Player === "X" ? 'O' : "X");

    setGameTurns((prevTurns) => {
      const currentPlayer = driveActivePlayer(prevTurns);
      const updateTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updateTurns;
    })
  }

  function Rematch() {
    setGameTurns([]);
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={() => HandlePlayerNameChanged()} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={() => HandlePlayerNameChanged()} />
        </ol>
        {(winner || hasDrow) && <GameOver winner={winner} Rematch={Rematch} />}
        <GameBoard onSelectSquare={HandleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={GameTurns} />
    </main>
  );




}

export default App


/*


  const [ActivePlayer, setActivePlayer] = useState("X");
  const [GameTurns, setGameTurns] = useState([]);


  function HandleSelectSquare(rowIndex, colIndex) {

    setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? 'O' : "X");


    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X')
        currentPlayer = "O";

      const updateTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updateTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={ActivePlayer === "X"} />
          <Player initialName="Player 2" symbol="O" isActive={ActivePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={HandleSelectSquare} turns={GameTurns} />
      </div>
      <Log />
    </main>
  )


*/

