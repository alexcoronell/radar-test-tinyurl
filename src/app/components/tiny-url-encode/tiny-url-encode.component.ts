import { Component, signal, inject } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/* Types */
import type { RequestStatus } from '../../types/RequestStatus.type';
/* Helpers */
import { MyErrorStateMatcher } from '../../helpers/MyErrorStateMatcher.helper';
import { urlValidator } from '../../helpers/urlValidator';

@Component({
  selector: 'app-tiny-url-encode',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './tiny-url-encode.component.html',
  styleUrl: './tiny-url-encode.component.css'
})
export class TinyUrlEncodeComponent {
  /****************************************** Services ******************************************/
  private formBuilder = inject(FormBuilder);

  /****************************************** Signals ******************************************/
  requestStatus = signal<RequestStatus>("init");

  /****************************************** Properties ******************************************/
  form!: FormGroup;
  errorNameFormControl = new MyErrorStateMatcher();

  /****************************************** Contructor ******************************************/
  constructor() {
    this.buildForm();
  }

  /****************************************** Methods ******************************************/
  /****** Build Form ******/
  private buildForm() {
    this.form = this.formBuilder.group({
      urlFormControl: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(250), urlValidator]],
    });
  }

  /****** onSubmit ******/
  onSubmit() {
    if (!this.form.valid) return;
    this.requestStatus.set("loading");
    return
  }

}
