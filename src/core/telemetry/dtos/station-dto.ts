export type StationDto = {
  id: string;
  name: string;
  uid: string;
  latitude: number;
  longitude: number;
  quantityOfParameters: number;
  status: boolean;
  lastMeasurement: string;
  address: string;
  parameterIds: string[];
};
