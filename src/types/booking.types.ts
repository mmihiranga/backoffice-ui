export interface IBookingReduxState {
  loading: boolean;
  selectedField?: Reservation;
  bookings?: Reservation[];
  isShowBookingModal: boolean;
}

export interface Reservation {
  id: string;
  trainId: string;
  referenceId: string;
  userId: string;
  reservationDate: string;
  reservedDate: string;
  from: string;
  to: string;
  arrivalTime: string;
  departureTime: string;
}
