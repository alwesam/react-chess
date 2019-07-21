import React, { Component } from 'react';

//pieces
import BlackKing from './pieces/blackKing.js';
import WhiteKing from './pieces/whiteKing.js';
import BlackQueen from './pieces/blackQueen.js';
import WhiteQueen from './pieces/whiteQueen.js';
import BlackKnight from './pieces/blackKnight.js';
import WhiteKnight from './pieces/whiteKnight.js';
import BlackRook from './pieces/blackRook.js';
import WhiteRook from './pieces/whiteRook.js';
import BlackBishop from './pieces/blackBishop.js';
import WhiteBishop from './pieces/whiteBishop.js';
import BlackPawn from './pieces/blackPawn.js';
import WhitePawn from './pieces/whitePawn.js';

import './App.css';

//rules
import isValidMove from './rules.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      src:   null,
      capturedPieces: [],
      board: {
              "1a": "wr1",
              "1b": "wk1",
              "1c": "wb1",
              "1d": "wkg1",
              "1e": "wq1",
              "1f": "wb2",
              "1g": "wk2",
              "1h": "wr2",
                 
              "2a": "wp1",
              "2b": "wp2",
              "2c": "wp3",
              "2d": "wp4",
              "2e": "wp5",
              "2f": "wp6",
              "2g": "wp7",
              "2h": "wp8",
                 
              "7a": "bp1",
              "7b": "bp2",
              "7c": "bp3",
              "7d": "bp4",
              "7e": "bp5",
              "7f": "bp6",
              "7g": "bp7",
              "7h": "bp8",
                 
              "8a": "br1",
              "8b": "bk1",
              "8c": "bb1",
              "8d": "bkg1",
              "8e": "bq1",
              "8f": "bb2",
              "8g": "bk2",
              "8h": "br2"
             }
    }
  }

  getKey = (index) => {
   let obj = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"} 
   let fx = obj[index % 8];
   let fy = 8 - parseInt(index/8);
   return fy+fx; 
  }

  onDragStart = (ev) => {
    ev.dataTransfer.setData("text/html", ev.target.id);
  };

  onDragOver = (ev,data) => {
    ev.preventDefault();

    var newBoard = this.state.board
    var src  = this.getKeyByValue(newBoard,data);
    var dest = ev.target.id;

    if (isValidMove(this.pieceName(data),src,dest,newBoard)) { //check conditions (source, destination, piece)
      ev.target.style.border = "2px solid green"; //move allowed
    } else {
      ev.target.style.border = "2px solid red";  //move not allowed
    }
    ev.stopPropagation();
  };

  onDragLeave = (ev) => {
    ev.preventDefault();
    ev.target.style.border = "";
    ev.stopPropagation();
  }

  onDrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    ev.target.style.border = "";

    var dest     = ev.target.id;
    var newBoard = this.state.board
    var src      = this.getKeyByValue(newBoard,data);

    if (isValidMove(this.pieceName(data), src, dest, newBoard)) { //conditions for allowing this move (source, destination, piece)
      newBoard[src]  = undefined;
      newBoard[dest] = data;
      this.setState({ board: newBoard });
    }
  };

  getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  pieceName = (id) => {
    if (id == undefined)
      return ""
    else if (id.match(/wp/) != undefined)
      return "white_pawn";
    else if (id.match(/bp/) != undefined)
      return "black_pawn";
    else if (id.match(/wkg/) != undefined || id.match(/bkg/) != undefined)
      return "king";
    else if (id.match(/wk/) != undefined || id.match(/bk/) != undefined)
      return "knight";
    else if (id.match(/wr/) != undefined || id.match(/br/) != undefined)
      return "rook"
    else if (id.match(/wq/) != undefined || id.match(/bq/) != undefined)
      return "queen"
    else if (id.match(/wb/) != undefined || id.match(/bb/) != undefined)
      return "bishop"
    else
      return ""
  }

  renderPiece = (id) => {
    if (id == undefined)
      return ""

    if (id.match(/wp/) != undefined)
      return <WhitePawn className="piece" id={id}/>;
    else if (id.match(/wkg/) != undefined)
      return <WhiteKing className="piece" id={id}/>;
    else if (id.match(/wk/) != undefined)
      return <WhiteKnight className="piece" id={id}/>;
    else if (id.match(/wr/) != undefined)
      return <WhiteRook className="piece" id={id}/>;
    else if (id.match(/wq/) != undefined)
      return <WhiteQueen className="piece" id={id}/>;
    else if (id.match(/wb/) != undefined)
      return <WhiteBishop className="piece" id={id}/>;
    else if (id.match(/bp/) != undefined)
      return <BlackPawn className="piece" id={id}/>;
    else if (id.match(/bkg/) != undefined)
      return <BlackKing className="piece" id={id}/>;
    else if (id.match(/bk/) != undefined)
      return <BlackKnight className="piece" id={id}/>;
    else if (id.match(/br/) != undefined)
      return <BlackRook className="piece" id={id}/>;
    else if (id.match(/bq/) != undefined)
      return <BlackQueen className="piece" id={id}/>;
    else if (id.match(/bb/) != undefined)
      return <BlackBishop className="piece" id={id}/>;
    else
      return ""
  }

  render() {

    const grey    = "grey";
    const yellow  = "#dede99";

    var squares = [];
    var swtch   = true;
    var board   = this.state.board

    console.log(board);

    for (var i = 0; i < 64; i++) {

      if ( i % 8 == 0  && i != 0) {
        squares.push(<div key={"filler"+i} style={{height: "100px", width: "100px"}}/>);
        swtch = !swtch;
      } 
      if ( i % 8 == 0 ) {
        let index = (64-i)/8;
        squares.push(<div key={"number"+i} style={{height: "60px", width: "10px", paddingTop: "40px", float: "left"}}>{index}</div>);
      }
      var color   = i % 2 == 0 ? grey : yellow; 
      if (swtch)
        color   = i % 2 == 0 ? yellow : grey; 

      var key = this.getKey(i);
      if (board[key] === undefined)
        var element = <div id={key} key={key} className="square-class" style={{backgroundColor: color}} 
                            onDrop={ (e) => this.onDrop(e) }
                            onDragLeave={ (e) => this.onDragLeave(e) }
                            onDragOver={ (e) => this.onDragOver(e,board[key]) }></div>;
      else
        var element = <div id={key} key={key} className="square-class" style={{backgroundColor: color}} 
                            onDrop={ (e) => this.onDrop(e) }
                            onDragLeave={ (e) => this.onDragLeave(e) }
                            onDragOver={ (e) => this.onDragOver(e,board[key]) }>
                                <div 
                                  draggable
                                  onDragStart={e => this.onDragStart(e)} 
                                  >
                                  {this.renderPiece(board[key])}
                                </div>
                      </div>;
      squares.push(element);
    }

    squares.push(<div key={"filler"+i} style={{height: "100px", width: "100px"}}/>);
    for (var i=0; i<8; i++) {
      let obj = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"} 
      var key = obj[i]+i;
      var padding = i == 0 ? "50px" : "0px";
      squares.push(<div id={key} style={{height: "100px", width: "100px", float: "left", paddingLeft: padding}}>{obj[i]}</div>)
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Chess Board</h2>
        </div>
        <div>
          <div style={{marginLeft: "28%", marginTop: "100px"}} >
            {squares}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
