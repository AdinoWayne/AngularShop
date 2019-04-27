import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CommonModule
  ]
})
export class AdminModule { }
