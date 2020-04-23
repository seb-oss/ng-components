import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TextAreaComponent } from "./textArea.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "test-sebng-pagination",
    template: `
        <sebng-textArea
            [className]="className"
            [cols]="cols"
            [disabled]="disabled"
            [error]="error"
            [focus]="focus"
            [id]="id"
            [label]="label"
            [max]="max"
            [name]="name"
            [placeholder]="placeholder"
            [readonly]="readonly"
            [resizable]="resizable"
            [rows]="rows"
            (onBlur)="onBlur($event)"
            (onChange)="onChange($event)"
            (onFocus)="onFocus($event)"
            (onKeyDown)="onKeyDown($event)"
            (onKeyPress)="onKeyPress($event)"
            (onKeyUp)="onKeyUp($event)"
        ></sebng-textArea>
    `,
})
class TextAreaTestComponent {
    className?: string;
    cols?: number;
    disabled?: boolean;
    error?: string;
    focus?: boolean;
    id?: string;
    label?: string;
    max?: number;
    name: string;
    placeholder?: string;
    readonly?: boolean;
    resizable?: boolean;
    rows?: number;
    value: string;

    onBlur() {}
    onChange() {}
    onFocus() {}
    onKeyDown() {}
    onKeyPress() {}
    onKeyUp() {}
}

describe("PaginationComponent", () => {
    let component: TextAreaTestComponent;
    let fixture: ComponentFixture<TextAreaTestComponent>;
    let onChange: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [TextAreaTestComponent, TextAreaComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextAreaTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("Should pass custom class", () => {
        const className: string = "myTextareaClass";
        component.className = className;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css(`.${className}`))).toBeTruthy();
    });

    it("Should pass id", () => {
        const id: string = "myTextareaId";
        component.id = id;

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css(`#${id}`)).length).toBeTruthy();
        component.label = "test label";

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("textarea")).nativeElement.attributes.id).toBeTruthy();
    });

    it("Should fire change event", () => {
        onChange = spyOn(component, "onChange");
        const event = new KeyboardEvent("change", {
            view: window,
            bubbles: true,
            cancelable: true,
        });

        console.log("Tada here ", fixture.debugElement.query(By.css("textarea")).nativeElement);
        fixture.debugElement.query(By.css("textarea")).nativeElement.dispatchEvent(event);
        expect(onChange).toHaveBeenCalled();
    });

    it("Should render label and error", () => {
        const error: string = "some error";
        const label: string = "some label";
        component.error = error;
        component.label = label;

        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css("label")).length).toBe(1);
        expect(fixture.debugElement.query(By.css("label")).nativeElement.textContent).toContain(label);
        expect(fixture.debugElement.queryAll(By.css(".alert")).length).toBe(1);
        expect(fixture.debugElement.query(By.css(".input-field.has-error"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css(".alert-danger")).nativeElement.textContent).toContain(error);
    });

    it("Should render textarea with resizable option", () => {
        expect(fixture.debugElement.query(By.css("textarea.resizable"))).toBeTruthy();
        component.resizable = true;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("textarea.resizable"))).toBeTruthy();
        component.resizable = false;

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("textarea.resiable"))).toBeFalsy();
    });
    describe("Testing optional events", () => {
        let onKeyDown: jasmine.Spy;
        let onKeyPress: jasmine.Spy;
        let onFocus: jasmine.Spy;
        let onBlur: jasmine.Spy;
        let onKeyUp: jasmine.Spy;
        beforeAll(() => {
            component.name = "myTextarea";
            onKeyDown = spyOn(component, "onKeyDown");

            onKeyUp = spyOn(component, "onKeyUp");
            onKeyPress = spyOn(component, "onKeyPress");
            onFocus = spyOn(component, "onFocus");
            onBlur = spyOn(component, "onBlur");

            fixture.detectChanges();

            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new KeyboardEvent("keydown"));

            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new KeyboardEvent("keyup"));
            fixture.debugElement
                .query(By.css(".form-control"))
                .nativeElement.dispatchEvent(new KeyboardEvent("keypress", { key: "a", code: "65" }));
            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new MouseEvent("focus"));
            fixture.debugElement.query(By.css(".form-control")).nativeElement.dispatchEvent(new MouseEvent("blur"));
        });

        it("KeyDown", () => expect(onKeyDown).toHaveBeenCalled());
        it("KeyUp", () => expect(onKeyUp).toHaveBeenCalled());
        it("KeyPress", () => expect(onKeyPress).toHaveBeenCalled());
        it("Focus", () => expect(onFocus).toHaveBeenCalled());
        it("Blur", () => expect(onBlur).toHaveBeenCalled());
    });
});
// import * as React from "react";
// import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
// import { TextArea, TextAreaProps } from "./TextArea";

