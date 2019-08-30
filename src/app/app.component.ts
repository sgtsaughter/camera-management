import { Component, OnInit } from '@angular/core';

import { CameraAssignmentService } from './services/camera-assignment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'camera-mangement';
  currentAssignments:any;
  currentCameras: any;
  currentVehicles: any;

  constructor(private cameraAssignmentService: CameraAssignmentService) {
  }

  ngOnInit(): void {
    this.cameraAssignmentService.getCameraAssignments().subscribe((res) => {
      this.currentAssignments = res;
    });

    this.cameraAssignmentService.getVehicles().subscribe((res) => {
      this.currentVehicles = res;
    });

    this.cameraAssignmentService.getCameras().subscribe((res) => {
      this.currentCameras = res;
    });

  }

}
