import * as React from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Order,
  ValidKeyOfT,
  getComparator,
  labelDisplayedRows,
  stableSort,
} from "./DataTable/DataTableFunctions";
import { EnhancedTableToolbar } from "./DataTable/EnhancedTableToolbar";
import { EnhancedTableHead } from "./DataTable/EnhancedTableHead";

type DataTableProps<T extends Record<keyof T, string | number | boolean>> = {
  headers: HeadCell<T>[];
  rows: T[];
  orderByKey: keyof T;
  title: string;
  addButtonTitle: string;
  onClickAdd: () => void;
  onClickEdit: (value: string) => void;
  onClickDelete: (id: string) => void;
  statusTrueText?: string;
  statusFalseText?: string;
  type: keyof T;
};

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

function DataTable<T extends Record<keyof T, string | number | boolean>>(
  props: DataTableProps<T>
) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(props.orderByKey);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (props.rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? props.rows.length
      : Math.min(props.rows.length, (page + 1) * rowsPerPage);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Sheet
        variant="outlined"
        sx={{
          boxShadow: "sm",
          borderRadius: "sm",
          // flexGrow: 1,
          boxSizing: "border-box",
          overflow: "auto",
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundAttachment: " scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
        }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          title={props.title}
          addButtonTitle={props.addButtonTitle}
          onclickEdit={props.onClickEdit}
          onclickDelete={props.onClickDelete}
          onclickAdd={props.onClickAdd}
          selectedItem={selected[0]}
        />
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          stickyFooter
          sx={{
            boxSizing: "border-box",
            "--TableCell-selectedBackground": (theme) =>
              theme.vars.palette.success.softBg,
            "& thead th:nth-child(1)": {
              width: "40px",
            },
            "& thead th:nth-child(2)": {
              width: "10%",
            },
            "& tr > *:nth-child(n+3)": { textAlign: "right" },
          }}
        >
          <EnhancedTableHead<T>
            headCells={props.headers}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy as string}
            onRequestSort={handleRequestSort}
            rowCount={props.rows.length}
          />
          <tbody>
            {stableSort<T>(
              props.rows,
              getComparator(order, orderBy as ValidKeyOfT<T>)
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(
                  row[props.type as keyof T] as string
                );
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <tr
                    onClick={(event) =>
                      handleClick(event, row[props.type as keyof T] as string)
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row[props.type as keyof T] as string}
                    // selected={isItemSelected}
                    style={
                      isItemSelected
                        ? ({
                            "--TableCell-dataBackground":
                              "var(--TableCell-selectedBackground)",
                            "--TableCell-headBackground":
                              "var(--TableCell-selectedBackground)",
                          } as React.CSSProperties)
                        : {}
                    }
                  >
                    <th scope="row">
                      <Checkbox
                        checked={isItemSelected}
                        slotProps={{
                          input: {
                            "aria-labelledby": labelId,
                          },
                        }}
                        sx={{ verticalAlign: "top" }}
                      />
                    </th>
                    {props.headers.map((headCell) => {
                      const cellValue = row[headCell.id as keyof T];
                      return (
                        <td key={headCell.id as string}>
                          {typeof cellValue === "boolean"
                            ? cellValue
                              ? props.statusTrueText ?? "Available"
                              : props.statusFalseText ?? "No"
                            : cellValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            {emptyRows > 0 && (
              <tr
                style={
                  {
                    height: `calc(${emptyRows} * 40px)`,
                    "--TableRow-hoverBackground": "transparent",
                  } as React.CSSProperties
                }
              >
                <td colSpan={props.headers.length + 1} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={props.headers.length + 1}
                style={{
                  background: "white",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <FormControl orientation="horizontal" size="sm">
                    <FormLabel>Rows per page:</FormLabel>
                    <Select
                      onChange={handleChangeRowsPerPage}
                      value={rowsPerPage}
                    >
                      <Option value={10}>10</Option>
                      <Option value={15}>15</Option>
                      <Option value={25}>25</Option>
                    </Select>
                  </FormControl>
                  <Typography textAlign="center" sx={{ minWidth: 80 }}>
                    {labelDisplayedRows({
                      from:
                        props.rows.length === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: props.rows.length === -1 ? -1 : props.rows.length,
                    })}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={page === 0}
                      onClick={() => handleChangePage(page - 1)}
                      sx={{ bgcolor: "background.surface" }}
                    >
                      <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={
                        props.rows.length !== -1
                          ? page >=
                            Math.ceil(props.rows.length / rowsPerPage) - 1
                          : false
                      }
                      onClick={() => handleChangePage(page + 1)}
                      sx={{ bgcolor: "background.surface" }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Sheet>
    </Box>
  );
}

export default DataTable;
