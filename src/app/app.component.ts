import { Component } from '@angular/core';
import { TinyUrlComponent } from './components/tiny-url/tiny-url.component';

@Component({
  selector: 'app-root',
  imports: [TinyUrlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TinyURL';
}
