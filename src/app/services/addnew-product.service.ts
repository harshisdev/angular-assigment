import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { NewProduct } from '../Interfaces/api';

import { gql, Apollo } from 'apollo-angular';

const qu = gql`
  mutation refactored70($data: CreateProductDto!) {
    addProduct(data: $data) {
      id
      title
      price
      description
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AddnewProductService {
  constructor(private apollo: Apollo) {}

  AddNewProduct(data: NewProduct) {
    const res = this.apollo.mutate({
      mutation: qu,
      variables: { data },
    });
    const x = firstValueFrom(res);
    return x;
  }
}
