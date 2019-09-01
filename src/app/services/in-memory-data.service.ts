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
        cameraId: 1,
        vehicleId: 1,
        DateCreated: 1567181525976,
        Deleted: false,
      },
      {
        id: 2,
        cameraId: 2,
        vehicleId: 2,
        DateCreated: 1567181591135,
        Deleted: false,
      },
      {
        id: 3,
        cameraId: 3,
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
      {
        id: 4,
        name: 'Jeep',
      },
      {
        id: 5,
        name: 'Chrysler',
      },
      {
        id: 6,
        name: 'Kia',
      },
      {
        id: 7,
        name: 'Mazda',
      },
      {
        id: 8,
        name: 'Bugatti La Voiture Noire',
      },
    ];

    const camera = [
      {
        id: 1,
        deviceNumber: 'Logitech Pro Stream Webcam',
      },
      {
        id: 2,
        deviceNumber: 'Logitech - 4K Pro Webcam',
      },
      {
        id: 3,
        deviceNumber: 'Logitech - HD Webcam C270 - Black',
      },
      {
        id: 4,
        deviceNumber: 'Microsoft LifeCam HD-3000',
      },
      {
        id: 5,
        deviceNumber: 'Microsoft LifeCam Studio'
      },
      {
        id: 6,
        deviceNumber: 'Logitech C615',
      },
      {
        id: 7,
        deviceNumber: 'Logitech BRIO'
      },
      {
        id: 8,
        deviceNumber: 'Razer Kiyo'
      },
    ];

    return { cameraAssignment, vehicle, camera };
  }
}
