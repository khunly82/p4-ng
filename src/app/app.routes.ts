import { Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isLoggedGuard } from './guards/is-logged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'game', pathMatch: 'full' },
    { path: 'game', component: GameComponent, canActivate: [isLoggedGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, }
];
