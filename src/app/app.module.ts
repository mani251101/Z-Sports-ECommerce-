import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AddproductsComponent } from './components/addproducts/addproducts.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryComponent } from './components/category/category.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ScrolltotopComponent } from './components/scrolltotop/scrolltotop.component';
import { PricerangePipe } from './Pipe/pricerange.pipe';
import { MyordersComponent } from './components/myorders/myorders.component';
import { EditproductsComponent } from './components/editproducts/editproducts.component';
import { OffersPipe } from './Pipe/offers.pipe';
import { DeactivateGuard } from './guards/deactivate.guard';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { AdminnotificationComponent } from './components/adminnotification/adminnotification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    ProductListComponent,
    CartComponent,
    FooterComponent,
    DashboardComponent,
    AddproductsComponent,
    CategoryComponent,
    WishlistComponent,
    ProductdetailsComponent,
    CheckoutComponent,
    ProfileComponent,
    FeedbackComponent,
    ScrolltotopComponent,
    PricerangePipe,
    MyordersComponent,
    EditproductsComponent,
    OffersPipe,
    AdminnotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    CarouselModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot(environment.logging),
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, DeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

