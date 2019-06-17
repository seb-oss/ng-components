import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
    templateUrl: 'example.loader.html',
    selector: 'example-loader'
})
export class ExampleLoader {
    dropdownForm: FormGroup;
    selectedSize: string;
    sizes = [
        { name: 'Default', key: 'default' },
        { name: 'Tiny', key: 'tiny' },
        { name: 'Small', key: 'small' },
        { name: 'Medium', key: 'medium' },
        { name: 'Large', key: 'large' },
        { name: 'Extra Large', key: 'extraLarge' },
    ];

    constructor(private formBuilder: FormBuilder) {

        this.dropdownForm = this.formBuilder.group({
            sizeControl: new FormControl(this.sizes)
        });

        this.dropdownForm.valueChanges.subscribe(changes => {
            if (changes && changes.sizeControl) {
                this.selectedSize = changes.sizeControl.key;
            }
        });

        this.selectedSize = '';

    }
}
