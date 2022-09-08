import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  register(usernameForm, passwordForm, ime_prezimeForm, adresaForm, telefonForm, emailForm, typeForm){
    const data = {
      username: usernameForm,
      password: passwordForm,
      ime_prezime: ime_prezimeForm,
      adresa: adresaForm,
      telefon: telefonForm,
      email: emailForm,
      type: typeForm
    }

    return this.http.post(`${this.uri}/users/register`, data)
  }

  dodavanje(usernameForm, passwordForm, ime_prezimeForm, adresaForm, telefonForm, emailForm, typeForm){
    const data = {
      username: usernameForm,
      password: passwordForm,
      ime_prezime: ime_prezimeForm,
      adresa: adresaForm,
      telefon: telefonForm,
      email: emailForm,
      type: typeForm
    }

    return this.http.post(`${this.uri}/users/dodaj`, data)
  }

  izmena(usernameForm, passwordForm, ime_prezimeForm, adresaForm, telefonForm, emailForm, typeForm, Korisnik){
    const data = {
      username: usernameForm,
      password: passwordForm,
      ime_prezime: ime_prezimeForm,
      adresa: adresaForm,
      telefon: telefonForm,
      email: emailForm,
      type: typeForm,
      korisnik: Korisnik
    }

    return this.http.post(`${this.uri}/users/izmena`, data)
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

  sviZahtevi(){
    return this.http.get(`${this.uri}/users/sviZahtevi`)
  }

  odobri(usernameF){
    const data = {
      username: usernameF
    }

    return this.http.post(`${this.uri}/users/odobri`, data)
  }

  sviKorisnici(){
    return this.http.get(`${this.uri}/users/sviKorisnici`)
  }

  promeni(usernameF){
    const data = {
      username: usernameF
    }

    return this.http.post(`${this.uri}/users/promeni_ulogu`, data)
  }

}
