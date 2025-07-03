import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Product, ApiProductResponse } from '../Interfaces/api';

import { gql, Apollo } from 'apollo-angular';
import { ApiResponse, Category } from '../Interfaces/api';

const qq = gql`
  query refactored965 {
    categories {
      id
      name
    }
  }
`;

const qq2 = gql`
  query refactored467($categoryId: Float) {
    products(categoryId: $categoryId) {
      id
      title
      price
      description
      images
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class FetchcatService {
  constructor(private apollo: Apollo) {}

  async fetchcategories(): Promise<Category[]> {
    const res = this.apollo.watchQuery<ApiResponse>({
      query: qq,
      fetchPolicy: 'network-only',
    }).valueChanges;
    const rs = await firstValueFrom(res).then((data) => {
      return data?.data?.categories ?? [];
    });
    return rs;
  }

  async refetch() {
    const cate = await this.fetchcategories();
    return cate;
  }

  async fetproducts(): Promise<Product[]> {
    const res = this.apollo.watchQuery<ApiProductResponse>({
      query: qq2,
      variables: {
        categoryId: 1,
      },
    }).valueChanges;
    const xx = await firstValueFrom(res).then((data) => {
      return data?.data?.products ?? [];
    });
    return xx;
  }
}
