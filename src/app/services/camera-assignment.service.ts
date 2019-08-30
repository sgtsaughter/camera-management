import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class CameraAssignmentService {
  private baseAPiURL = 'api/cameraAssignment';

  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get(this.baseAPiURL);
  }

}
