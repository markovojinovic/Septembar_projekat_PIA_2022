import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { AdminComponent } from './admin/admin.component';
import { IzmeniKnjiguComponent } from './izmeni-knjigu/izmeni-knjigu.component';
import { IzmeniKorisnikaComponent } from './izmeni-korisnika/izmeni-korisnika.component';
import { KnjigaDetaljiComponent } from './knjiga-detalji/knjiga-detalji.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfilComponent } from './profil/profil.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegisterComponent } from './register/register.component';
import { UnregisterComponent } from './unregister/unregister.component';

const routes: Routes = [
  {path: "", component: PocetnaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'admin-log', component: AdminLogComponent},
  {path: 'promena-lozinke', component: PromenaLozinkeComponent},
  {path: 'izmeni-korisnika', component: IzmeniKorisnikaComponent},
  {path: 'izmeni-knjigu', component: IzmeniKnjiguComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'knjiga-detalji', component: KnjigaDetaljiComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'unregister', component: UnregisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
