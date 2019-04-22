import { ShoppingCart } from './shopping-cart';

export class Order {

    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, public shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(el => {
            return {
              product: {
                title: el.title,
                imageUrl: el.imageUrl,
                price: el.price
              },
              quantity: el.quantity,
              totalPrice: el.totalPrice
            }
        })
    }
}