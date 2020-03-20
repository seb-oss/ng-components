import { TooltipComponent } from './tooltip';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './tooltip.pipe';

@Component({
  template: `
    <ac-tooltip>
      <div>
        <p>This is a <a href="www.abc.com">link</a></p>
      </div>
    </ac-tooltip>
  `,
})
class TestHtmlComponent {}

describe('Component: TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TooltipComponent, SafeHtmlPipe, TestHtmlComponent],
      providers: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TooltipComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should render and be defined', async(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should have the expected css class name', async(() => {
    component.className = 'tool-tip';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.tool-tip'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.wrongClass'))).toBeFalsy();
  }));

  it('should render and set the correct title text', async(() => {
    component.title = 'my ToolTip';
    fixture.detectChanges();
    const el: DebugElement = fixture.debugElement.query(By.css('.title'));
    expect(el.nativeElement.innerHTML).toEqual('my ToolTip');
  }));

  it('toggleTooltip function should be able to update the toggle value', done => {
    fixture.detectChanges();

    expect(component.toggle).toEqual(false);
    component.toggleTooltip();
    fixture.detectChanges();
    expect(component.toggle).toEqual(true);

    /**
     * set toggle to a particular state manually,
     */
    component.toggleTooltip(false);
    fixture.whenStable().then(() => {
      expect(component.toggle).toBeFalsy();
      done();
    });
  });

  it('should be able to call click event onClick when clickAction is provided ', async(() => {
    fixture.detectChanges();

    component.clickAction = e => true;
    component.className = 'my-tooltip';

    fixture.detectChanges();

    const clickSpy = spyOn(component, 'clickAction').and.callThrough();

    fixture.debugElement
      .query(By.css('.my-tooltip > .icon'))
      .triggerEventHandler('click', { e: event });

    expect(clickSpy).toHaveBeenCalled();
  }));

  it('forceDismiss should be able to force dissmiss toolTip when necessary', async(() => {
    fixture.detectChanges();
    /**
     * Schenario when className is triangle, message , messaget-container etc
     */
    const divObj = document.createElement('div');
    divObj.className = 'triangle';
    let runWithEventProp = true;
    divObj.addEventListener('click', (e: MouseEvent) => {
      if (runWithEventProp) {
        return component.forceDismiss(e);
      } else {
        return component.forceDismiss();
      }
    });
    const dismissMock = spyOn(component, 'forceDismiss').and.callThrough();
    divObj.dispatchEvent(new MouseEvent('click'));
    fixture.whenStable().then(() => {
      expect(dismissMock).toHaveBeenCalled();

      divObj.className = 'wrong-class-name';

      /**
       * Schenario when className is not recognized etc, set toggle obj to false.
       */

      divObj.dispatchEvent(new MouseEvent('click'));
      fixture.whenStable().then(() => {
        expect(component.toggle).toBeFalsy();

        /**
         * Schenario 3, when event property is not provided, set toggle property to false
         */

        runWithEventProp = false;

        divObj.dispatchEvent(new MouseEvent('click'));

        fixture.whenStable().then(() => {
          expect(component.toggle).toBeFalsy();
        });
      });
    });
  }));

  it('forceShow function should be able to forceShow toolTip when toolTip is hidden ', async(() => {
    fixture.whenStable().then(() => {
      expect(component.toggle).toBeFalsy();
      component.forceShow();

      fixture.whenStable().then(() => {
        expect(component.toggle).toBeTruthy();
      });
    });
  }));

  it('should render the content html', async(() => {
    const htmlFixture = TestBed.createComponent(TestHtmlComponent);
    htmlFixture.detectChanges();
    const messageContainer = htmlFixture.debugElement.query(
      By.css('.content .message-container')
    ).nativeElement;

    expect(messageContainer.innerHTML).toContain('www.abc.com');
    expect(messageContainer.textContent).toEqual('This is a link');
  }));
});
