import {Component, OnInit} from '@angular/core';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

   currentSlide: number;

   constructor() {
      this.currentSlide = 0;
   }
   ngOnInit() {
      window.addEventListener('deviceorientation',
         function(event) {

            var heading  = 360 - event.alpha; //heading [0, 360)

            document.getElementById("heading").innerHTML = heading.toFixed(0);

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

            let temp: string = "";
            let degrees: number = 280;
            temp = 'rotate(' + heading.toFixed(0) + 'deg)';
            document.getElementById("little-hand").style.webkitTransform = temp;

         }, false);
   }

   nextSlide() {
      if (this.currentSlide === 0) {
         this.setCurrentSlide(1);
         setTimeout(() => {
            this.setCurrentSlide(2);
         }, 2*1000);
         console.log('after time out ' + this.currentSlide);
      } else {
         console.log('else ' + this.currentSlide++);
         this.setCurrentSlide(this.currentSlide++);
      }
   }
   public setCurrentSlide(slide: number) {
      this.currentSlide = slide;
   }
   getCurrentSlide(): number {
      return this.currentSlide;
   }
}
   

