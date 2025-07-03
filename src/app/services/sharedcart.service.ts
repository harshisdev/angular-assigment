import { Injectable } from '@angular/core';
import { cartlist } from '../Interfaces/add';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedcartService {
  cartList: cartlist = [{}];
  constructor() {}
  private totalItemsSubject = new BehaviorSubject<number>(0);

  totalItems$ = this.totalItemsSubject.asObservable();

  cartadding(obj: {
    productId?: string | undefined;
    quantity?: number | undefined;
    title?: string | undefined;
    price?: number | undefined;
  }) {
    this.cartList.push(obj);
  }
}
