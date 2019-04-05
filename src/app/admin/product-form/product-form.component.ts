import { CategoryService } from '../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

  categories$

  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product)
  }
}
