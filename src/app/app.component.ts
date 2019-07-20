import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   ngOnInit() {
      window.addEventListener('deviceorientation', function(event) {
         console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
      });
   }

}
