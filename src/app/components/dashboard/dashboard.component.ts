import { Component, OnInit } from '@angular/core';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentAssignments:any;
  currentCameras: any;
  currentVehicles: any;
  displayedColumns: string[] = ['id', 'cameraId', 'vehicleId', 'DateCreated', 'Deleted'];

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

    this.cameraAssignmentService.getVehicles().subscribe((res) => {
      this.currentVehicles = res;
    });

    this.cameraAssignmentService.getCameras().subscribe((res) => {
      this.currentCameras = res;
    });

    this.getAllAssignments();
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
