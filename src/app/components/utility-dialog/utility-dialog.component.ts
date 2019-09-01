import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-utility-dialog',
  templateUrl: './utility-dialog.component.html',
  styleUrls: ['./utility-dialog.component.css']
})
export class UtilityDialogComponent implements OnInit {

  private readonly notifier: NotifierService;

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
      this.dialogRef.close(this.assignmentForm.value);
      this.notifier.notify( 'success', 'Your assignment has been created' );
    }

  }

}
