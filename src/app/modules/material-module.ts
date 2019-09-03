// This module will handle all Angular Material Imports.
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  exports: [
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class VTSMaterialModule {}
