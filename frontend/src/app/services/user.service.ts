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
}
