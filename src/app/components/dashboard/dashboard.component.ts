import { Component, OnInit } from '@angular/core';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { MatTableDataSource } from '@angular/material';
import { CameraAssignment, Vehicle, Camera } from '../../interfaces/camera-assignment.interface';
import { MatDialog } from '@angular/material/dialog';
import { UtilityDialogComponent } from '../utility-dialog/utility-dialog.component';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';

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
  displayedColumns: string[] = ['id', 'cameraId', 'vehicleId', 'DateCreated', 'Deleted', 'Edit', 'Delete'];
  dataSource: any;
  editMode: boolean = false;
  editId: number;

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
        this.notifier.notify( 'success', 'Your assignment has been created' );
        this.getAllAssignments();
      }
    });
  }

  updateAssignment(data) {
    this.cameraAssignmentService.updateAssignment(data).subscribe(data=>{
      console.log('create assignment', data);
      this.notifier.notify( 'success', 'Your assignment has been edited' );
      this.getAllAssignments();
    });
  }

  editAssignment(assignmentId: number) {
    this.editMode = true;
    this.editId = assignmentId;
    this.openDialog();
  }

  deleteAssignment(assignmentId) {
    this.cameraAssignmentService.deleteAssignment(assignmentId).subscribe( data => {
      this.getAllAssignments();
      this.notifier.notify( 'warning', `Assignment ${assignmentId} Successfully Deleted.`);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UtilityDialogComponent, {
      width: '750px',
      data: {
        vehicles: this.currentVehicles,
        cameras: this.currentCameras,
        assignments: this.currentAssignments,
        editMode: this.editMode,
        editId: this.editId,
      }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result !== undefined) {
        // If we're in edit mode, call the update function, else call the create function.
        if (this.editMode) {
          // reset flag and id.
          this.editMode = false;
          this.editId = undefined;
          this.updateAssignment(result);
        } else {
          this.createAssignment(result);
        }
      } else {
        // reset flag and id just in case user closes an edit dialog with the 'X' button.
        this.editMode = false;
        this.editId = undefined;
      }
    });
  }

  // Filter for search functionality.
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
