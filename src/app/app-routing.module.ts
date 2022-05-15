import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { RentsComponent } from './components/rents/rents.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'books',
    component: BooksComponent,
    data: {
      allowedRoles: ["ROLE_USER", "ROLE_ADMIN"],
      validationMethod: 'any'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'rents',
    component: RentsComponent,
    data: {
      allowedRoles: ["ROLE_USER", "ROLE_ADMIN"],
      validationMethod: 'any'
    },
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
