import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TravelerManagement from "./screens/TravelerManagement";
import { Avatar, Button, Divider, Stack } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";
import StyledBadge from "../../components/StyledBadge";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import TicketBookingManagement from "./screens/TicketBookingManagement";
import TrainManagement from "./screens/TrainManagement";
import CustomTabPanel from "../../components/CustomTabPanel";
import TravelAgentManagement from "./screens/TravelAgentManagement";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
        width: "-webkit-fill-available",
        boxSizing: "border-box",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "200px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[400],
                width: 100,
                height: 100,
                fontSize: "50px",
              }}
              alt="Madhura Mihiranga"
              src="/static/images/avatar/1.jpg"
            />
          </StyledBadge>
          <Typography
            sx={{
              marginTop: 2,
              lineHeight: "14px",
            }}
          >
            Madhura Mihiranga
          </Typography>
          <Typography
            sx={{
              lineHeight: "12px",
              fontSize: "12px",
              color: grey[400],
            }}
          >
            madhura@gmail.com
          </Typography>
        </Box>
        <Divider variant="middle" sx={{ width: "80%" }} />
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            flexGrow: 1,
            borderColor: "divider",
            minWidth: "200px",
            ".MuiTab-root": {
              alignItems: "baseline",
              textTransform: "none",
              ml: 2,
              "&.Mui-selected": {
                color: deepOrange[400],
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: deepOrange[400],
            },
          }}
        >
          <Tab label="Bookings" {...a11yProps(0)} />
          <Tab label="Travel Agents" {...a11yProps(1)} />
          <Tab label="Travelers" {...a11yProps(2)} />
          <Tab label="Trains & Schedules" {...a11yProps(3)} />
        </Tabs>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            borderRadius: 0,
            width: "100%",
            boxSizing: "border-box",
            fontWeight: 400,
            textTransform: "none",
            background: deepOrange[500],
            "&:hover": {
              backgroundColor: deepOrange[800],
            },
          }}
          startIcon={<LogoutRoundedIcon />}
        >
          Logout
        </Button>
      </Stack>
      <CustomTabPanel value={value} index={0}>
        <TicketBookingManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TravelAgentManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TravelerManagement />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TrainManagement />
      </CustomTabPanel>
    </Box>
  );
}
