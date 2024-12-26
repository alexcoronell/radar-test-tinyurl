import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-tiny-url-decode',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './tiny-url-decode.component.html',
  styleUrl: './tiny-url-decode.component.css'
})
export class TinyUrlDecodeComponent {

}
