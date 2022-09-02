import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLogComponent } from './admin-log/admin-log.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegisterComponent } from './register/register.component';
import { UnregisterComponent } from './unregister/unregister.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: "", component: PocetnaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'user', component: UserComponent},
  {path: 'admin-log', component: AdminLogComponent},
  {path: 'unregister', component: UnregisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
