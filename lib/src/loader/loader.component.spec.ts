import { LoaderComponent } from './loader.component';
import { SizeClassPipe } from './loader.pipe';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('Component: LoaderComponent', () => {
    let fixture: ComponentFixture<LoaderComponent>;
    let component: LoaderComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [LoaderComponent, SizeClassPipe],
            providers: [],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(LoaderComponent);
            component = fixture.componentInstance;
            component.toggle = false;
        });
    }));

    it('should render and be defined', async(() => {
        component.className = 'loader';
        fixture.detectChanges();
        expect(component).toBeTruthy();
    }));

    it('should render and receive the correct parameters', async(() => {
        component.toggle = true;
        component.className = 'test-loader';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.test-loader'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.wrongClass'))).toBeFalsy();
    }));

    it('should only render when toggle is true', async(() => {
        component.toggle = false;
        component.className = 'test-loader';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.seb-spinner'))).toBeFalsy();
        component.toggle = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.seb-spinner'))).toBeTruthy();
    }));

    it('should render loader on fulscreen mode when fullScreen is true', async(() => {
        component.toggle = true;
        component.fullScreen = false;
        component.className = 'test-loader';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.test-loader.fullscreen'))).toBeFalsy();
        component.fullScreen = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.test-loader.fullscreen'))).toBeTruthy();
    }));

    it('should be able to set sizes by sizeClass or size parameter', async(() => {
        component.toggle = true;
        component.fullScreen = false;
        component.sizeClassName = 'spinner-sm';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.seb-spinner.spinner-sm'))).toBeTruthy();
        component.sizeClassName = null;
        component.size = "large";
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.seb-spinner.spinner-lg'))).toBeTruthy();
    }));

});
