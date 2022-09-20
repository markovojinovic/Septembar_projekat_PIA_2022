import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(usernameFromForm, passwordFromForm, tipFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  login_admin(usernameFromForm, passwordFromForm, tipFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm,
      tip: tipFromForm
    }

    return this.http.post(`${this.uri}/users/login_admin`, data)
  }

  register(usernameForm, passwordForm, ime_prezimeForm, adresaForm, telefonForm, emailForm, typeForm, slikaF, imeSlikeF):Observable<any>{
    const data = {
      username: usernameForm,
      password: passwordForm,
      ime_prezime: ime_prezimeForm,
      adresa: adresaForm,
      telefon: telefonForm,
      email: emailForm,
      type: typeForm,
      slika: slikaF,
      imeSlike: imeSlikeF
    }

    return this.http.post(`${this.uri}/users/register`, data)
  }

  dodavanje(usernameForm, passwordForm, ime_prezimeForm, adresaForm, telefonForm, emailForm, typeForm, slikaF, ime):Observable<any>{
    const data = {
      username: usernameForm,
      password: passwordForm,
      ime_prezime: ime_prezimeForm,
      adresa: adresaForm,
      telefon: telefonForm,
      email: emailForm,
      type: typeForm,
      slika: slikaF,
      imeSlike: ime
    }

    return this.http.post(`${this.uri}/users/dodaj`, data)
  }

  izmena(usernameForm, passwordForm, ime_prezimeForm, adresaForm, telefonForm, emailForm, typeForm, Korisnik, sl, im){
    const data = {
      username: usernameForm,
      password: passwordForm,
      ime_prezime: ime_prezimeForm,
      adresa: adresaForm,
      telefon: telefonForm,
      email: emailForm,
      type: typeForm,
      korisnik: Korisnik,
      slika: sl,
      imeSlike: im
    }

    return this.http.post(`${this.uri}/users/izmena`, data)
  }

  izmenaPodataka(usernameForm, ime_prezimeForm, adresaForm, telefonForm, emailForm, Korisnik){
    const data = {
      username: usernameForm,
      ime_prezime: ime_prezimeForm,
      adresa: adresaForm,
      telefon: telefonForm,
      email: emailForm,
      korisnik: Korisnik
    }

    return this.http.post(`${this.uri}/users/izmenaPodataka`, data)
  }

  promena_lozinke(usernameForm, passwordForm){
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post(`${this.uri}/users/promeni-lozinku`, data)
  }

  obrisi(usernameForm){
    const data = {
      username: usernameForm
    }

    return this.http.post(`${this.uri}/users/obrisi`, data)
  }

  zabrani(usernameForm){
    const data = {
      username: usernameForm
    }

    return this.http.post(`${this.uri}/users/zabrani`, data)
  }

  sviZahtevi(){
    return this.http.get(`${this.uri}/users/sviZahtevi`)
  }

  odobri(usernameF){
    const data = {
      username: usernameF
    }

    return this.http.post(`${this.uri}/users/odobri`, data)
  }

  odblokiraj(usernameF){
    const data = {
      username: usernameF
    }

    return this.http.post(`${this.uri}/users/odblokiraj`, data)
  }

  sviKorisnici(){
    return this.http.get(`${this.uri}/users/sviKorisnici`)
  }

  svaObavestenja(username){
    return this.http.get(`${this.uri}/users/svaObavestenja?username=${username}`)
  }

  promeni(usernameF){
    const data = {
      username: usernameF
    }

    return this.http.post(`${this.uri}/users/promeni_ulogu`, data)
  }

  changeDays(daysF){
    const data = {
      days: daysF
    }

    return this.http.post(`${this.uri}/users/promeni_dane`, data)
  }

  getDays(){
    return this.http.get(`${this.uri}/users/dohvati_dane`)
  }

  sviKomentari(id){
    return this.http.get(`${this.uri}/users/sviKomentari?id=${id}`)
  }
  
  zaduzeneKnjige(username){
    return this.http.get(`${this.uri}/users/zaduzene?username=${username}`)
  }

  istorijaZaduzenih(username){
    return this.http.get(`${this.uri}/users/istorija?username=${username}`)
  }

  komentarisi(kom, oce, user, idK){
    const data = {
      komentar: kom,
      ocena: oce,
      username: user,
      id: idK
    }

    return this.http.post(`${this.uri}/users/komentarisi`, data)
  }

}
