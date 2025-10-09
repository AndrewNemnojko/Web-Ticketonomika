import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ModalHostComponent } from './modal-host.component';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalRef?: ComponentRef<ModalHostComponent>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<T>(component: any, inputs?: Partial<T>) {
    if (this.modalRef) this.close();

    this.modalRef = createComponent(ModalHostComponent, {
      environmentInjector: this.injector
    });

    this.appRef.attachView(this.modalRef.hostView);
    document.body.appendChild(this.modalRef.location.nativeElement);

    setTimeout(() => {
        const close$ = this.modalRef!.instance.open(component, inputs);
        close$.subscribe(() => this.close());
    });
    document.body.style.overflow = 'hidden';
     return new Subject<any>();
  }
  
  close() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = undefined;
      document.body.style.overflow = '';
    }
  }
}
