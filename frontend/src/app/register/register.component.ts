import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
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

  ngOnInit(): void {
  }

  register(){
    if(this.password == this.c_password){
      this.userService.register(this.username, this.password, this.ime_prezime, this.adresa, this.telefon, this.email, "korisnik").subscribe(respObj=>{
        if(respObj['message']=='ok'){
          this.message = 'User added'
          this.router.navigate(['']);
        }
        else{
          this.message = 'Error'
        }
        
      });
    }else{
      this.message = 'Pogresna validacija password-a'
    }
    
  }

}
