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
            let heading  = 360 - event.alpha; //heading [0, 360)
            document.getElementById("heading").innerHTML = heading.toFixed(0);
            document.getElementById("little-hand").style.filter = "invert(55%) sepia(82%) saturate(5350%) hue-rotate(262deg) brightness(62%) contrast(105%)";
            // 180
            if ((heading > 115 && heading < 174) || (heading  > 186 && heading < 240 )){ // [116, 139] || [188, 239] Allow +- 5 degree
               document.getElementById("outer-ring").style.filter = "invert(52%) sepia(45%) saturate(6515%) hue-rotate(243deg) brightness(98%) contrast(105%)"; // light purple
            } else if (heading > 174 && heading < 186){ // [175, 185] Allow +- 5 degree
               document.body.style.backgroundColor = "#7624a0";
               document.getElementById("heading").innerHTML = "S"; // South // [115 - 245]
               document.getElementById("perfect").innerHTML = "Perfect!";
               document.getElementById("perfect").style.top = "380px";
               document.getElementById("outer-ring").style.filter = "invert(55%) sepia(82%) saturate(5350%) hue-rotate(262deg) brightness(62%) contrast(105%)";
            } else { // Otherwise, use near black
               document.body.style.backgroundColor = "#161616";
               document.getElementById("outer-ring").style.filter = "grayscale(1)";
               document.getElementById("perfect").innerHTML = "";
            }
            document.getElementById("little-hand").style.webkitTransform = 'rotateZ(' + heading.toFixed(0) + 'deg) translate(0px, 43px)';
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
   

