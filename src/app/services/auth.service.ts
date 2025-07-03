import { Injectable } from '@angular/core';
import { User } from '../Interfaces/auth';
import { firstValueFrom } from 'rxjs';
import { gql, Apollo } from 'apollo-angular';

// --- Register Mutation ---
const registerMutation = gql`
  mutation refactored267($data: CreateUserDto!) {
    addUser(data: $data) {
      id
      email
      password
      name
      role
      avatar
      creationAt
      updatedAt
    }
  }
`;

// --- Forgot Password Mutation ---
const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  // --- Register User ---
  async registerUser(us: User) {
    const res = this.apollo.mutate({
      mutation: registerMutation,
      variables: {
        data: us,
      },
    });
    const xx = await firstValueFrom(res);
    return xx;
  }

  // --- Forgot Password ---
  async requestPasswordReset(email: string) {
    const res = await firstValueFrom(
      this.apollo.mutate({
        mutation: forgotPasswordMutation,
        variables: { email },
      })
    );
    return res;
  }
}
