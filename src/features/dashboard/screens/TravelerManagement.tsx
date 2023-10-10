import { Box, Typography } from "@mui/material";
import React from "react";
import DataTable, { HeadCell } from "../../../components/DataTable";
import { useAppDispatch } from "../../../hooks";
import { User } from "../../../types/user.types";
import {
  setSelectedField,
  setShowUserModel,
  setUserType,
} from "../../../store/slices/userSlice";
import UserModal from "../modals/UserModal";

const TravelerManagement = () => {
  const dispatch = useAppDispatch();
  const orderByKey: keyof User = "name";

  const headCells: HeadCell<User>[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Traveler Name",
    },
    {
      id: "id",
      numeric: false,
      disablePadding: true,
      label: "NIC",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email Address",
    },
    {
      id: "age",
      numeric: true,
      disablePadding: false,
      label: "Age",
    },
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Address",
    },
    {
      id: "phoneNo",
      numeric: false,
      disablePadding: false,
      label: "Phone Number",
    },
    {
      id: "isActive",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
  ];

  const rows: User[] = [
    createData(
      "2",
      "Alice Smith",
      "alice@example.com",
      "25",
      "456 Elm St",
      "555-987-6543",
      "securepassword",
      true,
      "Agent"
    ),
    createData(
      "1",
      "John Doe",
      "john@example.com",
      "30",
      "123 Main St",
      "555-123-4567",
      "mypassword",
      true,
      "Admin"
    ),
  ];

  function createData(
    id: string,
    name: string,
    email: string,
    age: string,
    address: string,
    phoneNo: string,
    password: string,
    isActive: boolean,
    role: "Admin" | "Agent" | "Traveler"
  ): User {
    return {
      id,
      name,
      email,
      age,
      address,
      phoneNo,
      password,
      isActive,
      role,
    };
  }

  const handleEdit = (value: string) => {
    const selectedUser = rows.find((user) => user.name === value);

    if (selectedUser) {
      dispatch(setSelectedField(selectedUser));
      dispatch(setUserType("Traveler"));
      dispatch(setShowUserModel(true));
    } else {
      alert(`User not found.`);
    }
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  const handleSubmit = async () => {
    await dispatch(setSelectedField(null));
    await dispatch(setUserType("Traveler"));
    dispatch(setShowUserModel(true));
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
      <Typography variant="h4">Traveler Management</Typography>
      <br />

      <DataTable<User>
        headers={headCells}
        rows={rows}
        orderByKey={orderByKey}
        title="List of Travelers"
        addButtonTitle="Add New Traveler"
        onClickAdd={handleSubmit}
        onClickDelete={handleDelete}
        onClickEdit={handleEdit}
        statusFalseText="Deactivated"
        statusTrueText="Active"
        type={"name"}
      />
      <UserModal />
    </Box>
  );
};

export default TravelerManagement;
