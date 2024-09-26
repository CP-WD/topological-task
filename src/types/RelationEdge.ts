export type RelationEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  owner: string;
};

export type RelationType = "containment" | "dependency";
