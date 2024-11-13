/**
 * Represents a node in the graph.
 */
class Node {
  /**
   * Creates a new node.
   * @param {number|null} vertex - The vertex of the node.
   * @param {Array<number>|null} moves - The possible moves from this node.
   */
  constructor(vertex = null, moves = null) {
    this.vertex = vertex;
    this.parent = null;
    this.moves = moves;
  }
}

/**
 * Represents the knight's moves graph.
 */
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

  /**
   * Generates the adjacency list for the knight's moves.
   * @returns {Array<Array<number>>} The adjacency list.
   */
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

  /**
   * Calculates the possible moves from a given starting coordinate.
   * @param {Array<number>} startingCoords - The starting coordinates.
   * @returns {Array<number>} The possible moves.
   */
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

  /**
   * Finds the shortest path from the starting vertex to the target vertex.
   * @param {number} startingVertex - The starting vertex.
   * @param {number} targetVertex - The target vertex.
   * @returns {Object} The path and its depth.
   */
  findPath(startingVertex, targetVertex) {
    let q = [[startingVertex, null]];
    let frontIndex = 0;
    let depth = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      let node = new Node(front[0], this.adjacencyList[front[0]]);
      if (front[1]) node.parent = front[1];

      if (node.vertex == targetVertex) return this.returnPathToNode(node);
      else {
        for (const move of node.moves) {
          q.push([move, node]);
        }
      }
      frontIndex++;
    }
  }

  /**
   * Returns the path to the given node.
   * @param {Node} node - The node.
   * @returns {Object} The path and its depth.
   */
  returnPathToNode(node) {
    let depth = 0;
    const pathArray = [];
    while (node.parent) {
      depth++;
      pathArray.push(this.returnCoordsFromVertex(node.vertex));
      node = node.parent;
    }
    pathArray.push(this.returnCoordsFromVertex(node.vertex));
    pathArray.reverse();
    return { depth, pathArray };
  }

  /**
   * Prints the levels of the graph.
   * @param {number} vertex - The vertex.
   * @param {number} depth - The depth.
   */
  printLevels(vertex, depth) {
    const node = new Node(vertex, this.adjacencyList[vertex]);
    if (depth == 0) {
      return;
    } else {
      console.log(node.vertex + " - " + node.moves);
      for (const move of node.moves) {
        this.printLevels(move, depth - 1);
      }
    }
  }

  /**
   * Checks if the coordinates are valid.
   * @param {Array<number>} coords - The coordinates.
   * @returns {boolean} True if the coordinates are valid, false otherwise.
   */
  checkCoordValidity(coords) {
    if (coords[0] >= 0 && coords[0] <= 7 && coords[1] >= 0 && coords[1] <= 7)
      return true;
    else return false;
  }

  /**
   * Returns the vertex from the given coordinates.
   * @param {Array<number>} coords - The coordinates.
   * @returns {number} The vertex.
   */
  returnVertexFromCoords(coords) {
    let x = coords[0],
      y = coords[1],
      vertex = x * 8 + y;
    return vertex;
  }

  /**
   * Returns the coordinates from the given vertex.
   * @param {number} vertex - The vertex.
   * @returns {Array<number>} The coordinates.
   */
  returnCoordsFromVertex(vertex) {
    const coords = [];
    coords[0] = Math.floor(vertex / 8);
    coords[1] = vertex % 8;
    return coords;
  }
}

/**
 * Finds the shortest path for the knight's moves from the starting coordinates to the ending coordinates.
 * @param {Array<number>} startingCoords - The starting coordinates.
 * @param {Array<number>} endingCoords - The ending coordinates.
 */
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
  const depth = path.depth;
  const pathArray = path.pathArray;
  console.log(`You made it in ${depth} moves!  Here's your path:`);

  for (const entry of pathArray) {
    console.log(entry);
  }
}

knightMoves([0, 0], [1, 6]);
const graph = new KnightMovesGraph();

knightMoves([0, 0], graph.returnCoordsFromVertex(63));
