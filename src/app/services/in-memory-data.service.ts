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
        id: 1,
        cameraId: 123,
        vehicleId: 1,
        DateCreated: 1567181525976,
        Deleted: false,
      },
      {
        id: 2,
        cameraId: 456,
        vehicleId: 2,
        DateCreated: 1567181591135,
        Deleted: false,
      },
      {
        id: 3,
        cameraId: 789,
        vehicleId: 3,
        DateCreated: 1567181604106,
        Deleted: false,
      }
    ];

    const vehicle = [
      {
        id: 1,
        name: 'Toyota',
      },
      {
        id: 2,
        name: 'Honda',
      },
      {
        id: 3,
        name: 'Ford',
      },
    ];

    const camera = [
      {
        id: 1,
        deviceNumber: 123,
      },
      {
        id: 2,
        deviceNumber: 456,
      },
      {
        id: 3,
        deviceNumber: 789,
      },
    ];

    return { cameraAssignment, vehicle, camera };
  }
}
