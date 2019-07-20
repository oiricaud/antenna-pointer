import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   alpha: any = 0;
   beta: any = 0;
   gamma: any = 0;
   ngOnInit() {
      window.addEventListener('deviceorientation', function(event) {
         this.alpha = event.alpha;
         this.beta = event.beta;
         this.gamma = event.gamma;
         console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
      });
   }

}
