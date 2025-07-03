import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

import { Product, ApiProductResponse } from '../Interfaces/api';

import { gql, Apollo } from 'apollo-angular';

const showpro = gql`
  query ($categoryId: Float) {
    products(categoryId: $categoryId) {
      id
      title
      price

      images
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ShowproService {
  constructor(private apollo: Apollo) {}

  async showpro(id: { id: number | undefined }): Promise<Product[]> {
    const res = this.apollo.watchQuery<ApiProductResponse>({
      query: showpro,
      fetchPolicy: 'network-only',
      variables: {
        categoryId: id.id,
      },
    }).valueChanges;
    const x = await firstValueFrom(res).then((data) => {
      return data?.data?.products ?? [];
    });
    return x;
  }

  async refetch(numb: { id: number | undefined }) {
    const res = await this.showpro(numb);
    return res;
  }
}
