import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { TinyUrlEncodeComponent } from '../tiny-url-encode/tiny-url-encode.component';
import { TinyUrlDecodeComponent } from '../tiny-url-decode/tiny-url-decode.component';

@Component({
  selector: 'app-tiny-url',
  imports: [MatToolbarModule, MatTabsModule, TinyUrlEncodeComponent, TinyUrlDecodeComponent],
  templateUrl: './tiny-url.component.html',
  styleUrl: './tiny-url.component.css'
})
export class TinyUrlComponent {

}
