import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllBooks(){
    return this.http.get(`${this.uri}/knjige/allBooks`)
  }
}
