import {Component, OnInit} from '@angular/core';


declare const window: any;


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

   a: number = 0;
   b: number = 0;
   c: number = 0;
   constructor() {

   }
   ngOnInit() {
      window.addEventListener('deviceorientation',

         function(event ): any {
            console.log('here' );
            this.a = Math.round(event.alpha); // ok now
            this.b = Math.round(event.beta); // ok now
            this.c = Math.round(event.gamma); // ok now

            console.window(event.alpha + event.beta + event.gamma);
         });

   }

   ngOnChanges() {

   }

}
