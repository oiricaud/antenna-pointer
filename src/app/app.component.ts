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

            if (heading > 355 || heading < 5) { //Allow +- 5 degree
               document.body.style.backgroundColor = "#9013FE";
               document.getElementById("heading").innerHTML = "N"; // North
               document.getElementById("perfect").innerHTML = "Perfect!";
            }
            else if (heading > 174 && heading < 186){ //Allow +- 5 degree
               document.body.style.backgroundColor = "#9013FE";
               document.getElementById("heading").innerHTML = "S"; // South
            } else { // Otherwise, use near black
               document.body.style.backgroundColor = "#161616";
            }

            let temp: string = "";
            let degrees: number = 280;
            temp = 'rotateZ(' + heading.toFixed(0) + 'deg) translate(0px, 43px)';
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
   

