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

  findEnd(startingVertex, endingVertex) {
    const startingNode = new Node(
      startingVertex,
      this.adjacencyList[startingVertex],
      this.adjacencyList
    );
    const endingNode = new Node(
      endingVertex,
      this.adjacencyList[endingVertex],
      this.adjacencyList
    );
    let pathSize = 0;
    const path = [pathSize, this.returnCoordsFromVertex(startingVertex)];
    let found = false;
    let i = 0,
      j = 0;

    while (found == false && i < startingNode.moves.length) {
      let startingMove = startingNode.moves[i];
      let endingMove = endingNode.moves[j++];
      if (j == endingNode.moves.length) {
        j = 0;
        i++;
      }
      if (startingNode.vertex == endingMove) {
        path[0]++;
        path.push(this.returnCoordsFromVertex(endingNode.vertex));
        found = true;
        return path;
      } else if (startingMove == endingMove) {
        path[0]++;
        path.push(this.returnCoordsFromVertex(endingMove));
        path[0]++;
        path.push(this.returnCoordsFromVertex(endingNode.vertex));
        found = true;
        return path;
      }
    }
    return false;
  }

  findPath(startingVertex, endingVertex) {
    const startingNode = new Node(
      startingVertex,
      this.adjacencyList[startingVertex],
      this.adjacencyList
    );
    const endingNode = new Node(
      endingVertex,
      this.adjacencyList[endingVertex],
      this.adjacencyList
    );
    for (const move of startingNode.moves) {
      let path = this.findEnd(move, endingVertex);
      if (path) return path;
    }
  }

  findSinglePath(startingVertex, targetVertex) {
    const node = new Node(
      startingVertex,
      this.adjacencyList[startingVertex],
      this.adjacencyList
    );

    let q = [startingVertex];
    let frontIndex = 0;

    while (frontIndex < q.length) {
      let front = q[frontIndex];
      let node = new Node(
        startingVertex,
        this.adjacencyList[startingVertex],
        this.adjacencyList
      );
      if (front.left) q.push(front.left);
      if (front.right) q.push(front.right);
      frontIndex++;
    }
    /**
      if (startingVertex == targetVertex) {
        return true;
      } else {
        for (const move of node.moves) {
          if (move == targetVertex) return true;
        }
      }
      for (const move of node.moves) {
        return this.findSinglePath(move, targetVertex);
      }
    */
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
console.log(graph.findSinglePath(0, 34));
