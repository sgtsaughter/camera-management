import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  updateAssignment(update: any) {
    return this.http.put(`${this.cameraAssignmentURL}/${update.id}`, update,  { observe: 'response' });
  }

  deleteAssignment(assignmentId: number) {
    const deleteUrl = `${this.cameraAssignmentURL}/${assignmentId}`;
    return this.http.delete(deleteUrl, { observe: 'response' });
  }

}
