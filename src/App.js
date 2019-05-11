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
              "1a": <WhiteRook id="wr1"/>,
              "1b": <WhiteKnight id="wk1"/>,
              "1c": <WhiteBishop id="wb1"/>,
              "1d": <WhiteKing id="wkg1"/>,
              "1e": <WhiteQueen id="wq1"/>,
              "1f": <WhiteBishop id="wb2"/>,
              "1g": <WhiteKnight id="wk2"/>,
              "1h": <WhiteRook id="wr2"/>,
                 
              "2a": <WhitePawn id="wp1"/>,
              "2b": <WhitePawn id="wp2"/>,
              "2c": <WhitePawn id="wp3"/>,
              "2d": <WhitePawn id="wp4"/>,
              "2e": <WhitePawn id="wp5"/>,
              "2f": <WhitePawn id="wp6"/>,
              "2g": <WhitePawn id="wp7"/>,
              "2h": <WhitePawn id="wp8"/>,
                 
              "7a": <BlackPawn id="bp1"/>,
              "7b": <BlackPawn id="bp2"/>,
              "7c": <BlackPawn id="bp3"/>,
              "7d": <BlackPawn id="bp4"/>,
              "7e": <BlackPawn id="bp5"/>,
              "7f": <BlackPawn id="bp6"/>,
              "7g": <BlackPawn id="bp7"/>,
              "7h": <BlackPawn id="bp8"/>,
                 
              "8a": <BlackRook id="br1"/>,
              "8b": <BlackKnight id="bk1"/>,
              "8c": <BlackBishop id="bb1"/>,
              "8d": <BlackKing id="bkg1"/>,
              "8e": <BlackQueen id="bq1"/>,
              "8f": <BlackBishop id="bb2"/>,
              "8g": <BlackKnight id="bk2"/>,
              "8h": <BlackRook id="br2"/>
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
    ev.stopPropagation();
  };

  onDrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    ev.target.appendChild(document.getElementById(data));
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
        var element = <div id={key} key={key} style={{backgroundColor: color, height: "100px", width: "100px", float: "left"}} 
                            onDrop={ (e) => this.onDrop(e) }
                            onDragOver={ (e) => this.onDragOver(e)}></div>;
      else
        var element = <div id={key} key={key} style={{backgroundColor: color, height: "100px", width: "100px", float: "left"}} 
                            onDrop={ (e) => this.onDrop(e) }
                            onDragOver={ (e) => this.onDragOver(e)}>
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
