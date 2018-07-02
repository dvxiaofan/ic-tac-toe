
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 利用函数定义组件 修改 只有render方法的组件
function Square(props) {
    return (
      <button className="square" onClick={ props.onClick }>
        {props.value}
      </button>
    );
}

// 判断胜方
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {

  renderSquare(i) {
		return (
			<Square 
				// value 属性中传递对应 state 数组元素的值
				value={this.props.squares[i]} 
				// 传递一个事件处理函数到 Square 当中
				onClick={() => this.props.onClick(i)}
			/>
		);
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
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }

	handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];    
		// 使用 .slice() 方法对已有的数组数据进行了浅拷贝，以此来防止对已有数据的改变
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
		squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      // 切换 xIsNext 的状态
      xIsNext: !this.state.xIsNext
    });
	}

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
