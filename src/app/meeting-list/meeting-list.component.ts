import { Component, OnInit, HostBinding, Input, Output } from '@angular/core';
import { MeetingListService} from '../meeting-list.service';
import { formats, Meeting } from './meeting';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
  animations: [trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100%)' }),
      animate(".6s  ease-out")
    ]),
    transition('* => void', [
      animate(500, style({ transform: 'translateX(100%)' }))
    ])
  ])]
})
export class MeetingListComponent implements OnInit {
  meetingList: Meeting[] = [];
  dayOfWeek = [{d: '1', text: 'Sun', ltext: 'Sunday'},{d: '2', text: 'Mon', ltext: 'Monday'},{d: '3', text: 'Tue', ltext: 'Tuesday'},{d: '4', text: 'Wed', ltext: 'Wednesday'},{d: '5', text: 'Thr', ltext: 'Thursday'},{d: '6', text: 'Fri', ltext: 'Friday'},{d: '7', text: 'Sat', ltext: 'Saturday'}];
  darkmode = true;
  dow = new Date;
  wd = this.dow.getDay();
  day: string = this.dayOfWeek[this.wd].d;
  mode = 'light';
 @HostBinding('class') className = '';
  position = {lat:40.067419, long: -75.5668862}; //40.067419long: -75.5668862


  meetingObserver = {
    next: (meeting: Meeting[])  => {
      this.meetingList = meeting;
    },
    // error: (err: Error) => console.error('Observer got an error: ' + err),
    // complete: () => console.log('Observer got a complete notification'),
  };

  modeObserver = {
    next: (v:boolean) => {
      this.className = (v === true ? 'light' : 'dark');
     }
  }

  constructor(meetings: MeetingListService) {
    this.className = meetings.isDarkMode() === true ? 'light' : 'dark';
    meetings.subject.subscribe(this.modeObserver);
    meetings.getMeetings().subscribe(this.meetingObserver);
  }

  startTime(t: string, d: string) {
    let a  = t.split(":");
    let b = d.split(":");
    let st = Number(a[0]) * 60 + Number(a[1]);
    let et = Number(b[0]) * 60 + Number(b[1]);
    return this.formatTime(st) + " - " + this.formatTime(st+et);
   }

   formatTime(time: number)
   {
    let h = Math.floor(time/60)  % 12;
    h = (h === 0 ? 12 : h);
    let mt = ("00" + h).slice(-2) + ":";
    mt += ("00" + time%60).slice(-2) + (time % 1440 < 720 ? " am" : " pm");
    return mt;
   }
  ngOnInit(): void {
    // get geo location

  }

  getDistance(lat1: string, lat2: string, lon1: string, lon2: string)
  {

  const l1 =  Number(lon1) * Math.PI / 180;
  const l2 = Number(lon2) * Math.PI / 180;
  const la1 = Number(lat1) * Math.PI / 180;
  const la2 = Number(lat2) * Math.PI / 180;

  // Haversine formula
  let dlon = l2 - l1;
  let dlat = la2 - la1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
  + Math.cos(la1) * Math.cos(la2)
  * Math.pow(Math.sin(dlon / 2),2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 3956;

  // calculate the result
  return( (c * r).toFixed(1));
  }

}



