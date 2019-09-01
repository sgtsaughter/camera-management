import { Component, OnInit } from '@angular/core';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CameraAssignment, Vehicle, Camera } from '../../interfaces/camera-assignment.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UtilityDialogComponent } from '../utility-dialog/utility-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentAssignments: CameraAssignment[];
  currentCameras: Camera[];
  currentVehicles: Vehicle[];
  displayedColumns: string[] = ['id', 'cameraId', 'vehicleId', 'DateCreated', 'Deleted', 'Delete'];

  // Hardcoded mock data to simulate creation data.
  newAssignment = {
    id: 19999,
    cameraId: 9999,
    vehicleId: 1,
    DateCreated: 1567181591135,
    Deleted: true,
  };

  constructor(private cameraAssignmentService: CameraAssignmentService, public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.cameraAssignmentService.getVehicles().subscribe((res: Vehicle[]) => {
      this.currentVehicles = res;
    });

    this.cameraAssignmentService.getCameras().subscribe((res: Camera[]) => {
      this.currentCameras = res;
    });

    this.getAllAssignments();
  }

  getAllAssignments() {
    this.cameraAssignmentService.getCameraAssignments().subscribe((res: CameraAssignment[]) => {
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
    this.cameraAssignmentService.addCameraAssignments(data).subscribe(data=>{
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

  openDialog(): void {
    const dialogRef = this.dialog.open(UtilityDialogComponent, {
      width: '750px',
      data: {vehicles: this.currentVehicles, cameras: this.currentCameras}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        result.DateCreated = new Date();
        result.id = Math.floor((Math.random() * 100) + 1);
        result.Deleted = false;

        this.createAssignment(result);
      }
      console.log('The dialog was closed');
    });
  }

}
