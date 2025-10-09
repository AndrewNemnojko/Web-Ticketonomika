import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="buttons">
        <button (click)="cancel()" class="btn-cancel">{{abort}}</button>
        <button (click)="confirm()" class="btn-confirm">{{success}}</button>  
      </div>
    </div>
  `,
  styles: [`
    .modal-content {
      color: white;
      width: 100%;
      text-align: center;
    }
    .buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }
    h3{
      background-color: #0000003b;
      border-radius: 10px;
      font-weight: 400;
      padding: 10px;
      font-size: 16px;
    }
    p{
      font-size: 14px;
      color: #ffffffbf;
      margin-top: 10px;
    }
    button{
      color: white;
      border: 1px solid #ffffff2b;
      font-size: 15px;
      padding: 10px;
      background-color: #ffffff00;
      border-radius: 10px;
      transition: all .2s ease-in-out;
      &:hover{
        cursor: pointer;
        background-color: #ffffff0c;
      }
    }
  `]
})
export class ConfirmModalComponent {
  @Input() title = 'Підтвердження';
  @Input() message = '';
  @Input() success = 'Так';
  @Input() abort = 'Ні';
  closed = new Subject<boolean>();

  confirm() { this.closed.next(true); this.closed.complete(); }
  cancel() { this.closed.next(false); this.closed.complete(); }
}
