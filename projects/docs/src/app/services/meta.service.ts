import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Meta } from "@angular/platform-browser";
import { metaConfigs } from "@configs";

@Injectable({
    providedIn: "root",
})
export class MetaService {
    constructor(@Inject(DOCUMENT) private dom, private meta: Meta) {}

    initMetaConfiguration(): void {
        this.setCanonicalURL();
        this.setCommonMetaTag();
    }

    setCanonicalURL(url?: string): void {
        const canURL = url === undefined ? this.dom.URL : url;
        const link: HTMLLinkElement = this.dom.createElement("link");
        link.setAttribute("rel", "canonical");
        this.dom.head.appendChild(link);
        link.setAttribute("href", canURL);
    }

    setCommonMetaTag(): void {
        this.meta.addTags([
            { name: "keywords", content: metaConfigs.keywords },
            { name: "description", content: metaConfigs.description },
            { name: "robots", content: "index, follow" },
            // Facebook open graph
            { name: "og:url", content: metaConfigs.siteUrl },
            { name: "og:type", content: "website" },
            { name: "og:title", content: metaConfigs.title },
            { name: "og:site_name", content: metaConfigs.title },
            { name: "og:locale", content: "en_US" },
            { name: "og:description", content: metaConfigs.description },
            { name: "og:image", content: metaConfigs.sitePreviewImageUrl },
            { name: "og:image:secure_url", content: metaConfigs.sitePreviewImageUrl },
            { name: "og:image:type", content: "image/png" },
            { name: "og:image:width", content: "1339" },
            { name: "og:image:height", content: "943" },
            // Twitter card
            { name: "twitter:card", content: "summary" },
            { name: "twitter:title", content: metaConfigs.title },
            { name: "twitter:description", content: metaConfigs.description },
            { name: "twitter:image", content: metaConfigs.sitePreviewImageUrl },
        ]);
    }
}
