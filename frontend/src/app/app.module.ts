import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { UnregisterComponent } from './unregister/unregister.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilComponent } from './profil/profil.component';
import { KnjigaDetaljiComponent } from './knjiga-detalji/knjiga-detalji.component';
import { NgbCollapse, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './logout/logout.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IzmeniKorisnikaComponent } from './izmeni-korisnika/izmeni-korisnika.component';
import { IzmeniKnjiguComponent } from './izmeni-knjigu/izmeni-knjigu.component';
import { ZaduzeneKnjigeComponent } from './zaduzene-knjige/zaduzene-knjige.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { IzmeniPodatkeComponent } from './izmeni-podatke/izmeni-podatke.component';
import { KnjigaZahtevComponent } from './knjiga-zahtev/knjiga-zahtev.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';

import { LazyLoadImageModule} from 'ng-lazyload-image';

import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PocetnaComponent,
    UserComponent,
    AdminComponent,
    ModeratorComponent,
    UnregisterComponent,
    AdminLogComponent,
    PromenaLozinkeComponent,
    ProfilComponent,
    KnjigaDetaljiComponent,
    LogoutComponent,
    IzmeniKorisnikaComponent,
    IzmeniKnjiguComponent,
    ZaduzeneKnjigeComponent,
    IstorijaZaduzenjaComponent,
    IzmeniPodatkeComponent,
    KnjigaZahtevComponent,
    ObavestenjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    NoopAnimationsModule,
    LazyLoadImageModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
