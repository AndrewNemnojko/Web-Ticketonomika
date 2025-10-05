import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  imports: [],
  template: `
    <div class="error-page">
      <h1>404</h1>
      <p>¯\\_(ツ)_/¯</p>
      <p>Сторінка не знайдена</p>
    </div>
  `,
  styles: [
    `
      .error-page {
        display: flex;
        flex-direction: column;
        padding: 30px;
        margin: 50px auto;
        border-radius: 30px;
        max-width: 400px;
        background-color: #ffffff05;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      h1 {
        font-size: 5rem;
        margin: 0;
      }
      p {
        margin: 0.5rem 0;
        font-size: 1.2rem;
      }
    `,
  ],
})
export class NotfoundComponent {}
