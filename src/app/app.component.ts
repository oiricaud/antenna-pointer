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
            var inputElement = document.getElementById('a'); // z axis [0, 360]
            var inputElement2 = document.getElementById('b'); //x axis [-180, 180]
            var inputElement3 = document.getElementById('c'); // y axis [-90, 90]

            var heading  = 360 - event.alpha; //heading [0, 360)

            inputElement.textContent = JSON.stringify(event.alpha);
            inputElement2.textContent = JSON.stringify(event.beta);
            inputElement3.textContent = JSON.stringify(event.gamma);

            document.getElementById("heading").innerHTML = heading.toFixed();

            if (heading > 359 || heading < 1) { //Allow +- 1 degree
               document.body.style.backgroundColor = "green";
               document.getElementById("heading").innerHTML = "N"; // North
            }
            else if (heading > 179 && heading < 181){ //Allow +- 1 degree
               document.body.style.backgroundColor = "green";
               document.getElementById("heading").innerHTML = "S"; // South
            } else { // Otherwise, use near black
               document.body.style.backgroundColor = "#161616";
            }
         }, false);
   }
}
   

