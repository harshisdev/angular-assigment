import { Component, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule, MatListModule],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  categoryList = input<unknown>();
  nameCat = input<string>();
  idCat = input<string>();
  emitid = output<{ id: number | undefined }>();
  selectcat: boolean = false;

  ngOnInit(): void {
    if (this.idCat() == '1') {
      this.selectcat = true;
    }
  }

  showProduct(id: string | undefined) {
    const ss: number = +id!;
    this.emitid.emit({
      id: ss,
    });
  }
}
