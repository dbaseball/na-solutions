import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

@Component({
  selector: 'app-zoom-component',
  templateUrl: './zoom-component.component.html',
  styleUrls: ['./zoom-component.component.scss']

})

export class ZoomComponentComponent implements OnInit {

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  signatureEndpoint = 'http://localhost:4000';
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  sdkKey = 'KIfIr9OjkpCF9n2vXI6PUR2uUeDxj6XZ7Yng';
  meetingNumber = '2954767645'; //' 76009535351';
  role = 0;
  userName = 'Bob Mc';
  userEmail = 'rjmcgowan101.gmail.com';
  passWord = '0CE6y2'; //'NZ5r0k';
    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/component-view/webinars#join-registered
  registrantToken = '';

  client = ZoomMtgEmbedded.createClient();


  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document:any) {

  }

  ngOnInit() {
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    this.client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });
  }

  getSignature() {
    this.httpClient.post(this.signatureEndpoint, {
	    meetingNumber: this.meetingNumber,
	    role: this.role
    }).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.startMeeting(data.signature)
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  startMeeting(signature: any) {

    this.client.join({
    	sdkKey: this.sdkKey,
    	signature: signature,
    	meetingNumber: this.meetingNumber,
    	password: this.passWord,
    	userName: this.userName,
      userEmail: this.userEmail,
      tk: this.registrantToken
    })
  }
}

