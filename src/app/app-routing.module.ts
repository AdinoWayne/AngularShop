import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },

  { path: 'check-out', component: CheckOutComponent , canActivate: [AuthGuardService]},
  { path: 'orders', component: MyOrdersComponent , canActivate: [AuthGuardService]},
  { path: 'order-success/:id', component: OrderSuccessComponent , canActivate: [AuthGuardService]},
  
  { path: 'admin/products', component: AdminProductsComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/products/new', component: ProductFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/products/:id', component: ProductFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/orders', component: AdminOrdersComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
