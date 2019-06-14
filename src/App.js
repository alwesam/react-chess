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

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      board: {
              "1a": <WhiteRook className="piece" id="wr1"/>,
              "1b": <WhiteKnight className="piece" id="wk1"/>,
              "1c": <WhiteBishop className="piece" id="wb1"/>,
              "1d": <WhiteKing className="piece" id="wkg1"/>,
              "1e": <WhiteQueen className="piece" id="wq1"/>,
              "1f": <WhiteBishop className="piece" id="wb2"/>,
              "1g": <WhiteKnight className="piece" id="wk2"/>,
              "1h": <WhiteRook className="piece" id="wr2"/>,
                 
              "2a": <WhitePawn className="piece" id="wp1"/>,
              "2b": <WhitePawn className="piece" id="wp2"/>,
              "2c": <WhitePawn className="piece" id="wp3"/>,
              "2d": <WhitePawn className="piece" id="wp4"/>,
              "2e": <WhitePawn className="piece" id="wp5"/>,
              "2f": <WhitePawn className="piece" id="wp6"/>,
              "2g": <WhitePawn className="piece" id="wp7"/>,
              "2h": <WhitePawn className="piece" id="wp8"/>,
                 
              "7a": <BlackPawn className="piece" id="bp1"/>,
              "7b": <BlackPawn className="piece" id="bp2"/>,
              "7c": <BlackPawn className="piece" id="bp3"/>,
              "7d": <BlackPawn className="piece" id="bp4"/>,
              "7e": <BlackPawn className="piece" id="bp5"/>,
              "7f": <BlackPawn className="piece" id="bp6"/>,
              "7g": <BlackPawn className="piece" id="bp7"/>,
              "7h": <BlackPawn className="piece" id="bp8"/>,
                 
              "8a": <BlackRook className="piece" id="br1"/>,
              "8b": <BlackKnight className="piece" id="bk1"/>,
              "8c": <BlackBishop className="piece" id="bb1"/>,
              "8d": <BlackKing className="piece" id="bkg1"/>,
              "8e": <BlackQueen className="piece" id="bq1"/>,
              "8f": <BlackBishop className="piece" id="bb2"/>,
              "8g": <BlackKnight className="piece" id="bk2"/>,
              "8h": <BlackRook className="piece" id="br2"/>
             }
    }
  }

  getKey = (index) => {
   let obj = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"} 
   let fx = obj[index % 8];
   let fy = 8 - parseInt(index/8);
   return fy+fx; 
  }

  onDragStart = (ev, index) => {
    ev.dataTransfer.setData("text/html", ev.target.id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
    if (true) { //check conditions (source, destination, piece)
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
    if (true) { //conditions for allowing this move (source, destination, piece)
      ev.target.appendChild(document.getElementById(data));
    }
  };

  render() {

    const grey    = "grey";
    const yellow  = "#dede99";

    var squares = [];
    var swtch   = true;
    var board   = this.state.board

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
      if (this.state.board[key] === undefined)
        var element = <div id={key} key={key} className="square-class" style={{backgroundColor: color}} 
                            onDrop={ (e) => this.onDrop(e) }
                            onDragLeave={ (e) => this.onDragLeave(e) }
                            onDragOver={ (e) => this.onDragOver(e) }></div>;
      else
        var element = <div id={key} key={key} className="square-class" style={{backgroundColor: color}} 
                            onDrop={ (e) => this.onDrop(e) }
                            onDragLeave={ (e) => this.onDragLeave(e) }
                            onDragOver={ (e) => this.onDragOver(e) }>
                                <div 
                                  draggable
                                  onDragStart={e => this.onDragStart(e,key)} 
                                  >
                                  {this.state.board[key]}
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
