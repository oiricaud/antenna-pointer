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
      let rollValue: number = 0;

      window.addEventListener('deviceorientation',
         function(event) {
            var a = event.alpha;
            var b = event.beta;
            var g = event.gamma;
            rollValue = event.gamma;
            window.alert('event.gamma ' + event.gamma);
            var inputElement = document.getElementById('a');

            var inputElement2 = document.getElementById('c');
            inputElement.textContent = JSON.stringify(event.gamma);
            inputElement2.textContent = "woop";

      }, false);
      this.c = rollValue;
   }
}
   

