import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  _mobileActiveMenu(menu) {
  
    if (menu.menuOpen === "open") {
      menu.menuOpen = "";
    } else {
      menu.menuOpen = "open";
    }
  }

}
