import {Component, OnInit} from '@angular/core';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

   constructor() {

   }
   ngOnInit() {
      window.addEventListener('deviceorientation', function(event) {
         window.alert(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
      });
   }
}
