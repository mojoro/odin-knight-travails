class KnightMovesGraph {
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.adjacencyList = this.knightAdjacencyList();
  }

  knightAdjacencyList() {
    const adjacencyList = {};
    let x = 0,
      y = 0;
    while (x < this.board.length && y <= this.board[x].length) {
      if (y == 8) {
        y = 0;
        x++;
      }
      const edges = this.singleMove([x, y]);
      const keyString = `${x},${y++}`;
      adjacencyList[keyString] = edges;
    }
    return adjacencyList;
  }

  singleMove(startingCoords) {
    const possibleMoves = [];
    const leftCoord = startingCoords[0];
    const rightCoord = startingCoords[1];
    const permutations = [
      [1, 2],
      [2, 1],
      [-1, 2],
      [-2, 1],
      [1, -2],
      [2, -1],
      [-1, -2],
      [-2, -1],
    ];

    for (const permutation of permutations) {
      let newCoords = [leftCoord + permutation[0], rightCoord + permutation[1]];
      if (this.checkCoordValidity(newCoords)) possibleMoves.push(newCoords);
    }
    return possibleMoves;
  }

  checkCoordValidity(coords) {
    if (coords[0] >= 0 && coords[0] <= 7 && coords[1] >= 0 && coords[1] <= 7)
      return true;
    else return false;
  }

  returnStringFromCoords(coords) {
    return `${coords[0]},${coords[1]}`;
  }
}

function knightMoves(startingCoords, endingCoords) {
  const graph = new KnightMovesGraph();
  if (
    !graph.checkCoordValidity(startingCoords) ||
    !graph.checkCoordValidity(endingCoords)
  )
    throw new Error("Invalid coordinates!");

  const startingString = graph.returnStringFromCoords(startingCoords);
  const endingString = graph.returnStringFromCoords(endingCoords);
  let pathSize = 0;
  const path = [startingCoords];

  for (const possibleMove of graph.adjacencyList[startingString]) {
    const possibleString = graph.returnStringFromCoords(possibleMove);
    if (possibleString == endingString) {
      pathSize++;
      path.push(possibleMove);
      console.log(`You arrived in ${pathSize} move!`);
      console.log(path);
      return;
    }
  }
}

// represent the board
// calculate possible single moves
// calculate edges for the board based on the move sequence
// depth first or breadth first search to find the shortest path

knightMoves([0, 0], [1, 2]);
