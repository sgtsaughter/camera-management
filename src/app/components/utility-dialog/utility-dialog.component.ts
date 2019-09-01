import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-utility-dialog',
  templateUrl: './utility-dialog.component.html',
  styleUrls: ['./utility-dialog.component.css']
})
export class UtilityDialogComponent implements OnInit {

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
    this.dialogRef.close(this.assignmentForm.value);
  }

}
