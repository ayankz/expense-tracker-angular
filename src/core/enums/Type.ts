export enum OperationType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export enum CardType {
  VISA = 'VISA',
  MC = 'MC',
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
 export interface Card{
  id: number;
  digits: string;
  balance: number;
  userId: number;
  type: CardType;
  createdAt: Date;
 }