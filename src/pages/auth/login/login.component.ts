import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ButtonComponent } from '../../../ui/components/button/button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordValidator } from '../../../core/validators/password.validator';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';

interface AuthForm {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  imports: [
    ButtonComponent,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);

  public isValid: boolean = true;
  public showPassword: boolean = false;
  public errorMessage = signal<string | null>(null);
  public form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, passwordValidator],
    }),
  });
  ngOnInit(): void {}
  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    const payload: AuthForm = { email, password };

    this.authService
      .login(payload)
      .pipe(
        tap((r) => {
          this.authService.setTokens({
            access: r.access_token,
            refresh: r.refresh_token,
          });
        }),
        catchError((err) => {
          this.form.reset();
          this.errorMessage.set(err.error.message);
          return of(null);
        })
      )
      .subscribe(() => this.router.navigateByUrl(''));
  }

  onRegisterHandle() {
    this.router.navigate(['registration']);
  }
}
