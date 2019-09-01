import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-utility-dialog',
  templateUrl: './utility-dialog.component.html',
  styleUrls: ['./utility-dialog.component.css']
})
export class UtilityDialogComponent implements OnInit {

  assignmentError: boolean = false;
  camerIdMatch: boolean;
  vehicleIdMatch: boolean;

  assignmentForm = new FormGroup({
    vehicleId: new FormControl(''),
    cameraId: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<UtilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      // Disable Outside-close
      dialogRef.disableClose = true;
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
    this.camerIdMatch = this.data.assignments.some(el => el.cameraId === this.assignmentForm.value.cameraId);
    this.vehicleIdMatch = this.data.assignments.some(el => el.vehicleId === this.assignmentForm.value.vehicleId);

    if (this.camerIdMatch || this.vehicleIdMatch) {
      this.assignmentError = true;
    } else {
      this.dialogRef.close(this.assignmentForm.value);
    }

  }

}
