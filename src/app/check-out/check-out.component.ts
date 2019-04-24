import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription, Observable } from 'rxjs';
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
  
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartServices: ShoppingCartService) { 
  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartServices.getCart();
  }
}
