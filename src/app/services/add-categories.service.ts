import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Add } from '../Interfaces/add';

import { gql, Apollo } from 'apollo-angular';

const addqq = gql`
  mutation refactored611($data: CreateCategoryDto!) {
    addCategory(data: $data) {
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
export class AddCategoriesService {
  constructor(private apollo: Apollo) {}

  addcat(add: Add) {
    const res = this.apollo.mutate({
      mutation: addqq,
      variables: {
        data: {
          name: add.name,
          image: add.image,
        },
      },
    });
    const x = firstValueFrom(res);
    return x;
  }
}
