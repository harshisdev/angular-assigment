import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../Interfaces/api';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product-dialog',
  imports: [
    NgIf,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './add-product-dialog.component.html',
})
export class AddProductDialogComponent implements OnInit {
  cat!: Category[];
  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Category[]
  ) {}

  async ngOnInit(): Promise<void> {
    this.cat = this.data;
  }

  AddProductForm = new FormGroup({
    CatId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  get CatId() {
    return this.AddProductForm.get('CatId');
  }
  get title() {
    return this.AddProductForm.get('title');
  }
  get description() {
    return this.AddProductForm.get('description');
  }
  get image() {
    return this.AddProductForm.get('image');
  }
  get price() {
    return this.AddProductForm.get('price');
  }

  onSubmit() {
    if (this.AddProductForm.invalid) {
      return;
    }

    this.dialogRef.close(this.AddProductForm.value);
  }
}
