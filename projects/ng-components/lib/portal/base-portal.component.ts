export interface PortalWrapper<T = any> {
    hasAttached(): boolean;
    attach(portal: BasePortal<T>): T;
    detach(): void;
}

export abstract class BasePortal<T> {
    private _host: PortalWrapper;
    private _hostElement: HTMLDivElement;

    attach(host: PortalWrapper<T>): T {
        if (host === null) {
            throw new Error("Not able to attach to null");
        } else if (host.hasAttached()) {
            throw new Error("Host has another portal attached already!");
        }
        this._host = host;
        return host.attach(this);
    }

    detach(): void {
        if (this._host === null) {
            throw new Error("No host detected");
        } else {
            this._host.detach();
            this._host = null;
        }
    }

    get isAttached(): boolean {
        return !!this._host;
    }

    setHost(host: PortalWrapper): void {
        this._host = host;
    }

    getHost(hostId?: string): HTMLDivElement {
        return this._hostElement || this.createHost(hostId);
    }

    createHost(hostId?: string): HTMLDivElement {
        let outletElement: HTMLDivElement = document.querySelector(`#${hostId}`);
        if (!outletElement) {
            const newDivElement: HTMLDivElement = document.createElement("div");
            document.body.append(newDivElement);
            outletElement = newDivElement;
        }
        this._hostElement = outletElement;
        return this._hostElement;
    }
}
