import { Box, Typography } from "@mui/material";
import React from "react";
import DataTable, { HeadCell } from "../../../components/DataTable";
import { useAppDispatch } from "../../../hooks";
import { Train } from "../../../types/train.types";
import {
  setSelectedField,
  setShowTrainModel,
} from "../../../store/slices/trainSlice";
import AddTrainModal from "../modals/TrainModal";

const TrainManagement = () => {
  const dispatch = useAppDispatch();
  const orderByKey: keyof Train = "trainName";

  const headCells: HeadCell<Train>[] = [
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "#Train ID",
    },
    {
      id: "trainName",
      numeric: true,
      disablePadding: false,
      label: "Train Name",
    },
    {
      id: "seatCount",
      numeric: true,
      disablePadding: true,
      label: "Seat Count",
    },
    {
      id: "from",
      numeric: true,
      disablePadding: false,
      label: "From",
    },
    {
      id: "to",
      numeric: true,
      disablePadding: false,
      label: "To",
    },
    {
      id: "availableDays",
      numeric: true,
      disablePadding: false,
      label: "Available On",
    },
    {
      id: "arrivalTime",
      numeric: true,
      disablePadding: false,
      label: "Arrival Time",
    },
    {
      id: "departureTime",
      numeric: true,
      disablePadding: false,
      label: "Departure Time",
    },
    {
      id: "isPublish",
      numeric: true,
      disablePadding: true,
      label: "Status",
    },
  ];

  const rows: Train[] = [
    createData(
      "TS125",
      "Ruhunu Kumari",
      500,
      "Matara",
      "Coloumbo",
      "weekday",
      "06.00AM",
      "09.30AM",
      true
    ),
    createData(
      "TS145",
      "Galu Kumari",
      500,
      "Matara",
      "Coloumbo",
      "weekday",
      "07.00AM",
      "11.30AM",
      true
    ),
  ];

  function createData(
    id: string,
    trainName: string,
    seatCount: number,
    from: string,
    to: string,
    availableDays: string,
    arrivalTime: string,
    departureTime: string,
    isPublish: boolean
  ): Train {
    return {
      id,
      trainName,
      seatCount,
      from,
      to,
      availableDays,
      arrivalTime,
      departureTime,
      isPublish,
    };
  }

  const handleEdit = (value: string) => {
    const selectedTrain = rows.find((user) => user.trainName === value);

    if (selectedTrain) {
      dispatch(setSelectedField(selectedTrain));
      dispatch(setShowTrainModel(true));
    } else {
      alert("Train not found");
    }
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  const handleSubmit = async () => {
    await dispatch(setSelectedField(null));
    dispatch(setShowTrainModel(true));
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
      <Typography variant="h4">Trains & Schedule Management</Typography>
      <br />

      <DataTable<Train>
        headers={headCells}
        rows={rows}
        orderByKey={orderByKey}
        title="Trains & Schedule"
        addButtonTitle="Add New Train"
        onClickAdd={handleSubmit}
        onClickDelete={handleDelete}
        onClickEdit={handleEdit}
        statusFalseText="Not Available"
        statusTrueText="Available"
        type={"trainName"}
      />
      <AddTrainModal />
    </Box>
  );
};

export default TrainManagement;
