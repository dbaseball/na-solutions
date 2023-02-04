import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { ZoomComponentComponent } from './zoom-component/zoom-component.component';

const routes: Routes = [
  {path: 'home-page',
  component: HomePageComponent,
  data: {animationState: 'home-page'}
  },
  {path: 'meeting-page',
  component: MeetingListComponent,
  data: {animationState: 'meeting-page'}
  },

  {path: 'zoom-page',
  component: ZoomComponentComponent,
  data: {animationState: 'zoom-page'}
  },
  {path: '', redirectTo: 'home-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
