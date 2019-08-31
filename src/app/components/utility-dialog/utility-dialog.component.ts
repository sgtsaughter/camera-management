import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-utility-dialog',
  templateUrl: './utility-dialog.component.html',
  styleUrls: ['./utility-dialog.component.css']
})
export class UtilityDialogComponent implements OnInit {
  assignmentData = {vehicleId: 1, cameraId: 123} // TODO: replace this with formControl data

  constructor(public dialogRef: MatDialogRef<UtilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log(this.data);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
