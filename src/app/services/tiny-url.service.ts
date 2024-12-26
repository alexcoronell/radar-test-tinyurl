import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import type { CreateEncodeUrlDto } from '../dto/encodeUr.dto';

@Injectable({
  providedIn: 'root'
})
export class TinyUrlService {
  private http = inject(HttpClient);
  private url = environment.apiURL
  private apiToken = environment.apiToken;

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.apiToken}`
  });

  create = (dto: CreateEncodeUrlDto) => this.http.post(`${this.url}/create`, dto, { headers: this.headers })

}
