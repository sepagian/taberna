export interface Item {
  checked: boolean;
  createdAt: number;
  id: string;
  listId: string;
  name: string;
  updatedAt: number;
}

export interface List {
  createdAt: number;
  id: string;
  name: string;
  updatedAt: number;
  userId?: string | null;
}

export interface ListWithStats extends List {
  checkedCount: number;
  totalCount: number;
}
