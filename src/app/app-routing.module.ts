import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RolebasedGuard } from './guards/rolebased.guard';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { CategoryComponent } from './components/category/category.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { EditproductsComponent } from './components/editproducts/editproducts.component';
import { AuthGuard } from './guards/auth.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { AdminnotificationComponent } from './components/adminnotification/adminnotification.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', component:HomeComponent},
  { path: 'product-list', component: ProductListComponent, canActivate:[RolebasedGuard], data:{role:'admin'}},
  { path: 'cart', component: CartComponent, canActivate:[AuthGuard] },
  { path: 'dashboard', component:DashboardComponent, canActivate:[RolebasedGuard], data:{role:'admin'} },
  { path: 'addproducts', component: AddproductsComponent, canActivate:[RolebasedGuard], data:{role:'admin'}},
  { path: 'category', component: CategoryComponent},
  { path: 'productdetails/:productId', component: ProductdetailsComponent},
  { path: 'wishlist', component:WishlistComponent, canActivate:[AuthGuard]},
  { path: 'checkout', component:CheckoutComponent, canActivate:[AuthGuard]},
  { path: 'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  { path: 'feedback', component:FeedbackComponent},
  { path: 'myorders', component:MyordersComponent, canActivate:[AuthGuard, RolebasedGuard], data:{role:'user'}},
  { path: 'editproducts/:productId', component:EditproductsComponent, canActivate:[RolebasedGuard], data:{role:'admin'}, canDeactivate:[DeactivateGuard]},
  { path: 'category/:category', component: CategoryComponent},
  { path: 'notifications', component: AdminnotificationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
