import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit {
  
  shipping = {};
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(private orderService: OrderService,
    private router: Router,
    private authService: AuthService,
    private shoppingCartServices: ShoppingCartService) { 

  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartServices.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
   
  async placeOrder() {
    let temp = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(temp);
    this.shoppingCartServices.clearCart();
    this.router.navigate(['order-success/', result.key])
  }
}
