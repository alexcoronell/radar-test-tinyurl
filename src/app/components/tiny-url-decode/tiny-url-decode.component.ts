import { Component, signal, inject } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import type {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LoadingComponent } from '../loading/loading.component';

/* Services */
import { TinyUrlService } from '../../services/tiny-url.service';

/* Types */
import type { RequestStatus } from '../../types/RequestStatus.type';

/* Helpers */
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher.helper';

/* Constants */
import { urlRegex } from '../../constants/urlRegex';

@Component({
  selector: 'app-tiny-url-decode',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSnackBarModule, LoadingComponent],
  templateUrl: './tiny-url-decode.component.html',
  styleUrl: './tiny-url-decode.component.css'
})
export class TinyUrlDecodeComponent {
  /****************************************** Services ******************************************/
  private formBuilder = inject(FormBuilder);
  private tinyUrlService = inject(TinyUrlService);
  private snackBarService = inject(MatSnackBar);

  /****************************************** Signals ******************************************/
  requestStatus = signal<RequestStatus>('init');
  decodedUrlResponse = signal<string>('');

  /****************************************** Properties ******************************************/
  form!: FormGroup;
  errorUrlFormControl = new MyErrorStateMatcher();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  /****************************************** Contructor ******************************************/
  constructor() {
    this.buildForm();
  }

  /****************************************** Methods ******************************************/
  /****** Build Form ******/
  private buildForm() {
    this.form = this.formBuilder.group({
      urlFormControl: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
          Validators.pattern(
            '(https?://)?([www.w]{2,})?([a-z0-9.-]+.[a-z]{2,4})(/[a-zA-Z0-9-._/?=%&amp;]*)?'
          ),
        ],
      ],
    });
  }

  /****** Getters ******/
  get urlField() {
    return this.form.get('urlFormControl');
  }

  /****** onSubmit ******/
  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    const url = this.urlField?.value;
    if (!urlRegex.test(url)) {
      this.openSnackBar('Url no es válida');
      return
    }
    this.decodedUrlResponse.set('');
    this.requestStatus.set('loading');
    this.tinyUrlService.get(url).subscribe({
      next: (res) => {
        this.requestStatus.set('success')
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const { data } = res as any;
        this.decodedUrlResponse.set(data.url)

      },
      error: (err) => {
        this.openSnackBar('Url no existe o no es válida');
        console.error(err);
        this.requestStatus.set('failed')
      }
    })
  }

  /****** Open SnackBar ******/
  openSnackBar(message: string) {
    this.snackBarService.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
