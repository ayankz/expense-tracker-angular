import { Routes } from '@angular/router';
import { DebtsComponent } from '../pages/debts/components/debts/debts.component';
import { ExpensesComponent } from '../pages/expenses/expenses.component';
import { IncomeComponent } from '../pages/income/income.component';
import { SavingsComponent } from '../pages/savings/savings.component';
import { HomeComponent } from '../pages/home/home/home.component';
import { authGuard } from '../core/guards/auth.guard';
import { LoginComponent } from '../pages/auth/login/login.component';
import { RegistrationComponent } from '../pages/auth/registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: HomeComponent,
    data: { title: 'Главная' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Добро пожаловать!' },
  },
  {
    path:'registration',
    component: RegistrationComponent,
    data: {title: 'Регистрация'}
  },
  {
    path: 'debts',
    canActivate: [authGuard],
    component: DebtsComponent,
    data: { title: 'Займы' },
  },
  {
    path: 'expenses',
    canActivate: [authGuard],
    component: ExpensesComponent,
    data: { title: 'Операции' },
  },
  {
    path: 'income',
    canActivate: [authGuard],
    component: IncomeComponent,
    data: { title: 'Платежи' },
  },
  {
    path: 'savings',
    canActivate: [authGuard],
    component: SavingsComponent,
    data: { title: 'Накопления' },
  },
];
