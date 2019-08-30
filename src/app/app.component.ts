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

  constructor(private cameraAssignmentService: CameraAssignmentService) {
  }

  ngOnInit(): void {
    this.cameraAssignmentService.getHeroes().subscribe((res) => {
      this.currentAssignments = res;
    });
  }

}
