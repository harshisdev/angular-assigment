import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div style="text-align: center; padding: 50px;">
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for does not exist.
        <a routerLink="/">Login</a>
      </p>
    </div>
  `,
})
export class NotFoundComponent {}
