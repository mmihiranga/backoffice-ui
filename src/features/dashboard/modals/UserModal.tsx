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
import { orange } from "@mui/material/colors";
import { Switch, Typography } from "@mui/joy";
import {
  setSelectedField,
  setShowUserModel,
} from "../../../store/slices/userSlice";
import { User } from "../../../types/user.types";

const UserModal = () => {
  const dispatch = useAppDispatch();
  const { selectedField, isShowUserModal, userType } = useAppSelector(
    (state) => state.user
  );

  const initialFormData = React.useMemo(
    () => ({
      name: "",
      email: "",
      id: "",
      age: "",
      address: "",
      password: "",
      role: userType,
      phoneNo: "",
      isActive: false,
    }),
    [userType]
  );

  const [formData, setFormData] = React.useState<User>(initialFormData);

  const resetFormData = React.useCallback(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  React.useEffect(() => {
    if (selectedField) {
      setFormData({
        name: selectedField.name,
        id: selectedField.id,
        email: selectedField.email,
        age: selectedField.age,
        address: selectedField.address,
        password: selectedField.password,
        role: selectedField.role,
        phoneNo: selectedField.phoneNo,
        isActive: selectedField.isActive,
      });
    } else {
      resetFormData();
    }
  }, [resetFormData, selectedField]);

  return (
    <>
      <Modal
        open={isShowUserModal}
        onClose={() => dispatch(setShowUserModel(false))}
      >
        <ModalDialog
          sx={{
            minWidth: "350px",
          }}
        >
          <DialogTitle>
            {selectedField
              ? `Update ${userType} Details`
              : `Add New ${userType}`}
          </DialogTitle>
          <DialogContent>
            Fill in the information of the {userType.toLocaleLowerCase()}.
          </DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              dispatch(setShowUserModel(false));
            }}
          >
            <Stack spacing={1}>
              <FormControl>
                <FormLabel>{userType} Name</FormLabel>
                <Input
                  autoFocus
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>NIC</FormLabel>
                <Input
                  required
                  type="number"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  required
                  value={formData.phoneNo}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNo: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Account Status</FormLabel>
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
                    {userType} Availability
                  </Typography>
                  <Switch
                    checked={formData.isActive}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        isActive: event.target.checked,
                      })
                    }
                    color={formData.isActive ? "success" : "neutral"}
                    variant={formData.isActive ? "solid" : "outlined"}
                    startDecorator={
                      <Typography
                        sx={{
                          fontSize: "10px",
                          fontStyle: "italic",
                        }}
                      >
                        {formData.isActive ? "active" : " deactivate"}
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
                onClick={() => {
                  if (selectedField) {
                    console.log("update", formData);
                  } else {
                    console.log("add", formData);
                  }
                  dispatch(setShowUserModel(false));
                  dispatch(setSelectedField(undefined));
                }}
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

export default UserModal;
