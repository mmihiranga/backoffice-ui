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
import dayjs from "dayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const TrainModal = () => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = React.useState<boolean>(false);
  const { selectedField, isShowTrainModal } = useAppSelector(
    (state) => state.train
  );

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
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Seat Count</FormLabel>
                <Input required type="number" />
              </FormControl>
              <FormControl>
                <FormLabel>From</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>To</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Available On</FormLabel>
                <Select defaultValue="weekday">
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
                      defaultValue={dayjs("2022-04-17T15:30")}
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
                      defaultValue={dayjs("2022-04-17T15:30")}
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
                    checked={checked}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setChecked(event.target.checked)
                    }
                    color={checked ? "success" : "neutral"}
                    variant={checked ? "solid" : "outlined"}
                    startDecorator={
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontStyle: "italic",
                        }}
                      >
                        {checked ? "available" : " not available"}
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
                Submit
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default TrainModal;
