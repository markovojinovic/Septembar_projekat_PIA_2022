import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  user: User;
  old_password: string;
  new_password: string;
  condirm_new_password: string;
  message: string;

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
    this.old_password = ""
    this.new_password = ""
    this.condirm_new_password = ""
  }

  promena_lozinke(): void{
    if(this.old_password == this.user.password){
      //odradi posao
      this.message = ""
      if(this.new_password == this.condirm_new_password){
        if(this.new_password == this.old_password)
          this.message = "Nova lozinka je jednaka staroj"
        else if(this.new_password.length < 8 || this.new_password.length > 12)
          this.message = "Lozinka treba da bude izmedju 8 i 12 karaktera"
        else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.new_password))) 
          this.message = 'Niste uneli lozinku po definisanom karakteru';
        else if(!(/^[a-z]/.test(this.new_password)))
          this.message = 'Prvi karakter nije malo slovo';
        else{
          this.message = ""
          this.userService.promena_lozinke(this.user.username, this.new_password).subscribe(resp=>{
            if(resp['message'] == "ok"){
              console.log("Uredu je")
            }else{
              console.log("nije ok")
            }
          })
          sessionStorage.clear();
          this.router.navigate(['']);
        }
      }else{
        this.message = "Pogresna potvrda lozinke";
      }
    }
    else{
      this.message = "Pogresna stara lozinka";
    }
  }

}
