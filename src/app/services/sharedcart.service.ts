import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedcartService {
  private cartList: any[] = [];

  private totalCartItemsSubject = new BehaviorSubject<number>(0);
  totalCartItems$ = this.totalCartItemsSubject.asObservable();

  constructor() {}

  cartadding(item: any) {
    // Optionally merge quantities if product already exists
    const index = this.cartList.findIndex((x) => x.productId === item.productId);
    if (index > -1) {
      this.cartList[index].quantity += item.quantity;
    } else {
      this.cartList.push(item);
    }

    this.updateTotalItems();
  }

  getCartList() {
    return this.cartList;
  }

  private updateTotalItems() {
    const total = this.cartList.reduce((sum, item) => sum + item.quantity, 0);
    this.totalCartItemsSubject.next(total);
  }

  clearCart() {
    this.cartList = [];
    this.updateTotalItems();
  }

  removeItem(productId: string) {
    this.cartList = this.cartList.filter((item) => item.productId !== productId);
    this.updateTotalItems();
  }
}
