import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Meeting } from './meeting-list/meeting';



@Injectable({
  providedIn: 'root'
})
export class MeetingListService {

  localUrl = 'assets/meetings.json';
  darkmode = false;
  subject = new Subject<boolean>();
  private readonly meetingData$ : Observable<Meeting[]>;



  constructor(private http: HttpClient,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.meetingData$ = this.getStaticData<Meeting[]>(this.localUrl);
    }

  // Query root server for all meetings in area 18 (Clean Acres) + Used formats in json
  // https://meetings.naworks.org/client_interface/json/?switcher=GetSearchResults&get_used_formats=1&services=18"
  // data is retrieved and saved in meetings.json

  getStaticData<T>(url: string) : Observable <T> {
    console.log("api endpoint called");
    return this.http.get<T>(url).pipe(shareReplay(1));
  }

  getMeetings() {
    console.log("Meetings data")
    return this.meetingData$;
  }

  init() {
    this.matIconRegistry.addSvgIcon(
      `nalogo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'calogo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/calogo.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'read',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/read.svg')
    );

  }


  isDarkMode() {
    return this.darkmode;
  }

  setMode(darkmode: boolean) {
    this.darkmode = darkmode;
    this.subject.next(this.darkmode);
  }


}
