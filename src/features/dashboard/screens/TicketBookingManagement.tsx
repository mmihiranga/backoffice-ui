import { Box, Typography } from "@mui/material";
import React from "react";
import DataTable, { HeadCell } from "../../../components/DataTable";
import { useAppDispatch } from "../../../hooks";
import {
  setSelectedField,
  setShowBookingModel,
} from "../../../store/slices/bookingSlice";
import BookingModal from "../modals/BookingModal";
import { Reservation } from "../../../types/booking.types";

type Props = {};

const TicketBookingManagement = (props: Props) => {
  const dispatch = useAppDispatch();
  const orderByKey: keyof Reservation = "id";

  const headCells: HeadCell<Reservation>[] = [
    {
      id: "id",
      numeric: true,
      disablePadding: true,
      label: "Booking ID",
    },
    {
      id: "referenceId",
      numeric: true,
      disablePadding: false,
      label: "Reference ID",
    },
    {
      id: "userId",
      numeric: true,
      disablePadding: false,
      label: "Reserved For",
    },
    {
      id: "reservationDate",
      numeric: true,
      disablePadding: true,
      label: "Reservation Date",
    },
    {
      id: "reservedDate",
      numeric: true,
      disablePadding: true,
      label: "Reserved Date",
    },
    {
      id: "from",
      numeric: true,
      disablePadding: true,
      label: "From",
    },
    {
      id: "to",
      numeric: true,
      disablePadding: true,
      label: "To",
    },
    {
      id: "arrivalTime",
      numeric: true,
      disablePadding: true,
      label: "Arrival Time",
    },
    {
      id: "departureTime",
      numeric: true,
      disablePadding: true,
      label: "Departure Time",
    },
  ];

  const rows: Reservation[] = [
    createData(
      "BK-323232305",
      "TR-3025",
      "AGENT_234234",
      "154845151V",
      "12/10/2023",
      "12/11/2023",
      "Matara",
      "Coloumbo",
      "07.00AM",
      "11.30AM"
    ),
  ];

  function createData(
    id: string,
    trainId: string,
    referenceId: string,
    userId: string,
    reservationDate: string,
    reservedDate: string,
    from: string,
    to: string,
    arrivalTime: string,
    departureTime: string
  ): Reservation {
    return {
      id,
      trainId,
      referenceId,
      userId,
      reservationDate,
      reservedDate,
      from,
      to,
      arrivalTime,
      departureTime,
    };
  }

  const handleEdit = (value: string) => {
    const selectedReservation = rows.find((user) => user.id === value);

    if (selectedReservation) {
      dispatch(setSelectedField(selectedReservation));
      dispatch(setShowBookingModel(true));
    } else {
      alert("Booking not found");
    }
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  const handleSubmit = async () => {
    await dispatch(setSelectedField(null));
    dispatch(setShowBookingModel(true));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="h4">Ticket Booking Management</Typography>
      <br />

      <DataTable<Reservation>
        headers={headCells}
        rows={rows}
        orderByKey={orderByKey}
        title="Your Bookings"
        addButtonTitle="Add New Booking"
        onClickAdd={handleSubmit}
        onClickDelete={handleDelete}
        onClickEdit={handleEdit}
        type={"id"}
      />
      <BookingModal />
    </Box>
  );
};

export default TicketBookingManagement;
