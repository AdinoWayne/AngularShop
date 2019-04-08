import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subcription: Subscription;

  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(el => {
      this.filteredProducts = this.products = el
    });
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
    this.products.filter(el => el.title.toLowerCase().includes(query.toLowerCase())): 
    this.products;
  }

  ngOnDestroy() {
    if(this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  ngOnInit() {
  }

}
