import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

  if (!regex.test(password)) {
    return { invalidPassword: true };
  }

  return null;
}