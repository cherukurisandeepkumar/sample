import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; 
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'angular-app';

  constructor(private bnIdle: BnNgIdleService, private router: Router) {}

  ngOnInit(): void {
    this.bnIdle.startWatching(10800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

}

