import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setShowBookingModel } from "../../../store/slices/bookingSlice";
import { orange } from "@mui/material/colors";
import { Input } from "@mui/joy";
import { Reservation } from "../../../types/booking.types";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";

const BookingModal = () => {
  const dispatch = useAppDispatch();
  const { selectedField, isShowBookingModal } = useAppSelector(
    (state) => state.booking
  );

  const initialFormData = React.useMemo(() => {
    const currentTime = dayjs();
    const currentTimeFormatted = currentTime.format("hh:mm A");
    const tenMinutesLater = currentTime.add(10, "minutes");
    const tenMinutesLaterString = tenMinutesLater.format("HH:mm A");
    return {
      id: "",
      trainId: "",
      referenceId: "",
      userId: "",
      reservationDate: dayjs().format("YYYY-MM-DD"),
      reservedDate: dayjs().format("YYYY-MM-DD"),
      from: "",
      to: "",
      arrivalTime: currentTimeFormatted,
      departureTime: tenMinutesLaterString,
    };
  }, []);

  const [formData, setFormData] = React.useState<Reservation>(initialFormData);

  const resetFormData = React.useCallback(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  React.useEffect(() => {
    if (selectedField) {
      setFormData({
        id: selectedField.id,
        trainId: selectedField.trainId,
        referenceId: selectedField.referenceId,
        userId: selectedField.userId,
        reservationDate: selectedField.reservationDate,
        reservedDate: selectedField.reservedDate,
        from: selectedField.from,
        to: selectedField.to,
        arrivalTime: selectedField.arrivalTime,
        departureTime: selectedField.departureTime,
      });
    } else {
      resetFormData();
    }
  }, [resetFormData, selectedField]);

  const handleChangeReservedDate = (newValue: Dayjs | null) => {
    setFormData({
      ...formData,
      reservedDate: newValue ? newValue.format("YYYY-MM-DD") : "",
    });
  };

  const handleArrivalTimeChange = (newTime: Dayjs | null) => {
    setFormData({ ...formData, arrivalTime: newTime as unknown as string });
  };

  const handleDepartureTimeChange = (newTime: Dayjs | null) => {
    setFormData({ ...formData, departureTime: newTime as unknown as string });
  };

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
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>Train ID</FormLabel>
                <Input
                  autoFocus
                  required
                  value={formData.trainId}
                  onChange={(e) =>
                    setFormData({ ...formData, trainId: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Reserved For (NIC)</FormLabel>
                <Input
                  required
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>To</FormLabel>
                <Input
                  required
                  value={formData.to}
                  onChange={(e) =>
                    setFormData({ ...formData, to: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>From</FormLabel>
                <Input
                  required
                  value={formData.from}
                  onChange={(e) =>
                    setFormData({ ...formData, from: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Reservation Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    defaultValue={dayjs()}
                    value={dayjs(formData.reservedDate)}
                    onChange={handleChangeReservedDate}
                    slotProps={{ textField: { size: "small" } }}
                    sx={{
                      borderRadius: 6,
                      fieldset: { borderRadius: 1.5 },
                      "& .MuiInputLabel-root": { lineHeight: 3 },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl>
                <FormLabel>Arrival Time</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    value={dayjs(formData.arrivalTime, "hh:mm A")}
                    defaultValue={dayjs("2022-04-17T15:30")}
                    onChange={handleArrivalTimeChange}
                    slotProps={{ textField: { size: "small" } }}
                    sx={{
                      borderRadius: 6,
                      fieldset: { borderRadius: 1.5 },
                      "& .MuiInputLabel-root": { lineHeight: 3 },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl>
                <FormLabel>Departure Time</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    value={dayjs(formData.departureTime, "hh:mm A")}
                    defaultValue={dayjs("", "hh:mm A")}
                    onChange={handleDepartureTimeChange}
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                    }}
                    sx={{
                      borderRadius: 6,
                      fieldset: { borderRadius: 1.5 },
                      "& .MuiInputLabel-root": { lineHeight: 3 },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>
              <Button
                type="submit"
                sx={{
                  mt: 1,
                  background: orange[700],
                  textTransform: "none",
                  color: "white",
                  "&:hover": {
                    background: `${orange[600]}`,
                  },
                }}
                onClick={
                  selectedField
                    ? () => console.log("edit")
                    : () => console.log("add")
                }
              >
                {selectedField ? "Update" : "Submit"}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default BookingModal;
