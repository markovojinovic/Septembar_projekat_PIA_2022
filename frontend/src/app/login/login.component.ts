import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.userService.login(this.username, this.password, "korisnik").subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
        if(userFromDB.tip_korisnika == 'korisnik')
          this.router.navigate(['user']);
        else if(userFromDB.tip_korisnika == 'moderator')
          this.router.navigate(['moderator']);
          sessionStorage.setItem('ulogovan', JSON.stringify(userFromDB));
      }
      else{
        this.message="Username ili password su pogresni"
      }
    })
    
  }

}
