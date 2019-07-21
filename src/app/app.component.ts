import {Component, OnInit} from '@angular/core';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   c = 0;
   myVariable: any;

   ngOnInit() {
      this.deviceOrientationListener(window);
      let rollValue;

      window.addEventListener('deviceorientation',
         function(event) {
            var a = event.alpha;
            var b = event.beta;
            var g = event.gamma;
            rollValue = event.gamma;
      }, false);
      this.c = rollValue;
   }



   deviceOrientationListener(event) {
      this.c = event.gamma;
      console.log('event.gamma ' + event.gamma);
   }
}
   

