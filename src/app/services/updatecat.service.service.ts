import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

import { gql, Apollo } from 'apollo-angular';
const updateq = gql`
  mutation refactored98($id: ID!, $changes: UpdateCategoryDto!) {
    updateCategory(id: $id, changes: $changes) {
      id
      name
      image
      creationAt
      updatedAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class UpdatecatServiceService {
  constructor(private apollo: Apollo) {}

  update(obj: { id: string | undefined; name: string | undefined }) {
    const res = this.apollo.mutate({
      mutation: updateq,
      variables: {
        id: obj.id,
        changes: {
          name: obj.name,
        },
      },
    });
    const x = firstValueFrom(res);
    return x;
  }
}
