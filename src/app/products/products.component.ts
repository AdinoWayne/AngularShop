import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;
  cart: any;
  subscription: Subscription; 

  constructor(private productService: ProductService,
    private shoppingCart: ShoppingCartService,
    private route: ActivatedRoute) {
    this.productService.getAll().pipe(switchMap(product => {
      this.products = product;
      return route.queryParamMap;
    })).subscribe(el => {
        this.category = el.get("category");
        this.filteredProducts = (this.category) ? 
        this.products.filter(p => p.category === this.category) : 
        this.products
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCart())
    .subscribe(el => this.cart = el);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
