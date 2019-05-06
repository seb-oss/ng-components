import {Directive} from '@angular/core';

@Directive({
  selector: '[sebModalTitle]',
  host: {
    '[class]': '"modal-title"'
  }
})
export class SebModalTitle { }

@Directive({
  selector: 'seb-modal-header, [sebModalHeader]',
  host: {
    '[class]': '"modal-header"'
  }
})
export class SebModalHeader { }

@Directive({
  selector: 'seb-modal-body, [sebModalBody]',
  host: {
    '[class]': '"modal-body"',
    'style': 'display:block;'
  }
})
export class SebModalBody { }

@Directive({
  selector: 'seb-modal-footer, [sebModalFooter]',
  host: {
    '[class]': '"modal-footer"'
  }
})
export class SebModalFooter { }
