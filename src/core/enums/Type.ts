import { Optional } from "@angular/core";

export enum OperationType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}

export enum CardType {
  VISA = 'VISA',
  MC = 'MC',
}
export enum DebtStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}
export enum DebtDirection {
  BORROWED = 'BORROWED',
  LENT = 'LENT',
}
export interface Transaction {
  id: number;
  amount: number;
  categoryId: number;
  createdAt: Date;
  category: {
    name: string;
  };
  card: Pick<Card, 'digits' | 'type'>;
  type: OperationType;
  comment?: string;
}
export interface GroupedTransactions {
  date: string;
  transactions: Transaction[];
}
export interface Card {
  id: number;
  digits: string;
  balance: number;
  userId: number;
  type: CardType;
  createdAt: Date;
}
export interface Debt {
  id: number;
  userId: number;
  amount: number;
  counterparty: string;
  description?: string;
  status: DebtStatus;
  proofFileUrl?: string;
  dueDate: Date;
  direction: DebtDirection;
  createdAt: Date;
  updatedAt: Date;
}
export interface MetaData{
  total: number;
    page: number;
    lastPage: number;
}
export interface DebtResponse {
  data: Debt[];
  meta: MetaData;
}
export interface TransactionView{
  date: string;
  transactions: Transaction[];
}