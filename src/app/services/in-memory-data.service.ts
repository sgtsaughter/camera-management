import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const cameraAssignment = [
      {
        id: 0,
        cameraId: 123,
        vehicleId: 1,
        DateCreated: 1567181525976,
        Deleted: false,
      },
      {
        id: 1,
        cameraId: 456,
        vehicleId: 1,
        DateCreated: 1567181591135,
        Deleted: false,
      },
      {
        id: 2,
        cameraId: 789,
        vehicleId: 1,
        DateCreated: 1567181604106,
        Deleted: false,
      }
    ];
    return { cameraAssignment };
  }
}
