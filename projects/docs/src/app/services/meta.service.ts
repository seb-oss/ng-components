import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { metaConfigs } from "@configs";

@Injectable({
    providedIn: "root",
})
export class MetaService {
    constructor(private meta: Meta) {}

    initMetaConfiguration(): void {
        this.setCanonicalURL();
        this.setCommonMetaTag();
        this.setJsonLD();
    }

    setCanonicalURL(url?: string): void {
        const canonicalUrl: string = url === undefined ? document.URL : url;
        const link: HTMLLinkElement = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
        link.setAttribute("href", canonicalUrl);
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

    setJsonLD(): void {
        const script: HTMLScriptElement = document.createElement("script");
        script.type = "application/json+ld";
        script.text = JSON.stringify(metaConfigs.jsonLD);
        document.head.appendChild(script);
    }
}
