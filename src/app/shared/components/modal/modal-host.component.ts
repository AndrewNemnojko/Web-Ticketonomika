import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Type,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-host',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="backdrop"
      [class.visible]="isVisible"
      (click)="close()"
    ></div>

    <div class="modal" [class.visible]="isVisible">
      <ng-template #container></ng-template>
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      inset: 0;
      background: #1d1d22d9;
        backdrop-filter: blur(2px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 20;
    }
    .backdrop.visible {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      background: #2b2d4c;
      padding: 20px;
      border-radius: 20px;
      overflow-y: scroll;
      min-height: 200px;
      max-height: calc(100dvh - 100px);
      min-width: 300px;
      max-width: 400px;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .modal.visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  `]
})
export class ModalHostComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  private componentRef?: ComponentRef<any>;
  private onClose$ = new Subject<any>();
  isVisible = false;

  ngAfterViewInit() {
    setTimeout(() => (this.isVisible = true), 10);
  }

  open<T>(component: Type<T>, inputs?: Partial<T>): Subject<any> {
    this.container.clear();
    this.componentRef = this.container.createComponent(component);

    if (inputs) Object.assign(this.componentRef.instance, inputs);

    const inst = this.componentRef.instance as any;
    if (inst.closed && typeof inst.closed.subscribe === 'function') {
      inst.closed.subscribe((res: any) => this.close(res));
    }

    return this.onClose$;
  }

  close(result?: any) {
    this.isVisible = false;

    setTimeout(() => {
      this.onClose$.next(result);
      this.onClose$.complete();
      this.container.clear();
    }, 300);
  }

  ngOnDestroy() {
    this.onClose$.complete();
  }
}
