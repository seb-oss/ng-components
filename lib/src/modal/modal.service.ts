import {
  ApplicationRef,
  ComponentFactory, ComponentFactoryResolver,
  ComponentRef, Inject,
  Injectable,
  InjectionToken,
  Injector, Renderer2, RendererFactory2,
  Type
} from '@angular/core';
import {SebModalConfig} from './modal.config';
import {SebModalInjector} from './modal.injector';
import {SebModalRef} from './modal.ref';
import {DOCUMENT, Location} from '@angular/common';
import {SebModal} from './modal';
import {SebModalBackdrop} from './modal.backdrop';
import {take} from 'rxjs/operators';

export const SEB_MODAL_DATA = new InjectionToken<any>('SebModalData');
export const SEB_DEFAULT_CONFIG = <SebModalConfig>({
  type: null,
  closable: true,
  closeOnNavigationChanges: true,
  data: null,
  classes: null
});

@Injectable({providedIn: 'root'})
export class SebModalService {

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private rendererFactory: RendererFactory2,
    private cmpFactoryResolver: ComponentFactoryResolver,
    private location: Location,
    @Inject(DOCUMENT) private document) { }

  public open<T>(cmp: Type<T>, config: SebModalConfig = {}): SebModalRef {

    config = {...SEB_DEFAULT_CONFIG, ...config};

    const modalRef: SebModalRef = new SebModalRef(this.location, config);
    const cmpRef: ComponentRef<T> = this._getCmpRef(cmp, this._getInjector(modalRef, config.data));
    const modalCmpRef: ComponentRef<SebModal> = this._getCmpRef(SebModal, this.injector, [[cmpRef.location.nativeElement]]);
    const backdropCmpRef: ComponentRef<SebModalBackdrop> = this._getCmpRef(SebModalBackdrop, this.injector);

    modalCmpRef.instance.modalRef = modalRef;

    this._attachToView(modalCmpRef);
    this._attachToView(backdropCmpRef);

    const renderer: Renderer2 = this._getRenderer();
    renderer.setStyle(this.document.body, 'overflow', 'hidden');
    renderer.addClass(this.document.body, 'modal-open');

    modalRef.onClose$.pipe(
      take(1)
    ).subscribe(() => {
      renderer.removeStyle(this.document.body, 'overflow');
      renderer.removeClass(this.document.body, 'modal-open');
      this._detachFromView(modalCmpRef);
      this._detachFromView(backdropCmpRef);

      [modalCmpRef, backdropCmpRef, cmpRef]
        .forEach(cmRef => {
          cmRef.destroy();
          cmRef = null;
        })
    });

    return modalRef;
  }

  private _getRenderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }


  private _attachToView<T>(cmpRef: ComponentRef<T>): void {
    const root: HTMLElement = this.document.body;
    root.appendChild(cmpRef.location.nativeElement);
  }


  private _detachFromView<T>(cmpRef: ComponentRef<T>): void {
    const el: HTMLElement = cmpRef.location.nativeElement;
    el.parentNode.removeChild(el);
  }


  private _getInjector<D>(modalRef: SebModalRef, data: D): SebModalInjector {
    const tokens = new WeakMap();
    tokens.set(SEB_MODAL_DATA, data);
    tokens.set(SebModalRef, modalRef);
    return new SebModalInjector(this.injector, tokens);
  }


  private _getCmpRef<T>(cmp: Type<T>, injector: Injector, projectableNodes?: any[][]): ComponentRef<T> {
    const cmpFactory: ComponentFactory<T> =
      this.cmpFactoryResolver.resolveComponentFactory(cmp);
    const cmpRef: ComponentRef<T> =
      cmpFactory.create(injector, projectableNodes);
    this.appRef.attachView(cmpRef.hostView);
    return cmpRef;
  }
}
