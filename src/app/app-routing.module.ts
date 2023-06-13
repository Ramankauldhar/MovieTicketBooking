import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent} from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { BookticketComponent } from './Components/bookticket/bookticket.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { BookingConfirmComponent } from './Components/booking-confirm/booking-confirm.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'dashboard', component:DashboardComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'bookticket', component:BookticketComponent },
  {path: 'bookticket/:id', component:BookticketComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'confirm', component:BookingConfirmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }