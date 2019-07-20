import {Component, OnInit} from '@angular/core';


declare const window: any;


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

   a: number;
   b: number;
   c: number;
   constructor() {

   }
   ngOnInit() {
      window.addEventListener('deviceorientation',

         function(event ): any {
            console.log('here' );
            this.a = Math.round(event.alpha); // ok now
            this.b = Math.round(event.beta); // ok now
            this.c = Math.round(event.gamma); // ok now

            //alpha  = event.alpha;
            //beta = event.beta;
            // gamma = event.gamma;
            //this.alpha = a;
            //a = event.alpha;
            // this.a = event.gamma.toLocaleString();
            //window.alert(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
            return event.alpha + event.beta + event.gamma;
         });

   }

   ngOnChanges() {

   }

}
