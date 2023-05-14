import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import AppBarCustom from "./AppBarCustom";
import DrawerListItem from "./DrawerListItem";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import logo from "../images/nira1.jpeg";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// navigate

export default function PersistentDrawerLeft({
  sideBar,
  setSideBar,
  drawerWidth,
}) {
  const navigate = useNavigate();
  // log out handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box>
      <CssBaseline />
      <AppBarCustom
        sideBar={sideBar}
        setSideBar={setSideBar}
        drawerWidth={drawerWidth}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={sideBar}
      >
        {/* <DrawerHeader /> */}
        <List sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ px: 5, pt: 4 }}>
            <img src={logo} alt="" />
          </Box>
          <NavLink className="navLink" to="/billing">
            <DrawerListItem text={t("receipt")} icon={<ReceiptLongIcon />} />
          </NavLink>
          <NavLink className="navLink" to="/dashboard">
            <DrawerListItem text="Dashboard" icon={<DashboardIcon />} />
          </NavLink>
          {user && user.role !== "accountant" && (
            <NavLink className="navLink" to="/receipt-management">
              <DrawerListItem text={t("receipt-m")} icon={<ListAltIcon />} />
            </NavLink>
          )}
          <NavLink className="navLink" to="/account">
            <DrawerListItem text={t("account")} icon={<AccountBoxIcon />} />
          </NavLink>
          <NavLink className="navLink" to="/download-receipt">
            <DrawerListItem text={t("receipt-d")} icon={<FileDownloadIcon />} />
          </NavLink>
          <NavLink className="navLink" to="/ornament-donation">
            <DrawerListItem
              text="Ornaments Donation"
              icon={<VolunteerActivismIcon />}
            />
          </NavLink>
          {/* <NavLink className="navLink" to="/register-user">
            <DrawerListItem text="Register User" icon={<PersonAddAlt1Icon />} />
          </NavLink> */}

          <div style={{ marginTop: "auto", textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleLogout}
              color="eighth"
              sx={{ textTransform: "capitalize", px: 5, mb: 2 }}
            >
              <LogoutIcon sx={{ mr: 2 }} /> {t("logout")}
            </Button>
          </div>
        </List>
      </Drawer>
    </Box>
  );
}
