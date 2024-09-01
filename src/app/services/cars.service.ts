import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  httpClient = inject(HttpClient);
  pathUrl = "https://66d377bb184dce1713d0436a.mockapi.io/api/v1";

  constructor() { }

  lista() {
    return this.httpClient.get(`${this.pathUrl}/cars`);
  }

  busca(id: number){
    return this.httpClient.get(`${this.pathUrl}/cars/${id}`);
  }
}
