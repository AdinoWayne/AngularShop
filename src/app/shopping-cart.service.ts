import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators'
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

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

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' +cartId).pipe(map(el => new ShoppingCart(el.items)));
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  async addcart(product: Product) { 
    await this.updateItem(product, 1);
  }
  async removeFromCart(product: Product) {
    await this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId, product.$key);
    item$.pipe(take(1)).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove()
      else item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity
      });
    })
  }
}
