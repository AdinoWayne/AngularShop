import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { fillProperties } from '@angular/core/src/util/property';

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

  constructor(private productService: ProductService,
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

  ngOnInit() {
  }

}
