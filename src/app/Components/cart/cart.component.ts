import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SharedcartService } from '../../services/sharedcart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { cartlist } from '../../Interfaces/add';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NgIf, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private cart: SharedcartService,
    private toast: ToastrService,
    private router: Router
  ) {}
  cartingList!: cartlist;

  ngOnInit(): void {
    this.cartingList = this.cart.cartList;
  }
  ngOnDestroy(): void {
    this.cart.cartList = [{}];
  }

  onPro() {
    this.router.navigateByUrl('dashboard');
  }
  onCheckout() {
    if (this.cartingList.length >= 2) {
      this.toast.success('checkout successful', 'Success');
      this.cartingList = [{}];
    } else {
      this.toast.warning('Cart is empty', 'Warning');
    }
  }
}
