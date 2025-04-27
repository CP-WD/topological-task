const calcInDegree = (adjacencyMap: Map<string, string[]>): Map<string, number> => {
  const inDegree = new Map<string, number>();

  for (const [, children] of adjacencyMap) {
    for (const child of children) {
      inDegree.set(child, (inDegree.get(child) || 0) + 1);
    }
  }

  return inDegree;
};

export const sortTaskIdsTopologically = (adjacencyMap: Map<string, string[]>, rootId: string): string[] => {
  const sortedTaskIds: string[] = [];

  const inDegree = calcInDegree(adjacencyMap);

  const queue: string[] = [rootId];
  inDegree.forEach((degree, id) => {
    if (degree === 0 && id !== rootId) {
      queue.push(id);
    }
  });

  while (queue.length) {
    const node = queue.shift()!;
    sortedTaskIds.push(node);

    for (const child of adjacencyMap.get(node) || []) {
      inDegree.set(child, inDegree.get(child)! - 1);

      if (inDegree.get(child) === 0) {
        queue.push(child);
      }
    }
  }

  return sortedTaskIds;
};
