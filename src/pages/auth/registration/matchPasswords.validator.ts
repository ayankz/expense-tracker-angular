import { AbstractControl, ValidationErrors } from "@angular/forms";

export function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (!password || !confirmPassword) return null;

  return password === confirmPassword ? null : { passwordMismatch: true };
}