import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnInit {

  @Input('p') product: Product;
  @Input('show-actions') showActions: boolean = true;
  
  constructor() { }

  ngOnInit() {
  }

}
