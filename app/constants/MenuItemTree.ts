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
    type: "item",
    sortOrder: "4",
    title: "Home",
    items: [],
    keys: {}
  },{
    id: "2",
    title: "Master",
    type: "group",
    sortOrder: "1",
    items: [
      { id: "2-1", type: "item", sortOrder: "1", title: "Bank master", keys: {} },
      { id: "2-2", type: "item", sortOrder: "2", title: "Branch master", keys: {} },
      { id: "2-3", type: "item", sortOrder: "3", title: "Account master", keys: {} },
    ],
  },{
    id: "3",
    title: "User",
    type: "group",
    sortOrder: "1",
    items: [
      { id: "3-1", type: "item", sortOrder: "1", title: "Admin", keys: {} },
      { id: "3-2", type: "item", sortOrder: "2", title: "tenants", keys: {} },
      { id: "3-3", type: "item", sortOrder: "3", title: "Privacy", keys: {} },
    ],
  },
  {
    id: "4",
    title: "Accounts",
    sortOrder: "2",
    type: "group",
    items: [
      {
        id: "4-1",
        title: "Loans",
        type: "group",
        sortOrder: "1",
        items: [
          { id: "4-1-1", type: "item", sortOrder: "1", title: "Loan processing", keys: {} },
          { id: "4-1-2", type: "item", sortOrder: "2", title: "Querying", keys: {} },
        ],
      },
      { id: "4-2", type: "item", sortOrder: "2", title: "Savings", keys: {} },
    ],
  },
 
];
