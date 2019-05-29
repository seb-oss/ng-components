import { Size } from './loader.config';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'sizeClassPipe' })
export class SizeClassPipe implements PipeTransform {
    transform(value: Size, sizeClass: string) {
        if (sizeClass) {
            return sizeClass;
        }
        switch (value) {
            case 'large':
                return 'spinner-lg';
            case 'small':
                return 'spinner-sm';
            case 'extraLarge':
                return 'spinner-xl';
            case 'medium':
                return 'spinner-md';
            case 'tiny':
                return 'spinner-xs';
            default:
                return 'spinner-sm';
        }
    }
}
