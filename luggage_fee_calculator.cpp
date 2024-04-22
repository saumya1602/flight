#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// Structure to represent luggage information
struct Luggage {
    int weightLimitPerBag;
    int costPerBag;
};

// Graph node structure
struct GraphNode {
    int weightLimit;
    int parentNodeIndex; // Index of parent node in MST
};

// Graph edge structure
struct GraphEdge {
    int sourceIndex;
    int destinationIndex;
    int weight; // Edge weight (cost)
};

class Graph {
private:
    vector<GraphNode> nodes;

public:
    Graph(int size) {
        nodes.resize(size);
        // Initialize nodes with weight limits
        for (int i = 0; i < size; i++) {
            nodes[i].weightLimit = i;
            nodes[i].parentNodeIndex = -1; // Initialize parent node index to -1
        }
    }

    void addEdge(int source, int destination, int weight) {
        // Graph implementation if needed
    }

    int calculateEdgeWeight(const GraphNode& source, const GraphNode& destination, const Luggage& luggage) {
        return (destination.weightLimit - source.weightLimit) * luggage.costPerBag;
    }

    int findOptimalFee(int desiredWeightLimit, const Luggage& luggage) {
        int currentWeightLimit = desiredWeightLimit;
        int optimalFee = 0;

        while (currentWeightLimit > 0) {
            int parentNodeIndex = nodes[currentWeightLimit].parentNodeIndex;
            int edgeWeight = calculateEdgeWeight(nodes[parentNodeIndex], nodes[currentWeightLimit], luggage);
            optimalFee += edgeWeight;
            currentWeightLimit = parentNodeIndex;
        }

        return optimalFee;
    }
};

int main() {
    // Example usage
    Graph graph(11); // Example: considering weight limits from 0 to 10 bags
    // Add edges to the graph if needed

    // Example: desired weight limit and luggage information
    int desiredWeightLimit = 5;
    Luggage luggage = {10, 50}; // Example: weight limit per bag = 10, cost per bag = 50

    // Calculate optimal fee
    int optimalFee = graph.findOptimalFee(desiredWeightLimit, luggage);
    cout << "Optimal luggage fee: " << optimalFee << endl;

    return 0;
}
