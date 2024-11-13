class Node {
  constructor(vertex = null, moves = null, adjacencyList) {
    this.vertex = vertex;
    this.parent = null;
    this.moves = moves;
    this.subNodes = [];
    this.adjacencyList = adjacencyList;
  }

  createSubNodes() {
    for (const vertex of this.moves) {
      const subNode = new Node(
        vertex,
        this.adjacencyList[vertex],
        this.adjacencyList
      );
      subNode.parent = this;
      this.subNodes.push(subNode);
    }
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
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (const permutation of permutations) {
      let newCoords = [leftCoord + permutation[0], rightCoord + permutation[1]];
      if (this.checkCoordValidity(newCoords))
        possibleMoves.push(this.returnVertexFromCoords(newCoords));
    }
    return possibleMoves;
  }

  checkCoordValidity(coords) {
    if (coords[0] >= 0 && coords[0] <= 7 && coords[1] >= 0 && coords[1] <= 7)
      return true;
    else return false;
  }

  returnVertexFromCoords(coords) {
    let x = coords[0],
      y = coords[1],
      vertex = x * 8 + y;
    return vertex;
  }

  returnCoordsFromVertex(vertex) {
    const coords = [];
    coords[0] = Math.floor(vertex / 8);
    coords[1] = vertex % 8;
    return coords;
  }

  findPath(startingVertex, targetVertex) {
    let q = [[startingVertex, null]];
    let frontIndex = 0;
    let depth = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      let node = new Node(
        front[0],
        this.adjacencyList[front[0]],
        this.adjacencyList
      );
      if (front[1]) node.parent = front[1];

      if (node.vertex == targetVertex) return this.returnDepthFromNode(node);
      else {
        for (const move of node.moves) {
          q.push([move, node]);
        }
      }
      depth++;
      frontIndex++;
    }
  }

  returnDepthFromNode(node) {
    let depth = 0;
    while (node.parent) {
      depth++;
      node = node.parent;
    }
    return depth;
  }

  printLevels(vertex, depth) {
    const node = new Node(
      vertex,
      this.adjacencyList[vertex],
      this.adjacencyList
    );
    if (depth == 0) {
      return;
    } else {
      console.log(node.vertex + " - " + node.moves);
      for (const move of node.moves) {
        this.printLevels(move, depth - 1);
      }
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
  const startingVertex = graph.returnVertexFromCoords(startingCoords);
  const endingVertex = graph.returnVertexFromCoords(endingCoords);
  const path = graph.findPath(startingVertex, endingVertex);
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

console.log(graph.singleMove(graph.returnCoordsFromVertex(17)));
console.log(graph.printLevels(0, 2));

console.log(graph.findSinglePath(0, 63));
