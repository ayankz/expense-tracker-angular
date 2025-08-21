export enum OperationType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export interface Transaction {
  id: number;
  amount: number;
  categoryId: number;
  createdAt: Date;
  category: {
    name: string;
  };
  type: OperationType;
  comment?: string;
}
export interface GroupedTransactions {
  date: string;
  transactions: Transaction[];
}
