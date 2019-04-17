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

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart() {
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' +cartId)
  }

  private async getOrCreateCart(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
  async addcart(product: Product) { 
    await this.updateItemQuantity(product, 1);
  }
  async removeFromCart(product: Product) {
    await this.updateItemQuantity(product, -1);
  }
  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCart();
    let item$ = this.getItem(cartId, product.$key);
    item$.pipe(take(1)).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + change});
    })
  }
}
