export interface CameraAssignment {
    id: number;
    cameraId: number;
    vehicleId: number;
    DateCreated: number;
    Deleted: boolean;
    vehicleName: string;  // Added this property to easily get the property back once mapped in the dashboard component.
    deviceNumber: string; // Added this property to easily get the property back once mapped in the dashboard component.
}

export interface Vehicle {
    id: number;
    name: string;
}

export interface Camera {
    id: number;
    deviceNumber: string;
}
