import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    console.log('dateValidator', control.value);
    const raw = control.value.trim();

    let value = raw;
    if (/^\d{8}$/.test(raw)) {
      value = raw.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3');
    }

    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = value.match(regex);
    if (!match) {
      return { invalidDate: 'format' };
    }
    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { invalidDate: 'notExist' };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date > today) {
      return { invalidDate: 'future' };
    }
    return null;
  };
}
