import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {

  @Input('product') p: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  
  constructor(private cardService: ShoppingCartService) {

  }

  ngOnInit() {
  }

  addToCard() {
    this.cardService.addcart(this.p);
  }
}