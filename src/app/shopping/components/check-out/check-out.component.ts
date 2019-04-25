import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

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
