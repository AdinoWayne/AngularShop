import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subcription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemsCount: number;

  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe(el => {
      this.products = el;
      this.initializeTable(el);
    });
  }

  reloadItems(event) {
    if (!this.tableResource) return ;
    this.tableResource.query(event)
        .then(items => this.items = items);
  }

  private initializeTable(product: Product[]) {
    this.tableResource = new DataTableResource(product);
    this.tableResource.query({ offset: 0 })
        .then(items => {
          this.items = items
        });
    this.tableResource.count()
        .then(count => {
          this.itemsCount = count;
        });
  }

  filter(query: string) {
    let filteredProducts = (query) ? 
    this.products.filter(el => el.title.toLowerCase().includes(query.toLowerCase())): 
    this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    if(this.subcription) {
      this.subcription.unsubscribe();
    }
  }

  ngOnInit() {
  }

}
