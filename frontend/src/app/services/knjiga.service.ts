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

  sviZahtevi(){
    return this.http.get(`${this.uri}/knjige/sviZahtevi`)
  }

  izmena(naslovF, zanrF, autorF, jezikF, izdavacF, godinaF, naStanjuF, Knjiga, sl, im){
    const data = {
      naziv: naslovF,
      zanr: zanrF,
      autor: autorF,
      jezik: jezikF,
      izdavac: izdavacF,
      godina_izdavanja: godinaF,
      broj_na_stanju: naStanjuF,
      knjiga: Knjiga,
      slika: sl,
      imeSlike: im
    }

    return this.http.post(`${this.uri}/knjige/promeni`, data)
  }

  addBook(naslovF, zanrF, autorF, jezikF, izdavacF, godinaF, naStanjuF, sl, im){
    const data = {
      naziv: naslovF,
      zanr: zanrF,
      autor: autorF,
      jezik: jezikF,
      izdavac: izdavacF,
      godina_izdavanja: godinaF,
      broj_na_stanju: naStanjuF,
      slika: sl,
      imeSlike: im
    }

    return this.http.post(`${this.uri}/knjige/dodaj`, data)
  }

  zahtev(naslovF, zanrF, autorF, jezikF, izdavacF, godinaF, naStanjuF,sl,im, usernameF){
    const data = {
      naziv: naslovF,
      zanr: zanrF,
      autor: autorF,
      jezik: jezikF,
      izdavac: izdavacF,
      godina_izdavanja: godinaF,
      broj_na_stanju: naStanjuF,
      slika: sl,
      imeSlike: im,
      username: usernameF
    }

    return this.http.post(`${this.uri}/knjige/zahtev`, data)
  }

  obrisi(idF){
    const data = {
      id: idF
    }

    return this.http.post(`${this.uri}/knjige/obrisi`, data)
  }

  vrati(idF, usernameF){
    const data = {
      id: idF,
      username: usernameF
    }

    return this.http.post(`${this.uri}/knjige/vrati`, data)
  }

  produzi(idF, usernameF){
    const data = {
      id: idF,
      username: usernameF
    }

    return this.http.post(`${this.uri}/knjige/produzi`, data)
  }

  zaduzi(idF, usernameF){
    const data = {
      id: idF,
      username: usernameF
    }

    return this.http.post(`${this.uri}/knjige/zaduzi`, data)
  }

  odobri(knjigaF){
    const data = {
      knjiga: knjigaF
    }

    return this.http.post(`${this.uri}/knjige/odobri`, data)
  }

  odbi(knjigaF){
    const data = {
      knjiga: knjigaF
    }

    return this.http.post(`${this.uri}/knjige/odbi`, data)
  }
}
