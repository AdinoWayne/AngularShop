import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }
  private getcart(cartId: string) {
    return this.db.object('/shopping-carts/' +cartId)
  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  async addcart(product: Product) { 
    let cartId = await this.getOrCreateCart();
    console.log(product);
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    item$.pipe(take(1)).subscribe(item => {
      if (item.$exists()) item$.update({ quantity: item.quantity + 1});
      else item$.set({ product: product, quantity: 1});
    })
  }
}
