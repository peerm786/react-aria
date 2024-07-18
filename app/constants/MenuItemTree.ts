export type nodeType = "item" | "group";

export interface TreeNode {
  id: string;
  title: string;
  type: nodeType;
  sortOrder?: string;
  keys?: any;
  items?: TreeNode[];
}

export const menuItems: TreeNode[] = [
  {
    id: "1",
    title: "Menu Item 1",
    type: "group",
    sortOrder: "1",
    items: [
      { id: "1-1", type: "item", sortOrder: "1", title: "Child 1-1", keys: {} },
      { id: "1-2", type: "item", sortOrder: "2", title: "Child 1-2", keys: {} },
      { id: "1-3", type: "item", sortOrder: "3", title: "Child 1-3", keys: {} },
    ],
  },
  {
    id: "2",
    title: "Menu Item 2",
    sortOrder: "2",
    type: "group",
    items: [
      {
        id: "2-1",
        title: "Menu Item 2-1",
        type: "group",
        sortOrder: "1",
        items: [
          { id: "2-1-1", type: "item", sortOrder: "1", title: "Child 2-1-1", keys: {} },
          { id: "2-1-2", type: "item", sortOrder: "2", title: "Child 2-1-2", keys: {} },
        ],
      },
      { id: "2-2", type: "item", sortOrder: "2", title: "Menu Item 2-2", keys: {} },
    ],
  },
  {
    id: "3",
    type: "item",
    sortOrder: "3",
    title: "Menu Item 3",
    items: [{ id: "3-1", type: "item", sortOrder: "1", title: "Menu Item 3-1", keys: {} }],
  },
  {
    id: "4",
    type: "item",
    sortOrder: "4",
    title: "Menu Item 4",
    items: [{ id: "4-1", type: "item", sortOrder: "1", title: "Menu Item 4-1", keys: {} }],
  },
];
