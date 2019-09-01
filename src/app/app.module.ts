import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),

  ],
  providers: [],
  entryComponents: [UtilityDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
