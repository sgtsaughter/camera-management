import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';



import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { UtilityDialogComponent } from './components/utility-dialog/utility-dialog.component';
import { VTSMaterialModule } from './modules/material-module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UtilityDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    VTSMaterialModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),

  ],
  providers: [],
  entryComponents: [UtilityDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
