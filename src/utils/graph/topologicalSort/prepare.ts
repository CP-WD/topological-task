export const extractConnectedAdjacencyMap = (adjacencyMap: Map<string, string[]>, rootId: string): Map<string, string[]> => {
  const connectedAdjacencyMap = new Map<string, string[]>();

  const dfs = (node: string) => {
    connectedAdjacencyMap.set(node, adjacencyMap.get(node) || []);

    for (const child of adjacencyMap.get(node) || []) {
      dfs(child);
    }
  };

  dfs(rootId);

  return connectedAdjacencyMap;
};

export const isDAG = (adjacencyMap: Map<string, string[]>) => {
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const dfs = (node: string) => {
    if (visiting.has(node)) {
      return false;
    }

    if (visited.has(node)) {
      return true;
    }

    visiting.add(node);

    for (const child of adjacencyMap.get(node) || []) {
      if (!dfs(child)) {
        return false;
      }
    }

    visiting.delete(node);
    visited.add(node);

    return true;
  };

  for (const node of adjacencyMap.keys()) {
    if (!dfs(node)) {
      return false;
    }
  }

  return true;
};
