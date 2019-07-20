import {Component, OnInit} from '@angular/core';


declare let alpha: any;
declare let beta: any;
declare let gamma: any;

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   constructor() {

   }
   ngOnInit() {
      console.log('here1');
      window.addEventListener('deviceorientation', function(event) {
         console.log('here');
         alpha  = event.alpha;
         beta = event.beta;
         gamma = event.gamma;
         console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
      });
   }

}
