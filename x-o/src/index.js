import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick = {props.onClick}>
      {props.value}
    </button>
  )
}
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
      };
      console.log("Board props: ");
      console.log(props);
    }

    renderSquare(i) {
      console.log("rendering square(" + i + "): " + this.props.squares[i]);
      return <Square 
        value={this.props.squares[i]}
        onClick= {() => this.props.onClick(i)}
      />
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {  
        history: [{
          squares: Array(9).fill(null),
        }],
        currentSquares: Array(9).fill(null),
        xIsNext: true,
        stepNumber: 0,
        winner: null
      }
    } 

    handleSquareClick(i) {
      if (this.state.winner)
        return;

      console.log("handleSquareClick(" + i + ")");
      console.log(this.state);

      let newSquares = this.state.history[this.state.stepNumber].squares.slice();
      newSquares[i] = this.state.xIsNext ? 'X' : 'O';
      const oldHistory = this.state.history.slice(0, this.state.stepNumber + 1);
      const newHistory = oldHistory.concat({squares: newSquares});
      const newXIsNext = !this.state.xIsNext;
      // const winner = calculateWinner(newSquares);

      this.setState({
        history: newHistory, 
        xIsNext: newXIsNext, 
        stepNumber: oldHistory.length,
      });
    }

    jumpTo(move) {
      this.setState({
          stepNumber: move,
          xIsNext: move % 2 === 0
      });
    }

    render() {
      const newWinner = calculateWinner(this.state.history[this.state.history.length - 1]);
      const status = newWinner ? "WINNER IS: " + newWinner : ("Next move: " + (this.state.xIsNext ? 'X' : 'O'));
      const moves = this.state.history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return(
          <li key={move}>
            <button onClick = {() => {this.jumpTo(move)}}>{desc}</button>
          </li>
        );
      });
      const newSquares = this.state.history[this.state.stepNumber].squares.slice();
      return (
        <div className="game">
          <div className="game-board">
              {console.log("creating Game... \nGame state: ")}
              {console.log(this.state)}
            <Board 
              onClick = {(i) => this.handleSquareClick(i)}
              squares = {newSquares}
            />
          </div>
          <div className="game-info">
            <div> {status} </div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    console.log('calculating winner ...')
    const lines = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
        console.log("======================================== winner: " + squares[a]);
        return squares[a];
      }
    }

    return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  