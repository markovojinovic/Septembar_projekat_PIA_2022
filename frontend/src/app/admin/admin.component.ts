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
  }

  username: string;
  password: string;
  message: string;

  //dodati sta treba dodatno za admina

  login(){
    this.userService.login(this.username, this.password, "admin").subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
          this.router.navigate(['moderator']);
      }
      else{
        this.message="Error"
      }
    })
    
  }

}
