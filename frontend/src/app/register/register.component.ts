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
    // this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{
    //   if(userFromDB!=null){
    //     if(userFromDB.type==0){
    //       this.router.navigate(['user']);
    //     }
    //     else{
    //       this.router.navigate(['admin']);
    //     }
    //   }
    //   else{
    //     this.message="Error"
    //   }
    // })

    //ovde otkucati registraciju
    
  }

}
