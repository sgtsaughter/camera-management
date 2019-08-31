import { Component, OnInit } from '@angular/core';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CameraAssignment, Vehicle, Camera } from '../../interfaces/camera-assignment.interface';

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
    this.cameraAssignmentService.getCameraAssignments().subscribe((res: any) => {
      this.currentAssignments = res;

      // Mapping Current Assignment's vehicle ids with vehicle names.
      // In a real world situation I would have asked the backend team to supply the vehicle name for all Current Assignments.
      this.currentAssignments.map(assignment => {
        this.currentVehicles.forEach(element => {
          if (element.id === assignment.vehicleId) {
            assignment.vehicleName = element.name;
          }
        });
      });

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
