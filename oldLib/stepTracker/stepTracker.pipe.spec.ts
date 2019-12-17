import { SafeHtmlPipe } from "./stepTracker.pipe";
import { DomSanitizer, BrowserModule } from "@angular/platform-browser";
import { TestBed, inject, async } from "@angular/core/testing";

const htmlStr = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`;

describe("pipe: SafeHtmlPipe", () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule],
        }).compileComponents().then(() => {

        });
    }));

    it("create an instance", inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
        const pipe = new SafeHtmlPipe(domSanitizer);
        const returnValMock = spyOn(pipe, "transform").and.returnValue(htmlStr);
        pipe.transform(htmlStr);
        expect(pipe).toBeTruthy();
        const returnVal = returnValMock(htmlStr);
        expect(returnValMock).toHaveBeenCalled();
        expect(returnVal).toEqual(htmlStr);
    }));

});
