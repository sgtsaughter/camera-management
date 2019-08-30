import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class CameraAssignmentService {
  private cameraAssignmentURL = 'api/cameraAssignment';
  private vehicleURL = 'api/vehicle';
  private cameraURL = 'api/camera';

  constructor(private http: HttpClient) { }

  getCameraAssignments() {
    return this.http.get(this.cameraAssignmentURL);
  }

  getVehicles() {
    return this.http.get(this.vehicleURL);
  }

  getCameras() {
    return this.http.get(this.cameraURL);
  }

}
