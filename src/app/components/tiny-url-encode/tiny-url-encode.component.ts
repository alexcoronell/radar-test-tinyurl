import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tiny-url-encode',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './tiny-url-encode.component.html',
  styleUrl: './tiny-url-encode.component.css'
})
export class TinyUrlEncodeComponent {

}
