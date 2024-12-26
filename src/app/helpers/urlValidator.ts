import type { FormControl, ValidationErrors } from '@angular/forms';

export function urlValidator(control: FormControl): ValidationErrors | null {
  const urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)/;
  return urlPattern.test(control.value) ? null : { url: true };
}
