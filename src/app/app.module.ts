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
import { NotifierModule, NotifierOptions } from 'angular-notifier';


/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
  horizontal: {
    position: 'middle',
    distance: 12
  },
  vertical: {
    position: 'bottom',
    distance: 12,
    gap: 10
  }
},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    NotifierModule.withConfig(customNotifierOptions),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 }),

  ],
  providers: [],
  entryComponents: [UtilityDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
