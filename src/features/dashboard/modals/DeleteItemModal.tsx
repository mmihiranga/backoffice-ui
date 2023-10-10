import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Tooltip } from "@mui/material";

type Props = {
  onClickDelete: () => void;
};

const DeleteItemModal = (props: Props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { onClickDelete } = props;

  const handleOnDelete = () => {
    setOpen(false);
    onClickDelete();
  };

  return (
    <React.Fragment>
      <Tooltip title="Delete">
        <Button
          variant="soft"
          color="danger"
          endDecorator={<DeleteOutlineRoundedIcon fontSize="small" />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Tooltip>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this field?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleOnDelete()}
            >
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteItemModal;
