import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { CameraAssignment, Vehicle, Camera } from '../interfaces/camera-assignment.interface';


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

  addCameraAssignments(data: any) {
    return this.http.post(this.cameraAssignmentURL, data, { observe: 'response' });
  }

  deleteAssignment(assignmentId: number) {
    const deleteUrl = this.cameraAssignmentURL + '/' + assignmentId;
    return this.http.delete(deleteUrl, { observe: 'response' });
  }

}
