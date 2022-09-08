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

  izmena(naslovF, zanrF, autorF, jezikF, izdavacF, godinaF, naStanjuF, Knjiga){
    const data = {
      naziv: naslovF,
      zanr: zanrF,
      autor: autorF,
      jezik: jezikF,
      izdavac: izdavacF,
      godina_izdavanja: godinaF,
      broj_na_stanju: naStanjuF,
      knjiga: Knjiga
    }

    return this.http.post(`${this.uri}/knjige/promeni`, data)
  }

  obrisi(idF){
    const data = {
      id: idF
    }

    return this.http.post(`${this.uri}/knjige/obrisi`, data)
  }
}
