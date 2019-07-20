import {Component, OnInit} from '@angular/core';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

   deviceOirentation: DeviceOrientationEvent;
   a: any = 0;
   b: any = 0;
   c: any = 0;
   ngOnInit() {
      try {
         this.a = this.deviceOirentation.alpha;
         this.b = this.deviceOirentation.beta;
         this.c = this.deviceOirentation.gamma
      } catch(e) {
         console.log(e);
      }
   }
}
   

