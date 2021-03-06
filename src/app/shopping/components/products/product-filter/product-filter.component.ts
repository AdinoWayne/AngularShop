import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.sass']
})
export class ProductFilterComponent implements OnInit {
  
  @Input('category') category: string;
  categories$;
  
  constructor(private categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
  }

}
