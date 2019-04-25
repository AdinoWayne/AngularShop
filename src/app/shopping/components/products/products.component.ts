import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService,
    private shoppingCart: ShoppingCartService,
    private route: ActivatedRoute) {

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCart.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(product => {
      this.products = product;
      return this.route.queryParamMap;
    })).subscribe(el => {
        this.category = el.get("category");
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products
  }
}
