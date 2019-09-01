export interface CameraAssignment {
    id: number;
    cameraId: number;
    vehicleId: number;
    DateCreated: number;
    Deleted: boolean;
    vehicleName: string;
    deviceNumber: string;
}

export interface Vehicle {
    id: number;
    name: string;
}

export interface Camera {
    id: number;
    deviceNumber: string;
}
