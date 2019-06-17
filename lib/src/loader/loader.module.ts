import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { SizeClassPipe } from './loader.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoaderComponent,
        SizeClassPipe
    ],
    exports: [
        LoaderComponent
    ]
})
export class SebLoaderModule { }
