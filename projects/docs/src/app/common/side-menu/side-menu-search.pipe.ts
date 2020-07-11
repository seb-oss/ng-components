import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "searched",
})
export class SideMenuSearchPipe implements PipeTransform {
    transform(list: ComponentsListItem[], keyword: string): ComponentsListItem[] {
        if (keyword?.length) {
            return list.filter(item => item.name.toLowerCase().search(escape(keyword).toLowerCase()) > -1);
        } else {
            return list;
        }
    }
}
