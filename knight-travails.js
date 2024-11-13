class Node {
  constructor(vertex = null, moves = null) {
    this.vertex = vertex;
    this.parent = null;
    this.moves = moves;
  }
}

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
    const adjacencyList = [];
    let x = 0,
      y = 0;
    while (x < this.board.length && y <= this.board[x].length) {
      if (y == 8) {
        y = 0;
        x++;
      }
      const edges = this.singleMove([x, y++]);
      adjacencyList.push(edges);
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
      if (this.checkCoordValidity(newCoords))
        possibleMoves.push(this.returnIndexFromCoords(newCoords));
    }
    return possibleMoves;
  }

  checkCoordValidity(coords) {
    if (coords[0] >= 0 && coords[0] <= 7 && coords[1] >= 0 && coords[1] <= 7)
      return true;
    else return false;
  }

  returnIndexFromCoords(coords) {
    let x = coords[0],
      y = coords[1],
      index = x * 8 + y;
    return index;
  }

  returnCoordsFromIndex(index) {
    const coords = [];
    coords[0] = Math.floor(index / 8);
    coords[1] = index % 8;
    return coords;
  }

  findEnd(startingIndex, endingIndex) {
    const startingNode = new Node(
      startingIndex,
      this.adjacencyList[startingIndex]
    );
    const endingNode = new Node(endingIndex, this.adjacencyList[endingIndex]);
    let pathSize = 0;
    const path = [pathSize, this.returnCoordsFromIndex(startingIndex)];
    let found = false;
    let q = [];
    let i = 0,
      j = 0;

    let currentNodes = [startingNode, endingNode];
    q.push(currentNodes);

    while (q.length > 0 && found == false && i < q[0][0].moves.length) {
      let startingMove = startingNode.moves[i];
      let endingMove = endingNode.moves[j++];
      if (j == endingNode.moves.length) {
        j = 0;
        i++;
      }
      if (startingNode.vertex == endingMove) {
        path[0]++;
        path.push(this.returnCoordsFromIndex(endingNode.vertex));
        found = true;
        return path;
      } else if (startingMove == endingMove) {
        path[0]++;
        path.push(this.returnCoordsFromIndex(endingMove));
        path[0]++;
        path.push(this.returnCoordsFromIndex(endingNode.vertex));
        found = true;
        return path;
      }
    }
    return false;
  }

  findPath(startingIndex, endingIndex) {
    const startingNode = new Node(
      startingIndex,
      this.adjacencyList[startingIndex]
    );
    const endingNode = new Node(endingIndex, this.adjacencyList[endingIndex]);
    for (const move of startingNode.moves) {
      let path = this.findEnd(move, endingIndex);
      if (path) return path;
    }
  }
}

function knightMoves(startingCoords, endingCoords) {
  const graph = new KnightMovesGraph();
  if (
    !graph.checkCoordValidity(startingCoords) ||
    !graph.checkCoordValidity(endingCoords)
  )
    throw new Error("Invalid coordinates!");
  const startingIndex = graph.returnIndexFromCoords(startingCoords);
  const endingIndex = graph.returnIndexFromCoords(endingCoords);
  const path = graph.findPath(startingIndex, endingIndex);
  for (const entry of path) {
    console.log(entry);
  }
}

// represent the board
// calculate possible single moves
// calculate edges for the board based on the move sequence
// depth first or breadth first search to find the shortest path

knightMoves([0, 0], [1, 6]);
const graph = new KnightMovesGraph();
