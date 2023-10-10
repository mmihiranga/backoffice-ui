export interface IBookingReduxState {
  loading: boolean;
  selectedField?: Reservation;
  bookings?: Reservation[];
  isShowBookingModal: boolean;
}

export interface Reservation {
  id: string;
  travelerId: string;
  userId: string;
  userName: string;
  trainId: string;
  date: string;
}
