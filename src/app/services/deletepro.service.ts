import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { gql, Apollo } from 'apollo-angular';

const delmutp = gql`
  mutation refactored851($id: ID!) {
    deleteProduct(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeleteproService {
  constructor(private apollo: Apollo) {}

  async deleteProduct(obj: { id: string }) {
    const res = this.apollo.mutate({
      mutation: delmutp,
      variables: {
        id: obj.id,
      },
    });
    const x = await firstValueFrom(res);
    return x;
  }
}
