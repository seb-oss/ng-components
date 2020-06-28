import { Pipe, PipeTransform } from "@angular/core";
import { LoaderSize, LoaderType } from "./loader.component";

@Pipe({ name: "loaderClasses" })
export class LoaderClassesPipe implements PipeTransform {
    transform(size: LoaderSize, cover: boolean, fullscreen: boolean, type: LoaderType, backdrop: boolean) {
        return {
            rc: true,
            loader: true,
            "loader-cover": cover,
            "loader-fullscreen": fullscreen && !cover,
            "loader-backdrop": backdrop,
            [`loader-${size}`]: size,
            [`loader-${type}`]: type,
        };
    }
}
