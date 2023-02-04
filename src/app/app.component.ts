
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, HostBinding, OnDestroy} from '@angular/core';

import { MeetingListService } from './meeting-list.service';
import { routeTransitionAnimations } from './route-transition-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent {
  title = 'cleanAcres';
  mobileQuery: MediaQueryList;
  @HostBinding('class') className = '';
  checked = false;
  theme: MeetingListService;


  fillerNav = Array.from({length: 2}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, theme: MeetingListService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", this._mobileQueryListener);
    this.theme = theme;
    this.className = theme.isDarkMode() === true ? "darkMode" : "lightMode";
    this.theme.init();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
   }

  toggleControl (cmode:string) {
    this.className = cmode;
        this.theme.setMode(cmode === 'darkMode');
  }

  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }
}


