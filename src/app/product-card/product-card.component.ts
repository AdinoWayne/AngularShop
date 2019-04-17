import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {

  @Input('product') p: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private cardService: ShoppingCartService) {

  }

  ngOnInit() {
  }

  addToCard(product: Product) {
    this.cardService.addcart(product);
  }

  getQuantity() { 
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.p.$key];
    
    return item ? item.quantity : 0; 
  }
}