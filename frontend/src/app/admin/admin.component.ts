import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let user  = JSON.parse(sessionStorage.getItem('ulogovan'));
    if(user.tip_korisnika != "admin"){
      this.router.navigate['']
    }
  }

  username: string;
  password: string;
  message: string;

  login_admin(){
    this.userService.login_admin(this.username, this.password, "admin").subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
          this.router.navigate(['admin-log']);
      }
      else{
        this.message="Username ili password su pogresni"
      }
    })
    
  }

}
