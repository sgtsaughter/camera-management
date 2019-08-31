import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface CameraAssignment {
    id: number;
    cameraId: number;
    vehicleId: number;
    DateCreated: number;
    Deleted: boolean;
}

export interface Vehicle {
    id: number;
    name: string;
}

export interface Camera {
    id: number;
    deviceNumber: number;
}
