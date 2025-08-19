export enum OperationType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export interface Transaction {
  amount: number;
  categoryId: number;
  createdAt: Date;
  type: OperationType;
  comment?: string;
}
export interface GroupedTransactions {
  date: string;
  transactions: Transaction[];
}