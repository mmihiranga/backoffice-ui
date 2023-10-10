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
      id: "travelerId",
      numeric: true,
      disablePadding: false,
      label: "Travel Agent ID",
    },
    {
      id: "userId",
      numeric: true,
      disablePadding: false,
      label: "NIC",
    },
    {
      id: "userName",
      numeric: true,
      disablePadding: false,
      label: "User Name",
    },
    {
      id: "trainId",
      numeric: true,
      disablePadding: false,
      label: "Train Number",
    },
    {
      id: "date",
      numeric: true,
      disablePadding: true,
      label: "Reservation Date",
    },
  ];

  const rows: Reservation[] = [
    createData(
      "B305",
      "TV305",
      "TU234234",
      "Madhura Mihiranga",
      "TS451",
      "12/02/2031"
    ),
  ];

  function createData(
    id: string,
    travelerId: string,
    userId: string,
    userName: string,
    trainId: string,
    date: string
  ): Reservation {
    return {
      id,
      travelerId,
      userId,
      userName,
      trainId,
      date,
    };
  }

  const handleEdit = (value: string) => {
    dispatch(setShowBookingModel(true));
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
        type={"userId"}
      />
      <BookingModal />
    </Box>
  );
};

export default TicketBookingManagement;
