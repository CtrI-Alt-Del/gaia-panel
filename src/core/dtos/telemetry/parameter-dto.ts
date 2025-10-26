export type ParameterDto = {
  id: string;
  name: string;
  code: string;
  unitOfMeasure: string;
  factor: number;
  offset: number;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
};
