import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { gql, Apollo } from 'apollo-angular';

const delmut = gql`
  mutation refactored916($id: ID!) {
    deleteCategory(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DelcatserviceService {
  constructor(private apollo: Apollo) {}

  deletecategories(del: { id: string | undefined }) {
    const { id: id } = del;
    const res = this.apollo.mutate({
      mutation: delmut,
      variables: {
        id: id,
      },
    });
    const x = firstValueFrom(res);
    return x;
  }
}
