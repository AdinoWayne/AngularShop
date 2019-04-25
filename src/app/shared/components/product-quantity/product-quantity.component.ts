import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.sass']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') p: Product;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private cardService: ShoppingCartService) {

  }
    
  ngOnInit() {
  }

  addToCard() {
    this.cardService.addcart(this.p);
  }

  removeFromCart() {
    this.cardService.removeFromCart(this.p);
  }
}
