import {Component, OnInit} from '@angular/core';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

   ngOnInit() {
      window.addEventListener('deviceorientation',
         function(event) {
            window.alert('event.gamma ' + event.gamma);
            var inputElement = document.getElementById('a');
            var inputElement2 = document.getElementById('b');
            var inputElement3 = document.getElementById('c');
            inputElement.textContent = JSON.stringify(event.alpha);
            inputElement2.textContent = JSON.stringify(event.beta);
            inputElement3.textContent = JSON.stringify(event.gamma);
      }, false);
   }
}
   

