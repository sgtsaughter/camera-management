import { Component, OnInit } from '@angular/core';
import { CameraAssignmentService } from '../../services/camera-assignment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentAssignments:any;
  currentCameras: any;
  currentVehicles: any;

  // Hardcoded mock data to simulate creation data.
  newAssignment = {
    id: 19999,
    cameraId: 9999,
    vehicleId: 1,
    DateCreated: 1567181591135,
    Deleted: true,
  };

  constructor(private cameraAssignmentService: CameraAssignmentService) {
  }

  ngOnInit(): void {
    this.getAllAssignments();

    this.cameraAssignmentService.getVehicles().subscribe((res) => {
      this.currentVehicles = res;
    });

    this.cameraAssignmentService.getCameras().subscribe((res) => {
      this.currentCameras = res;
    });

  }

  getAllAssignments() {
    this.cameraAssignmentService.getCameraAssignments().subscribe((res) => {
      this.currentAssignments = res;
    });
  }

  createAssignment(data) {
    this.cameraAssignmentService.addCameraAssignments(this.newAssignment).subscribe(data=>{
      console.log('create assignment', data);
      if (data.body !== null) {
        this.getAllAssignments();
      }
    });
  }

  deleteAssignment(assignmentId) {
    this.cameraAssignmentService.deleteAssignment(assignmentId).subscribe( data => {
      console.log('Delete Assignment', data);
      this.getAllAssignments();
    });
  }

}
