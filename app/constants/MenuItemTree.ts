export type nodeType = "child" | "container";

export interface TreeNode {
  id: string;
  title: string;
  type: nodeType;
  keys?: any;
  children?: TreeNode[];
}

export const menuItems: TreeNode[] = [
  {
    id: "1",
    title: "Menu Item 1",
    type: "container",
    children: [
      { id: "1-1", type: "child", title: "Child 1-1", keys: {} },
      { id: "1-2", type: "child", title: "Child 1-2", keys: {} },
      { id: "1-3", type: "child", title: "Child 1-3", keys: {} },
    ],
  },
  {
    id: "2",
    title: "Menu Item 2",
    type: "container",
    children: [
      {
        id: "2-1",
        title: "Menu Item 2-1",
        type: "container",
        children: [
          { id: "2-1-1", type: "child", title: "Child 2-1-1", keys: {} },
          { id: "2-1-2", type: "child", title: "Child 2-1-2", keys: {} },
        ],
      },
      { id: "2-2", type: "child", title: "Menu Item 2-2", keys: {} },
    ],
  },
  {
    id: "3",
    type: "child",
    title: "Menu Item 3",
    children: [{ id: "3-1", type: "child", title: "Menu Item 3-1", keys: {} }],
  },
  {
    id: "4",
    type: "child",
    title: "Menu Item 4",
    children: [{ id: "4-1", type: "child", title: "Menu Item 4-1", keys: {} }],
  },
];
