//TODO add castling and en-passant
export default function isValidMove(piece,src,dest,board) {

  const isValidPawnMove = (src,dest,dir,board) => { //to do add en-passent
    var vert  = (parseInt(dest[0]) - parseInt(src[0])) * dir == 1;
    var vert2 = (parseInt(dest[0]) - parseInt(src[0])) * dir == 2 && (src[0] == 2 || src[0] == 7);
    var hort = src[1] == dest[1];
    var capture = vert && (Math.abs(mapLettersToNums(src[1]) - mapLettersToNums(dest[1])) == 1) 
                       && board[dest] != undefined && board[dest][0] != board[src][0];
    return ((vert || vert2) && hort && board[dest] == undefined) || capture;
  }
  const isValidKnightMove = (src,dest,board) => {
    var config1  = (Math.abs(parseInt(dest[0]) - parseInt(src[0]))) == 2 &&  (Math.abs(mapLettersToNums(dest[1]) - mapLettersToNums(src[1]))) == 1;
    var config2  = (Math.abs(parseInt(dest[0]) - parseInt(src[0]))) == 1 &&  (Math.abs(mapLettersToNums(dest[1]) - mapLettersToNums(src[1]))) == 2;
    var undefinedOrEnemy = board[dest] == undefined || board[dest][0] != board[src][0];
    return (config1 || config2) && undefinedOrEnemy;  //special case
  }
  const isValidRookMove = (src,dest,board,maxMoveCount=7) => {
    var vert_diff  = Math.abs(parseInt(dest[0]) - parseInt(src[0]));
    var hort_diff  = Math.abs(mapLettersToNums(dest[1]) - mapLettersToNums(src[1]));
    var config1  = vert_diff > 0 && vert_diff <= maxMoveCount && hort_diff == 0;
    var config2  = vert_diff == 0 && hort_diff > 0 && hort_diff <= maxMoveCount;
    var undefinedOrEnemy = board[dest] == undefined || board[dest][0] != board[src][0];

    return (config1 || config2) && undefinedOrEnemy && pathIsClear(src,dest,board);
  }
  const isValidBishopMove = (src,dest,board,maxMoveCount=7) => {

    var vert_diff  = Math.abs(parseInt(dest[0]) - parseInt(src[0]));
    var hort_diff  = Math.abs(mapLettersToNums(dest[1]) - mapLettersToNums(src[1]));
    var config1    = vert_diff <= maxMoveCount && vert_diff == hort_diff;
    var undefinedOrEnemy = board[dest] == undefined || board[dest][0] != board[src][0];

    return config1 && undefinedOrEnemy && pathIsClear(src,dest,board);
  }
  const isValidQueenMove = (src,dest,board) => {
    return isValidBishopMove(src,dest,board) || isValidRookMove(src,dest,board); //combo rook and bishop
  }
  const isValidKingMove = (src,dest,board) => {
    return isValidBishopMove(src,dest,board,1) || isValidRookMove(src,dest,board,1);
  }

  const pathIsClear = (src,dest,board) => {
    //decide go straight or angle
    if (src[0] == dest[0] || src[1] == dest[1]) {
      if (src[0] != dest[0]) {
        var min = Math.min(parseInt(src[0]),parseInt(dest[0]));
        var max = Math.max(parseInt(src[0]),parseInt(dest[0]))-1;
        while ( max > min ) {
          //interpolate
          var dest_n = `${max}${dest[1]}`;
          if (board[dest_n] != undefined) {
            return false;
          }
          max -= 1;
        }
      } else {
        var min = Math.min(mapLettersToNums(src[1]),mapLettersToNums(dest[1]));
        var max = Math.max(mapLettersToNums(src[1]),mapLettersToNums(dest[1]))-1;
        while ( max > min ) {
          //interpolate
          var dest_n = `${dest[0]}${mapNumToLetter(max)}`;
          if (board[dest_n] != undefined) {
            return false;
          }
          max -= 1;
        }
      }
    } else {
      var src_y  = parseInt(src[0]);
      var dest_y = parseInt(dest[0]);
      var src_x  = mapLettersToNums(src[1]);
      var dest_x = mapLettersToNums(dest[1]);

      var traj_y = dest_y > src_y ? 1 : -1;
      var traj_x = dest_x > src_x ? 1 : -1;

      src_y  = src_y + 1 * traj_y;
      src_x  = src_x + 1 * traj_x;

      while ( src_y != dest_y && src_x != dest_x ) {
        var dest_n = `${src_y}${mapNumToLetter(src_x)}`;
        if (board[dest_n] != undefined) {
          return false;
        }
        src_y  = src_y + 1 * traj_y;
        src_x  = src_x + 1 * traj_x;
      }
    }
    return true;
  }

  const mapLettersToNums = (letter) => {
    var obj = { "a": 1, "b": 2, "c": 3, "d": 4, "e":5, "f": 6, "g": 7, "h": 8}
    return obj[letter];
  }
  const mapNumToLetter = (num) => {
    var obj = { 1: "a", 2: "b", 3: "c", 4: "d", 5: "e", 6: "f", 7: "g", 8: "h"}
    return obj[num];
  }

  if (src == dest || src == "" || dest == "" || dest[0].match(/[0-9]/) == undefined ) { //cannot move to same place
    return false
  }

  if (src == undefined || dest == undefined)
    return false

  if (piece == 'white_pawn')
    return isValidPawnMove(src,dest,1,board)
  else if (piece == 'black_pawn')
    return isValidPawnMove(src,dest,-1,board)
  else if (piece == 'knight')
    return isValidKnightMove(src,dest,board)
  else if (piece == 'rook')
    return isValidRookMove(src,dest,board)
  else if (piece == 'bishop')
    return isValidBishopMove(src,dest,board)
  else if (piece == 'queen')
    return isValidQueenMove(src,dest,board)
  else if (piece == 'king')
    return isValidKingMove(src,dest,board)

  return false;

}
