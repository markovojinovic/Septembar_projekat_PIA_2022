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

  register(firstnameForm, lastnameForm, usernameForm, passwordForm, typeForm){
    const data = {
      firstname: firstnameForm,
      lastname: lastnameForm,
      username: usernameForm,
      password: passwordForm,
      type: typeForm 
    }

    return this.http.post(`${this.uri}/users/register`, data)
  }
}
