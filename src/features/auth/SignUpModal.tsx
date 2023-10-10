import * as React from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Add from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/joy";

const SignUpModal = () => {
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);
  const [open, setOpen] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState({
    NIC: "",
    Email: "",
    Password: "",
    Role: "Traveler",
    Name: "",
    ContactNo: "",
    Age: "",
    Address: "",
    IsActive: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout("center");
          }}
        >
          Center
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout("fullscreen");
          }}
        >
          Full screen
        </Button>
      </Stack>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog
          layout={layout}
          sx={{
            overflowY: "auto",
          }}
        >
          <ModalClose />
          <DialogTitle>User Registration</DialogTitle>
          <DialogContent>
            <Typography>Fill in the user registration details</Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="text"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>NIC</FormLabel>
                  <Input
                    type="text"
                    name="NIC"
                    value={formData.NIC}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="text"
                    name="Age"
                    value={formData.Age}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="Address"
                    value={formData.Address}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Contact Number</FormLabel>
                  <Input
                    type="text"
                    name="ContactNo"
                    value={formData.ContactNo}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>
                <Button type="submit">Register</Button>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default SignUpModal;