// describe("Component: TextArea", () => {
//     const props: TextAreaProps = {
//         name: "myTextarea",
//         value: "wer",
//         onChange: jest.fn(),
//     };
//     let wrapper: ShallowWrapper<TextAreaProps>;

//     beforeEach(() => {
//         wrapper = shallow(<TextArea {...props} />);
//     });

//     it("Should render", () => {
//         expect(wrapper).toBeDefined();
//     });

//     it("Should pass custom class", () => {
//         const className: string = "myTextareaClass";
//         wrapper.setProps({ className });
//         expect(wrapper.hasClass(className)).toBeTruthy();
//     });

//     it("Should pass id", () => {
//         const id: string = "myTextareaId";
//         let mountedWrapper: ReactWrapper<TextAreaProps>;
//         mountedWrapper = mount(<TextArea {...props} id={id} />);
//         expect(mountedWrapper.find(`#${id}`).length).toBeTruthy();
//         mountedWrapper = mount(<TextArea {...props} label="test label" />);
//         expect(mountedWrapper.find("textarea").getElement().props.id).toBeTruthy();
//     });

//     it("Should fire change event", () => {
//         wrapper.find("textarea").simulate("change", { target: { value: "test" } });
//         expect(props.onChange).toBeCalledWith({ target: { value: "test" } });
//     });

//     it("Should render label and error", () => {
//         const error: string = "some error";
//         const label: string = "some label";
//         wrapper.setProps({ error, label });
//         expect(wrapper.find("label").length).toBe(1);
//         expect(wrapper.find("label").text()).toEqual(label);
//         expect(wrapper.find(".alert").length).toBe(1);
//         expect(wrapper.find(".input-field").hasClass("has-error")).toBeTruthy();
//         expect(wrapper.find(".alert-danger").text()).toEqual(error);
//     });

//     it("Should render textarea with resizable option", () => {
//         expect(wrapper.find("textarea").hasClass("resizable")).toBeTruthy();
//         wrapper.setProps({ resizable: true });
//         expect(wrapper.find("textarea").hasClass("resizable")).toBeTruthy();
//         wrapper.setProps({ resizable: false });
//         expect(wrapper.find("textarea").hasClass("resizable")).toBeFalsy();
//     });

//     describe("Testing optional event listners:", () => {
//         const eventListeners = {
//             onKeyDown: jest.fn(),
//             onKeyUp: jest.fn(),
//             onKeyPress: jest.fn(),
//             onFocus: jest.fn(),
//             onBlur: jest.fn(),
//         };
//         const mountedWrapper: ReactWrapper<TextAreaProps> = mount(<TextArea {...props} {...eventListeners} />);
//         const testCases: Array<[keyof WindowEventMap, keyof TextAreaProps]> = [
//             ["keydown", "onKeyDown"],
//             ["keyup", "onKeyUp"],
//             ["keypress", "onKeyPress"],
//             ["focus", "onFocus"],
//             ["blur", "onBlur"],
//         ];
//         testCases.map((testCase: [keyof WindowEventMap, keyof TextAreaProps]) => {
//             const [type, action] = testCase;
//             test(action, () => {
//                 const mock: jest.Mock = jest.fn();
//                 mountedWrapper.setProps({ [action]: mock } as any);
//                 mountedWrapper.find(".form-control").simulate(type, { key: "a", keyCode: 65 });
//                 expect(mock).toBeCalled();
//             });
//         });
//     });
// });
