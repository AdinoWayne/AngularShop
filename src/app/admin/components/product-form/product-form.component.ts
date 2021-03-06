import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
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

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p)
    }
   }

  ngOnInit() {
  }

  save(product) {

    if(this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if(!confirm('Are you sure you want to delete this products')) return;
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
  }
}
