import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../shared/services/order.service';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.sass']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;
  shipping = {};
  userSubscription: Subscription;
  userId: string;
  
  constructor(private orderService: OrderService,
    private router: Router,
    private authService: AuthService) { 
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let temp = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(temp);
    this.router.navigate(['order-success/', result.key])
  }
}
