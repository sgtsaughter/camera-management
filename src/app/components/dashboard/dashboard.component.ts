import { Component, OnInit } from '@angular/core';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CameraAssignment, Vehicle, Camera } from '../../interfaces/camera-assignment.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UtilityDialogComponent } from '../utility-dialog/utility-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private readonly notifier: NotifierService;

  currentAssignments: CameraAssignment[];
  currentCameras: Camera[];
  currentVehicles: Vehicle[];
  displayedColumns: string[] = ['id', 'cameraId', 'vehicleId', 'DateCreated', 'Deleted', 'Delete'];
  dataSource: any;

  constructor(notifierService: NotifierService, private cameraAssignmentService: CameraAssignmentService, public dialog: MatDialog) {
    this.notifier = notifierService;
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

      // Mapping Current Assignment's vehicle ids with vehicle names and camera ids with device numbers.
      // In a real world situation I would have asked the backend team to supply the vehicle names
      // and device numbers for all Current Assignments.
      this.currentAssignments.map(assignment => {
        this.currentVehicles.forEach(element => {
          if (element.id === assignment.vehicleId) {
            assignment.vehicleName = element.name;
          }
        });
        this.currentCameras.forEach(element => {
          if (element.id === assignment.cameraId) {
            assignment.deviceNumber = element.deviceNumber;
          }
        });

      });

      // Set dataSource to build table and filter.
      this.dataSource = new MatTableDataSource(this.currentAssignments);

      // Only filter by vehicleName and deviceNumber on the table.
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.vehicleName.toLowerCase().includes(filter) || data.deviceNumber.toLowerCase().includes(filter);
      };

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
      this.notifier.notify( 'warning', `Assignment ${assignmentId} Successfully Deleted.`);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UtilityDialogComponent, {
      width: '750px',
      data: { vehicles: this.currentVehicles, cameras: this.currentCameras, assignments: this.currentAssignments }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        result.DateCreated = new Date(); // Normally backend would generate timestamp .
        result.id = Math.floor((Math.random() * 100) + 1); // Normally backend would generate id.
        result.Deleted = false;

        this.createAssignment(result);
      }
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
