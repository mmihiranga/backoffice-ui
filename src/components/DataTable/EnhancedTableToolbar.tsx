import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { Box, Button, Typography } from "@mui/joy";
import { Stack, Tooltip } from "@mui/material";
import DeleteItemModal from "../../features/dashboard/modals/DeleteItemModal";
import Add from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";
interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
  addButtonTitle: string;
  onclickAdd: () => void;
  onclickEdit: (value: string) => void;
  onclickDelete: () => void;
  selectedItem: string;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    title,
    onclickAdd,
    onclickEdit,
    onclickDelete,
    addButtonTitle,
    selectedItem,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: "background.level1",
        }),
        borderTopLeftRadius: "var(--unstable_actionRadius)",
        borderTopRightRadius: "var(--unstable_actionRadius)",
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          level="body-lg"
          sx={{ flex: "1 1 100%" }}
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Stack display="flex" flexDirection="row" gap={2} marginBlock={1}>
          <Tooltip title="Edit">
            <Button
              onClick={() => onclickEdit(selectedItem)}
              size="sm"
              variant="soft"
              color="primary"
              endDecorator={<CreateRoundedIcon fontSize="small" />}
            >
              Update
            </Button>
          </Tooltip>
          <DeleteItemModal onClickDelete={onclickDelete} />
        </Stack>
      ) : (
        <Tooltip title="Filter list">
          <Button
            onClick={() => onclickAdd()}
            variant="soft"
            sx={{
              margin: 1,
              borderRadius: 6,
              width: "min-content",
              boxSizing: "border-box",
              fontWeight: 400,
              textTransform: "none",
              background: grey[800],
              color: "white",
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: grey[900],
              },
            }}
            startDecorator={<Add />}
          >
            {addButtonTitle}
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}
