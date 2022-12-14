import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  password: string;
  c_password: string;
  ime_prezime: string;
  adresa: string;
  telefon: string;
  email: string;
  message: string;
  slika: string | ArrayBuffer
  imeSlike: string
  isMenuCollapsed: boolean

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.username = ''
    this.password = ''
    this.c_password = ''
    this.ime_prezime = ''
    this.adresa = ''
    this.telefon = ''
    this.email = ''
  }

  register(){
    console.log('cc', this.slika);
    if(this.password == this.c_password){

      if(this.password.length < 8 || this.password.length > 12)
        this.message = "Lozinka treba da bude izmedju 8 i 12 karaktera"
      else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.password))) 
        this.message = 'Niste uneli lozinku po definisanom karakteru';
      else if(!(/^[a-z]/.test(this.password)))
      this.message = 'Prvi karakter nije malo slovo';
      else if (this.telefon.length == 0) 
        this.message = 'Niste uneli broj telefona.';
      else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)))
        this.message = 'Lose formatiran mejl. \t';
      else if(this.username.length == 0){
        this.message = 'Username ne sme da bude prazan'
      }
      else if(this.ime_prezime.length == 0){
        this.message = 'Ime i prezime ne sme da bude prazno'
      }
      else if(this.adresa.length == 0){
        this.message = 'Adresa ne sme da bude prazna'
      }else if(this.telefon.length == 0){
        this.message = 'Telefon ne sme da bude prazan'
      }
      else if(this.email.length == 0){
        this.message = 'Email ne sme da bude prazan'
      }
       else{
        this.imeSlike += '_'
        this.imeSlike += this.username
        this.userService.register(this.username, this.password, this.ime_prezime, this.adresa, this.telefon, this.email, "korisnik", this.slika, this.imeSlike).subscribe(respObj=>{
          if(respObj['message']=='ok'){
            this.message = 'User added'
            this.router.navigate(['']);
          }
          else{
            this.message = respObj['message']
          }
        });

      }
    }else{
      this.message = 'Pogresna potvrda password-a'
    }
    
  }

  onChange(event) {
    this.imeSlike = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.slika = evt.target.result;
    };
    let regex = /^.*\.(png|jpg|JPG)$/;
    if(!regex.test(this.imeSlike)){
      this.message = "Pogresan format fajla!"
      this.slika = null;
      this.imeSlike= "";
    }
  }


}