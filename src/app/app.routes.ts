import {Routes} from '@angular/router';
import {LoginComponent} from './features/auth/pages/login/login.component';
import {RegisterComponent} from './features/auth/pages/register/register.component';
import {isLoggedGuard} from './core/guards/is-logged.guard';
import {GameComponent} from "./features/game/pages/game/game.component";

export const routes: Routes = [
  {path: '', redirectTo: 'game', pathMatch: 'full'},
  {path: 'game', loadComponent: () => GameComponent, canActivate: [isLoggedGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent,}
];
