import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { Obavestenja } from '../model/obavestenja';
import { User } from '../model/user';
import { Zaduzene } from '../model/zaduzene';
import { KnjigaService } from '../services/knjiga.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private knjigaService: KnjigaService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;
  isMenuCollapsed: boolean
  glob_dani: number

  login(){
    this.isMenuCollapsed = true;
    this.userService.getDays().subscribe ((data: number)=>{
      this.glob_dani = data;
      this.userService.login(this.username, this.password, "korisnik").subscribe((userFromDB: User)=>{
        if(userFromDB!=null){
          let user = userFromDB
          if(user.tip_korisnika == 'korisnik')
            this.router.navigate(['']);
          else if(user.tip_korisnika == 'moderator')
            this.router.navigate(['']);
          else  
            this.message = "Username ili password su pogresni"
          if(user.tip_korisnika == 'korisnik' || user.tip_korisnika == 'moderator'){  
            sessionStorage.setItem('ulogovan', JSON.stringify(user));
          }
        }
        else{
          this.message="Username ili password su pogresni"
        }
      })
  });
    
  }

}
