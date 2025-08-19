export enum OperationType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export interface Transaction {
  amount: number;
  categoryId: number;
  date: Date;
  type: OperationType;
  comment?: string;
}