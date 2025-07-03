import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { loginUser, apiloginresponse, logindata } from '../Interfaces/auth';
import { gql, Apollo } from 'apollo-angular';

const mut = gql`
  mutation refactored968($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apollo: Apollo) {}

  async login(data: loginUser): Promise<logindata> {
    const res = this.apollo.mutate<apiloginresponse>({
      mutation: mut,
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    const xx = await firstValueFrom(res).then((data) => {
      return data?.data?.login ?? { access_token: '', refresh_token: '' };
    });
    return xx;
  }
}
