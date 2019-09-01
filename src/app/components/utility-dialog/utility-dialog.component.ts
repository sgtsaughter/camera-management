import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { CameraAssignment, Vehicle, Camera } from '../../interfaces/camera-assignment.interface';

@Component({
  selector: 'app-utility-dialog',
  templateUrl: './utility-dialog.component.html',
  styleUrls: ['./utility-dialog.component.css']
})
export class UtilityDialogComponent implements OnInit {

  private readonly notifier: NotifierService;
  assignmentByID;

  assignmentForm = new FormGroup({
    vehicleId: new FormControl(''),
    cameraId: new FormControl(''),
  });

  constructor(notifierService: NotifierService, public dialogRef: MatDialogRef<UtilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      // Disable Outside-close
      dialogRef.disableClose = true;
      this.notifier = notifierService;
    }

  ngOnInit() {
    console.log(this.data);
    if (this.data.editMode) {
      // Populate the form with the data from the editId.
      this.assignmentByID = this.data.assignments.filter(assignment => {
        return assignment.id === this.data.editId;
      });
      console.log(this.assignmentByID);
      this.assignmentForm.setValue({vehicleId: this.assignmentByID[0].vehicleId, cameraId: this.assignmentByID[0].cameraId });
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.assignmentForm.value);
    console.log(this.assignmentForm.value.cameraId)
    console.log(this.data.assignments);
    // If the user chose any currently assigned vehicles or cameras display an error,
    // else create a new assignment.
    const camerIdMatch = this.data.assignments.some(el => el.cameraId === this.assignmentForm.value.cameraId);
    const vehicleIdMatch = this.data.assignments.some(el => el.vehicleId === this.assignmentForm.value.vehicleId);

    if (camerIdMatch || vehicleIdMatch) {
      // TODO: There's probably a better way to write this logic.
      if (camerIdMatch && vehicleIdMatch) {
        this.notifier.notify( 'error', 'Sorry, you chose a vehicle and camera that is already assigned.' );
      }
      if (camerIdMatch && !vehicleIdMatch) {
        this.notifier.notify( 'error', 'Sorry, you chose a camera that is already assigned.' );
      }
      if (!camerIdMatch && vehicleIdMatch) {
        this.notifier.notify( 'error', 'Sorry, you chose a vehicle that is already assigned.' );
      }
    } else {
      if (!this.data.editMode) {
        let result = {
          DateCreated : new Date(), // Normally backend would generate date.
          id:  Math.floor((Math.random() * 100) + 1), // Normally backend would generate id.
          Deleted: false,
          vehicleId: this.assignmentForm.get('vehicleId').value,
          cameraId: this.assignmentForm.get('cameraId').value
        };

        this.dialogRef.close(result);
        this.notifier.notify( 'success', 'Your assignment has been created' );
      } else {
        console.log(this.assignmentByID)
        this.assignmentByID[0].vehicleId = this.assignmentForm.get('vehicleId').value,
        this.assignmentByID[0].cameraId = this.assignmentForm.get('cameraId').value,
        this.dialogRef.close(this.assignmentByID[0]);
        this.notifier.notify( 'success', 'Your assignment has been edited' );
      }
      
    }

  }

}
