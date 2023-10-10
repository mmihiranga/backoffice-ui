export interface ITrainReduxState {
  loading: boolean;
  selectedField?: Train;
  trains?: Train[];
  isShowTrainModal: boolean;
}

export interface Train {
  id: string;
  trainName: string;
  seatCount: number;
  from: string;
  to: string;
  availableDays: string;
  arrivalTime: string;
  departureTime: string;
  isPublish: boolean;
}
