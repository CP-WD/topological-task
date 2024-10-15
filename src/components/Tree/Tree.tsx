import { PropsWithChildren } from "react";

type TreeItem = {
  id: string;
  name: string;
};

type TreeProps<T extends TreeItem> = {
  rootId: string;
  items: T[];
  adjacencyMap: Map<string, string[]>;
  renderItem: (props: PropsWithChildren<{ item: T; hasChild: boolean }>) => React.ReactNode;
};

export const Tree = <T extends TreeItem>({ rootId, items, adjacencyMap, renderItem }: TreeProps<T>) => {
  const itemMap = new Map(items.map((item) => [item.id, item]));

  const renderTree = (itemId: string) => {
    const childIds = adjacencyMap.get(itemId) || [];
    const item = itemMap.get(itemId);
    if (!item) {
      return null;
    }
    const renderItemProps = {
      item,
      hasChild: childIds.length > 0,
      children: childIds.map((childId) => renderTree(childId))
    };
    return <div key={item.id}>{renderItem(renderItemProps)}</div>;
  };

  return <div>{adjacencyMap.get(rootId)?.map((id) => renderTree(id))}</div>;
};
