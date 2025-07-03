import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { gql, Apollo } from 'apollo-angular';
import { updateProduct } from '../Interfaces/add';

const query = gql`
  mutation refactored245($id: ID!, $changes: UpdateProductDto!) {
    updateProduct(id: $id, changes: $changes) {
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
export class UpdateProductService {
  constructor(private apolo: Apollo) {}

  async updateProduct(obj: updateProduct) {
    const res = this.apolo.mutate({
      mutation: query,
      variables: {
        id: obj.productId,
        changes: {
          title: obj.title,
          price: obj.price,
          description: obj.description,
          images: obj.images,
        },
      },
    });
    const x = await firstValueFrom(res);
    return x;
  }
}
