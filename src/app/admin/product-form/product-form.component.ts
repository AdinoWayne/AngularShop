import { CategoryService } from '../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators'
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.productService.get(id).pipe(take(1)).subscribe(p => this.product = p)
    }
   }

  ngOnInit() {
  }

  save(product) {

    if(this.id) {
      this.productService.update(this.id, product)
    }

    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if(this.id)
  }
}
