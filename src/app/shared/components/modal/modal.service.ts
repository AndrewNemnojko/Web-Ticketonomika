import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Type } from '@angular/core';
import { ModalHostComponent } from './modal-host.component';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalRef?: ComponentRef<ModalHostComponent>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<T>(component: Type<T>, inputs?: Partial<T>): Subject<any> {
    if (this.modalRef) this.close();

    this.modalRef = createComponent(ModalHostComponent, {
      environmentInjector: this.injector
    });

    this.appRef.attachView(this.modalRef.hostView);
    document.body.appendChild(this.modalRef.location.nativeElement);

    const result$ = new Subject<any>();

    setTimeout(() => {
      const modal$ = this.modalRef!.instance.open(component, inputs);
      modal$.subscribe(res => {
        result$.next(res);
        result$.complete();
        this.close();
      });
    });

    document.body.style.overflow = 'hidden';
    return result$;
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
