import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MeetingListService } from '../meeting-list.service';

@Component({
  selector: 'app-theme-mode',
  templateUrl: './theme-mode.component.html',
  styleUrls: ['./theme-mode.component.scss']
})
export class ThemeModeComponent implements OnInit {
  title = "Switch to dark mode";
  icon = "bedtime";  // brightness_5
  @Output() changeThemeEvent = new EventEmitter<string>();

  constructor(mode: MeetingListService) {
    this.icon = mode.isDarkMode() === true ? 'brightness_7' : 'bedtime';
    this.title = mode.isDarkMode() === true ? 'Switch to light mode' : 'Swtch to dark mode';
   }

  ngOnInit(): void {

  }

  toggle () {
    this.icon = this.icon === "bedtime" ? "brightness_7" : "bedtime";
    this.title = this.icon === "bedtime" ? "Switch to dark mode" : "Switch to light mode";
    this.changeThemeEvent.emit((this.icon === "bedtime" ? "lightMode" : "darkMode"));

  }

}
