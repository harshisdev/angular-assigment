import { Component, OnInit } from '@angular/core';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { ButtonAddComponent } from '../Add_Categories/button-add/button-add.component';
import { ButtonDeleteComponent } from '../Delete_Categories/button-delete/button-delete.component';
import { ButtonUpdateComponent } from '../Update_Categories/button-update/button-update.component';
import { FetchcatService } from '../../services/fetchcat.service';
import { AddCategoriesService } from '../../services/add-categories.service';
import {
  updateProduct,
  Add,
  UpdateCategories,
  deletecategories,
} from '../../Interfaces/add';
import { DelcatserviceService } from '../../services/delcatservice.service';
import { UpdatecatServiceService } from '../../services/updatecat.service.service';
import { ShowproService } from '../../services/showpro.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { Category } from '../../Interfaces/api';
import { Product } from '../../Interfaces/api';
import { AddnewProductService } from '../../services/addnew-product.service';
import { DeleteproService } from '../../services/deletepro.service';
import { UpdateProductService } from '../../services/update-product.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddProductButtonComponent } from '../Add_Product/add-product-button/add-product-button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewProduct } from '../../Interfaces/api';
import { SharedcartService } from '../../services/sharedcart.service';

@Component({
  selector: 'app-layout',
  imports: [
    MatButtonModule,
    CategoriesListComponent,
    ButtonAddComponent,
    ButtonDeleteComponent,
    ButtonUpdateComponent,
    ProductListComponent,
    MatGridListModule,
    AddProductButtonComponent,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Categories List//
  categories: Category[] = [];
  //Current Selected ID
  categoryID: number | undefined;
  //Product List//
  ProductList: Product[] = [];
  ///spinner///////
  showspinner: boolean = false;

  totalCartItems: number = 0;

  constructor(
    private fetch: FetchcatService,
    private addcat: AddCategoriesService,
    private delcat: DelcatserviceService,
    private update: UpdatecatServiceService,
    private showpro: ShowproService,
    private addnewpro: AddnewProductService,
    private delpro: DeleteproService,
    private updatepro: UpdateProductService,
    private router: Router,
    private toast: ToastrService,
    private cartService: SharedcartService
  ) {}

  /// fetch all categories when this component first mount
  async ngOnInit(): Promise<void> {
    this.cartService.totalItems$.subscribe((count) => {
      this.totalCartItems = count;
    });

    try {
      this.showspinner = true;
      this.categories = await this.fetch.fetchcategories();
      this.ProductList = await this.fetch.fetproducts();
      this.showspinner = false;
    } catch (error) {
      this.toast.error('Something went wrong');
    }
  }

  //////// Function to add category
  async onAdd(add: Add) {
    try {
      await this.addcat.addcat(add as Add);
      await this.fetch.refetch().then((data) => (this.categories = data));
      this.toast.success('Successfully Added');
    } catch (error) {
      this.toast.error('Bad Request');
    }
  }

  /////  Function to delete category
  async onDelete(del: deletecategories) {
    try {
      await this.delcat.deletecategories(del);
      await this.fetch.refetch().then((data) => (this.categories = data));
      this.toast.success('Deleted Successfully');
    } catch (error) {
      this.toast.error('Bad Request');
    }
  }

  ////// function to update category
  async onUpdate(obj: UpdateCategories) {
    try {
      await this.update.update(obj);
      await this.fetch.refetch().then((data) => (this.categories = data));
      this.toast.success('Updated Successfully');
    } catch (error) {
      this.toast.error('Bad Request');
    }
  }

  //// Function to fetch Products according to categories
  async showProduct(id: { id: number | undefined }) {
    try {
      this.showspinner = true;
      this.ProductList = await this.showpro.showpro(id);
      this.categoryID = id.id;
      this.showspinner = false;
    } catch (error) {
      this.toast.error('Something is Bad', 'Not Able to fetch Products');
    }
  }
  ///////// Function to Add New Product
  async AddNewProduct(data: NewProduct) {
    try {
      await this.addnewpro.AddNewProduct(data);
      this.ff();
      this.toast.success('Product Added');
    } catch {
      this.toast.error('Bad Request');
    }
  }

  ///////Function to Delete Product
  async ondeletePro(obj: { id: string }) {
    try {
      await this.delpro.deleteProduct(obj);
      this.ff();
      this.toast.success('Deleted Successfull');
    } catch (error) {
      this.toast.error('Something is wrong');
    }
  }
  ///////// this function reftech the product list and deleteion or updation
  async ff() {
    const numb = { id: this.categoryID };
    await this.showpro.refetch(numb).then((data) => {
      this.ProductList = data;
    });
  }
  ////////// this function used for update the product
  async onupdate(updateobj: updateProduct) {
    try {
      await this.updatepro.updateProduct(updateobj);
      this.ff();
      this.toast.success('Successfully updated');
    } catch (error) {
      this.toast.error('Bad Request');
    }
  }
  /////////// This function take us to cart page
  tocart() {
    this.router.navigateByUrl('cart');
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
