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
    <div class="backdrop" [class.visible]="isVisible" (click)="close()"></div>
    <div 
      class="modal" 
      [class.visible]="isVisible"
      [class.with-body]="modalBody"
      [style.max-width]="maxWidth"
    >
      <ng-template #container></ng-template>
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      inset: 0;
      background: #18162e9e;
      backdrop-filter: blur(2px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 20;
      padding: 20px;
    }
    .backdrop.visible { opacity: 1; }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95); 
      border-radius: 20px;
      min-width: 300px;
      min-height: 140px;
      max-height: calc(100dvh - 100px);
      overflow-y: auto;
      opacity: 0;
      transition: background 0.3s ease, border 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
      z-index: 1000;
      border: 2px solid #ffffff00;
      &.with-body{
        background: #2b2d4c; 
        padding: 20px;
        border: 2px solid #ffffff2b;
        &.visible{
          opacity: 1; 
          transform: translate(-50%, -50%) scale(1) ;
        }
      }
      &.visible{
        opacity: 1; 
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `]
})
export class ModalHostComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;
  private componentRef?: ComponentRef<any>;
  private onClose$?: Subject<any>;
  isVisible = false;
  modalBody = true;
  maxWidth: string = "400px";
  ngAfterViewInit() {
    setTimeout(() => (this.isVisible = true), 10);
  }

  open<T>(component: Type<T>, inputs?: Partial<T>, modalBody: boolean = true, width?: string): Subject<any> {
    this.container.clear();
    this.componentRef = this.container.createComponent(component);
    this.modalBody = modalBody;
    if(width){this.maxWidth = width}
    if (inputs) Object.assign(this.componentRef.instance, inputs);

    this.onClose$ = new Subject<any>();
    const inst = this.componentRef.instance as any;

    if (inst.closed && typeof inst.closed.subscribe === 'function') {
      inst.closed.subscribe((res: any) => this.close(res));
    }

    return this.onClose$;
  }

  close(result?: any) {
    this.isVisible = false;

    setTimeout(() => {
      this.onClose$?.next(result);
      this.onClose$?.complete();
      this.container.clear();
    }, 300);
  }

  ngOnDestroy() {
    this.onClose$?.complete();
  }
}
