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

  create = (dto: CreateEncodeUrlDto) => this.http.post(`${this.url}/create`, dto)

  get = (url: string) => {
    const domain = url.split("/")[2];
    const tinyUrl = url.split("/").pop();
    return this.http.get(`${this.url}/alias/${domain}/${tinyUrl}`)
  }

}
