import { RelationEdge, RelationType } from "~/types/RelationEdge";
import { createClient } from "~/utils/db/supabase/client/server";

const containmentTableName = "containment_edge";
const dependencyTableName = "dependency_edge";

export const insertRelationEdge = async (newRelationEdge: RelationEdge, relationType: RelationType) => {
  const supabase = createClient();
  const tableName = relationType === "containment" ? containmentTableName : dependencyTableName;
  const { data: resRelationEdge } = await supabase.from(tableName).insert(newRelationEdge);

  return resRelationEdge;
};

export const getAllRelationEdge = async () => {
  const supabase = createClient();
  const { data: containmentNode } = await supabase.from(containmentTableName).select();
  const { data: dependencyNode } = await supabase.from(dependencyTableName).select();

  return { containmentNode, dependencyNode };
};

export const updateRelationEdge = async (relationEdge: RelationEdge, relationType: RelationType) => {
  const supabase = createClient();
  const tableName = relationType === "containment" ? containmentTableName : dependencyTableName;
  const { data: resRelationEdge } = await supabase.from(tableName).update(relationEdge).match({ id: relationEdge.id });

  return resRelationEdge;
};

export const deleteRelationEdge = async (relationEdgeId: string, relationType: RelationType) => {
  const supabase = createClient();
  const tableName = relationType === "containment" ? containmentTableName : dependencyTableName;
  const { data: resRelationEdge } = await supabase.from(tableName).delete().match({ id: relationEdgeId });

  return resRelationEdge;
};
