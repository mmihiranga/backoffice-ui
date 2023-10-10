import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setShowBookingModel } from "../../../store/slices/bookingSlice";

const BookingModal = () => {
  const dispatch = useAppDispatch();
  const { selectedField, isShowBookingModal } = useAppSelector(
    (state) => state.booking
  );
  return (
    <>
      <Modal
        open={isShowBookingModal}
        onClose={() => dispatch(setShowBookingModel(false))}
      >
        <ModalDialog>
          <DialogTitle>
            {selectedField ? "Update Booking Details" : "Add New Reservation"}
          </DialogTitle>
          <DialogContent>Fill in the information of the booking.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              dispatch(setShowBookingModel(false));
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <Button
                type="submit"
                onClick={
                  selectedField
                    ? () => console.log("edit")
                    : () => console.log("add")
                }
              >
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default BookingModal;
