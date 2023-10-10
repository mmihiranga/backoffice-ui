import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setShowTrainModel } from "../../../store/slices/trainSlice";
import { orange } from "@mui/material/colors";
import { Option, Select, Switch, Typography } from "@mui/joy";
import dayjs, { Dayjs } from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Train } from "../../../types/train.types";

const TrainModal = () => {
  const dispatch = useAppDispatch();
  const { selectedField, isShowTrainModal } = useAppSelector(
    (state) => state.train
  );

  const initialFormData = React.useMemo(() => {
    const currentTime = dayjs();
    const currentTimeFormatted = currentTime.format("hh:mm A");
    const tenMinutesLater = currentTime.add(10, "minutes");
    const tenMinutesLaterString = tenMinutesLater.format("HH:mm A");
    return {
      id: "",
      trainName: "",
      seatCount: 0,
      from: "",
      to: "",
      availableDays: "",
      arrivalTime: currentTimeFormatted,
      departureTime: tenMinutesLaterString,
      isPublish: false,
    };
  }, []);

  const [formData, setFormData] = React.useState<Train>(initialFormData);

  const resetFormData = React.useCallback(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  React.useEffect(() => {
    if (selectedField) {
      setFormData({
        id: selectedField.id,
        trainName: selectedField.trainName,
        seatCount: selectedField.seatCount,
        from: selectedField.from,
        to: selectedField.to,
        availableDays: selectedField.availableDays,
        arrivalTime: selectedField.arrivalTime,
        departureTime: selectedField.departureTime,
        isPublish: selectedField.isPublish,
      });
    } else {
      resetFormData();
    }
  }, [resetFormData, selectedField]);

  const handleChangeAvailableDays = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setFormData({ ...formData, availableDays: newValue ?? "weekdays" });
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
        open={isShowTrainModal}
        onClose={() => dispatch(setShowTrainModel(false))}
      >
        <ModalDialog
          sx={{
            minWidth: "350px",
          }}
        >
          <DialogTitle>
            {selectedField ? "Update Train Details" : "Add New Train"}
          </DialogTitle>
          <DialogContent>Fill in the information of the train.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              dispatch(setShowTrainModel(false));
            }}
          >
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>Train Name</FormLabel>
                <Input
                  autoFocus
                  required
                  value={formData.trainName}
                  onChange={(e) =>
                    setFormData({ ...formData, trainName: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Seat Count</FormLabel>
                <Input
                  required
                  type="number"
                  value={formData.seatCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seatCount: parseInt(e.target.value, 10),
                    })
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
                <FormLabel>Available On</FormLabel>
                <Select
                  defaultValue="weekday"
                  value={formData.availableDays}
                  onChange={handleChangeAvailableDays}
                >
                  <Option value="weekend">Weekend</Option>
                  <Option value="weekday">WeekDay</Option>
                  <Option value="allDays">All Day</Option>
                  <Option value="holidays">Special Holidays</Option>
                </Select>
              </FormControl>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  m: 1,
                  gap: 1,
                }}
              >
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
                      defaultValue={dayjs("2022-04-17T15:30")}
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
              </Box>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingInline: 1,
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    Train Availability
                  </Typography>
                  <Switch
                    checked={formData.isPublish}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        isPublish: event.target.checked,
                      })
                    }
                    color={formData.isPublish ? "success" : "neutral"}
                    variant={formData.isPublish ? "solid" : "outlined"}
                    startDecorator={
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontStyle: "italic",
                        }}
                      >
                        {formData.isPublish ? "available" : " not available"}
                      </Typography>
                    }
                    slotProps={{
                      endDecorator: {
                        sx: {
                          minWidth: 24,
                        },
                      },
                    }}
                  />
                </Box>
              </FormControl>
              <Button
                type="submit"
                sx={{
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

export default TrainModal;
