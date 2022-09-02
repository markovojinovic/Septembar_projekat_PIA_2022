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
    AdminLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
