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
  const { data: containmentEdges } = await supabase.from(containmentTableName).select();
  const { data: dependencyEdges } = await supabase.from(dependencyTableName).select();

  return { containmentEdges, dependencyEdges };
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
  const { status, statusText } = await supabase.from(tableName).delete().eq("id", relationEdgeId);

  return { status, statusText };
};
