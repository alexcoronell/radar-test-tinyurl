import { Component, signal, inject } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../loading/loading.component';

/* Services */
import { TinyUrlService } from '../../services/tiny-url.service';

/* Dto's */
import type { CreateEncodeUrlDto } from '../../dto/encodeUr.dto';

/* Types */
import type { RequestStatus } from '../../types/RequestStatus.type';

/* Helpers */
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher.helper';

@Component({
  selector: 'app-tiny-url-encode',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, LoadingComponent],
  templateUrl: './tiny-url-encode.component.html',
  styleUrl: './tiny-url-encode.component.css',
})
export class TinyUrlEncodeComponent {
  /****************************************** Services ******************************************/
  private formBuilder = inject(FormBuilder);
  private tinyUrlService = inject(TinyUrlService);

  /****************************************** Signals ******************************************/
  requestStatus = signal<RequestStatus>('init');
  encodeUrlResponse = signal<string>('');

  /****************************************** Properties ******************************************/
  form!: FormGroup;
  errorUrlFormControl = new MyErrorStateMatcher();

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
    this.requestStatus.set('loading');
    const dto: CreateEncodeUrlDto = {
      url: this.urlField?.value,
      domain: 'tinyurl.com',
      description: 'website',
    };
    this.tinyUrlService.create(dto).subscribe({
      next: (res) => {
        this.requestStatus.set('success');
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const { data } = res as any;
        const { tiny_url } = data;
        this.encodeUrlResponse.set(tiny_url)
      },
      error: (err) => {
        this.requestStatus.set('failed');
        console.error(err);
      },
    });
  }
}
