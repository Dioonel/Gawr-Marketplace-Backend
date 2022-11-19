import { Cart } from "./../../users/entities/cart.entity";

export function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

export function subtotal(items: any[]) {
  let myItems = [];
  for(let item of items) {
    myItems.push({
      posting: item.posting,
      quantity: item.quantity,
      subtotal: (item.posting.price || 0) * (item.quantity || 1)
    });
  }
  return myItems;
}

export function total(cart: Cart) {
  cart.total = 0;
  if(cart.items.length > 0){
    for(let item of cart.items){
      cart.total += item.subtotal;
    }
  }
  return cart;
}
