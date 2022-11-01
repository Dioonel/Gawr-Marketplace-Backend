import { ItemDTO } from "src/products/dtos/items.dtos";

export function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

export function subtotal(item: ItemDTO) {
  console.log(item);
  const myItem: ItemDTO = {
    ...item,
    subtotal: item.product.price * item.quantity
  }
  console.log(myItem);
  return myItem;
}
