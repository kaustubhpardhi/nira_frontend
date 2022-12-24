import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import BOB from "../images/BOB_CMYK_complogo-01.webp";
import logo from "../images/nira1.jpeg";
import "./AppBarCustom.css";
import i18next, { t } from "i18next";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const AppBarCustom = ({ sideBar, setSideBar, drawerWidth }) => {
  let user = JSON.parse(localStorage.getItem("user"));

  // AppBar custom style
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const languages = [
    {
      code: "mr",
      name: "Marathi",
    },
    {
      code: "en",
      name: "English",
    },
  ];
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleChangeLanguage = (code) => {};

  return (
    <div>
      <AppBar
        position="fixed"
        open={sideBar}
        component="nav"
        sx={{ background: "#fafbfb", boxShadow: "none" }}
      >
        <Toolbar>
          {user ? (
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setSideBar(!sideBar)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <img
              className="logo"
              src={logo}
              alt=""
              style={{ maxWidth: "130px", padding: "5px 0" }}
            />
          )}
          <div className="dropdown">
            <Button
              variant="contained"
              sx={{ mr: 2, textTransform: "capitalize" }}
              color="eighth"
              disableElevation
              onClick={handleOpen}
              className="dropdown-button"
            >
              {t("select-lang")} ⬇
            </Button>
            {open ? (
              <ul className="menu">
                {languages.map(({ code, name }) => (
                  <li key={code} className="menu-item">
                    <button onClick={() => i18next.changeLanguage(code)}>
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <img
            src={BOB}
            style={{
              maxWidth: "180px",
              marginLeft: "auto",
              marginTop: "15px",
            }}
            alt="Logo"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarCustom;
