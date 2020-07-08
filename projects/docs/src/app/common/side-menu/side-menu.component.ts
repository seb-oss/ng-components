import { Component, OnInit } from "@angular/core";
import { urls } from "../../../configs";

const SIDE_MENU_STORAGE_KEY = "";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
  urls: NavsURLs = urls;
  // isMobile: boolean = useMediaQuery("(max-width: 420px)");
  isMobile: boolean = false;
  search: string = "";
  // toggle: boolean = JSON.parse(localStorage.getItem(SIDE_MENU_STORAGE_KEY));
  toggle: boolean = true;
  highlighted: number = -1;
  listRef: HTMLElement = null;
  inputFocus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
