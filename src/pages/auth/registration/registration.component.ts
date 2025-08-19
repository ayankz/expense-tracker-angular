import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordValidator } from '../../../core/validators/password.validator';
import { matchPasswords } from './matchPasswords.validator';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../ui/components/button/button.component';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';

interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}
@Component({
  selector: 'app-registration',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  constructor(private authService: AuthService, private router: Router) {}
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public errorMessage = signal<string | null>(null);
  public isMismatch = signal(false);

  public form = new FormGroup(
    {
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, passwordValidator],
      }),
      confirmPassword: new FormControl('', [
        Validators.required,
        passwordValidator,
      ]),
    },
    {
      validators: matchPasswords,
    }
  );

  onSubmit() {
    if (this.form.invalid || this.form.errors?.['passwordMismatch']) {
      this.isMismatch.set(!!this.form.errors?.['passwordMismatch']);
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    const payload: Omit<RegistrationForm, 'confirmPassword'> = {
      email,
      password,
    };
    this.authService
      .register(payload)
      .pipe(
        tap((r) => {
          localStorage.setItem('access_token', r.access_token);
          localStorage.setItem('refresh_token', r.refresh_token);
          this.router.navigate(['/']);
        }),
        catchError((err) => {
          this.form.reset();
          this.errorMessage.set('');
          this.isMismatch.set(false);

          this.form.reset();
          if (err.status === 403) {
            this.errorMessage.set('Пользователь с таким email уже существует');
          } else {
            this.errorMessage.set('Что-то пошло не так, попробуйте позже');
          }
          return of(null); // Возвращаем "заглушку", чтобы поток не падал
        })
      )
      .subscribe();
  }
}
