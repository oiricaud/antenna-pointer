import {Component, OnInit} from '@angular/core';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

   ngOnInit() {
      let magSensor = new Magnetometer({frequency: 60});

      magSensor.addEventListener('reading', e => {
         console.log("Magnetic field along the X-axis " + magSensor.x);
         console.log("Magnetic field along the Y-axis " + magSensor.y);
         console.log("Magnetic field along the Z-axis " + magSensor.z);
      })
      magSensor.addEventListener('error', event => {
         console.log(event.error.name, event.error.message);
      })
      magSensor.start();
   }

}
