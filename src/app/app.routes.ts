import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/components/login/login.component';
import {DebtsComponent} from '../pages/debts/components/debts/debts.component';
import {ExpensesComponent} from '../pages/expenses/expenses.component';
import {IncomeComponent} from '../pages/income/income.component';
import {SavingsComponent} from '../pages/savings/savings.component';
import {HomeComponent} from '../pages/home/home/home.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
      data: { title: 'Главная' }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
   {
    path: 'debts',
    component: DebtsComponent,
     data: { title: 'Займы' }
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    data: { title: 'Операции' }
  }, {
    path: 'income',
    component: IncomeComponent,
    data: { title: 'Платежи' }
  }, {
    path: 'savings',
    component: SavingsComponent,
    data: { title: 'Накопления' }
  },
];
