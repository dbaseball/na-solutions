import { Component, OnInit, HostBinding } from '@angular/core';
import { MeetingListService } from '../meeting-list.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @HostBinding('class') className = '';


  modeObserver = {
    next: (v:boolean) => {
      this.className = (v === true ? 'light' : 'dark');
     }
  }

  constructor(meetings: MeetingListService) {
    this.className = meetings.isDarkMode() === true ? 'light' : 'dark';
    meetings.subject.subscribe(this.modeObserver);
  }

  ngOnInit(): void {
  }

}
