export class Luggage {
    constructor(weightLimit, costPerBag) {
        this.weightLimit = weightLimit;
        this.costPerBag = costPerBag;
    }
}

export class LuggageRecord {
    constructor(desiredWeightLimit, optimalFee, timestamp) {
        this.desiredWeightLimit = desiredWeightLimit;
        this.optimalFee = optimalFee;
        this.timestamp = timestamp;
    }
}

export class GraphNode {
    constructor(weightLimit, parentNodeIndex) {
        this.weightLimit = weightLimit;
        this.parentNodeIndex = parentNodeIndex;
    }
}

export class GraphEdge {
    constructor(sourceIndex, destinationIndex, weight) {
        this.sourceIndex = sourceIndex;
        this.destinationIndex = destinationIndex;
        this.weight = weight;
    }
}

export class Graph {
    constructor(size) {
        this.nodes = new Array(size);
        this.adjacencyList = new Array(size).fill().map(() => []);
    }

    addEdge(source, destination, weight) {
        const edge = new GraphEdge(source, destination, weight);
        this.adjacencyList[source].push(edge);
    }

    calculateEdgeWeight(source, destination, luggage) {
        return (destination.weightLimit - source.weightLimit) * luggage.costPerBag;
    }
/*
    constructMST() {
        const visited = new Array(this.nodes.length).fill(false);
        const minCost = new Array(this.nodes.length).fill(Number.MAX_VALUE);
        const parent = new Array(this.nodes.length).fill(-1);

        minCost[0] = 0; // Starting node

        for (let i = 0; i < this.nodes.length; ++i) {
            let minNode = -1;
            for (let j = 0; j < this.nodes.length; ++j) {
                if (!visited[j] && (minNode === -1 || minCost[j] < minCost[minNode])) {
                    minNode = j;
                }
            }

            visited[minNode] = true;

            for (const edge of this.adjacencyList[minNode]) {
                if (!visited[edge.destinationIndex] && edge.weight < minCost[edge.destinationIndex]) {
                    parent[edge.destinationIndex] = minNode;
                    minCost[edge.destinationIndex] = edge.weight;
                }
            }
        }

        for (let i = 1; i < this.nodes.length; ++i) {
            this.nodes[i].parentNodeIndex = parent[i];
        }
    }
*/
// Inside the constructMST method of the Graph class

constructMST() {
    // Initialize parent and minCost arrays
    const visited = new Array(this.nodes.length).fill(false);
    const minCost = new Array(this.nodes.length).fill(Infinity);
    const parent = new Array(this.nodes.length).fill(-1);

    // Set the cost of the starting node to 0
    minCost[0] = 0;

    // Iterate over nodes
    for (let i = 0; i < this.nodes.length; ++i) {
        // Find the minimum cost node that has not been visited yet
        let minNode = -1;
        for (let j = 0; j < this.nodes.length; ++j) {
            if (!visited[j] && (minNode === -1 || minCost[j] < minCost[minNode])) {
                minNode = j;
            }
        }

        // Mark the minimum cost node as visited
        visited[minNode] = true;

        // Update the cost and parent for neighboring nodes
        for (const edge of this.adjacencyList[minNode]) {
            if (!visited[edge.destinationIndex] && edge.weight < minCost[edge.destinationIndex]) {
                parent[edge.destinationIndex] = minNode;
                minCost[edge.destinationIndex] = edge.weight;
            }
        }
    }

    // Update parent information in nodes
    for (let i = 1; i < this.nodes.length; ++i) {
        this.nodes[i].parentNodeIndex = parent[i];
    }
}

    findOptimalFee(desiredWeightLimit, luggage) {
        let currentWeightLimit = desiredWeightLimit;
        let optimalFee = 0;

        while (currentWeightLimit > 0) {
            const parentNodeIndex = this.nodes[currentWeightLimit].parentNodeIndex;
            const edgeWeight = this.calculateEdgeWeight(this.nodes[parentNodeIndex], this.nodes[currentWeightLimit], luggage);
            optimalFee += edgeWeight;
            currentWeightLimit = parentNodeIndex;
        }

        return optimalFee;
    }
}
/*
module.exports = {
    Luggage,
    LuggageRecord,
    GraphNode,
    GraphEdge,
    Graph
};*/
//module.exports = Graph;