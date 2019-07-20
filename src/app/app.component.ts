import {Component, OnInit} from '@angular/core';



@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   a: any;
   b: any;
   c: any;
   constructor() {

   }
   ngOnInit() {
      console.log('here1');
      window.addEventListener('deviceorientation', function(event) {
         console.log('here');
         //alpha  = event.alpha;
         //beta = event.beta;
        // gamma = event.gamma;
         //a = event.alpha;
         window.alert(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
      });
   }

}
