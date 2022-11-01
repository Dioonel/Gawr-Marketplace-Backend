import { Cart } from "./../../users/entities/cart.entity";

export function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

export function subtotal(items: any[]) {
  let myItems = [];
  for(let item of items) {
    myItems.push({
      product: item.product,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity
    });
  }
  return myItems;
}

export function total(cart: Cart) {
  cart.total = 0;
  for(let item of cart.items){
    cart.total += item.subtotal;
  }
  return cart;
}
