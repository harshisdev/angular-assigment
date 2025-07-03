import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SharedcartService } from '../../services/sharedcart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './cart.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, OnDestroy {
  cartingList: any[] = [];

  constructor(
    private cart: SharedcartService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartingList = this.cart.getCartList(); // ✅ Use getter
  }

  ngOnDestroy(): void {
    this.cart.clearCart(); // ✅ Use public method
  }

  onPro() {
    this.router.navigateByUrl('dashboard');
  }

  onCheckout() {
    if (this.cartingList.length >= 1) {
      this.toast.success('Checkout successful', 'Success');
      this.cart.clearCart();
      this.cartingList = [];
    } else {
      this.toast.warning('Cart is empty', 'Warning');
    }
  }
}
