import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../model/knjiga';
import { User } from '../model/user';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private router:Router, private knjigaService: KnjigaService) { }

  user: User;
  allBooks: Knjiga[];
  top3: Knjiga[];
  searchText: string;
  searched: Boolean
  knjigaDana: Knjiga

  ngOnInit(): void {
    this.searched = false
    this.user = JSON.parse(sessionStorage.getItem('ulogovan'));
      this.knjigaService.getAllBooks().subscribe((data: Knjiga[])=>{
        if(data != null){
          this.allBooks = data;
          this.allBooks.sort((n1,n2) => {
            if (n1.uzimana < n2.uzimana) {
                return 1;
            }
        
            if (n1.uzimana > n2.uzimana) {
                return -1;
            }
        
            return 0;
          });
          this.top3 = new Array(this.allBooks[0], this.allBooks[1], this.allBooks[2])

          if(this.user != null){
            let max = this.allBooks.length - 1 
            this.knjigaDana = this.allBooks[Math.floor(Math.random() * (max))]
            console.log('knjigaDana', this.knjigaDana.naziv)
          }
        }
      })
      
  }

  logOut(): void{
    sessionStorage.clear();
    this.user = null
    this.router.navigate(['']);
  }

  basicSearch(){
    this.searched = true
  }

  clearSearch(){
    this.searchText = ""
    this.searched = false
  }
}
