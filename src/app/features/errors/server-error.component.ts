import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  imports: [],
  template: `
    <div class="error-page">
      <h1>500</h1>
      <p>(x_x)</p>
      <p>Помилка на сервері</p>
    </div>
  `,
  styles: [`
    .error-page {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 30px;
      margin: 50px auto;
      border-radius: 30px;
      max-width: 400px;
      background-color: #ffffff0a;
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
  `]
})
export class ServerErrorComponent {

}
