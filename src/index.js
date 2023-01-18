import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import {
  deepOrange,
  lightBlue,
  pink,
  teal,
  yellow,
  blue,
} from "@mui/material/colors";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import DonationReceipt from "./pages/DonationReceipt";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "mr", "kn"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
  });

const theme = createTheme({
  palette: {
    light: {
      main: "rgb(250, 251, 251)",
      contrastText: "rgb(148, 157, 178)",
    },
    third: {
      main: blue[600],
      contrastText: "#fff",
      dark: lightBlue[500],
      light: lightBlue[100],
    },
    fourth: {
      main: deepOrange[300],
      contrastText: "#fff",
      light: deepOrange[100],
    },
    fifth: {
      main: yellow[600],
      contrastText: "#fff",
      light: yellow[100],
    },
    sixth: {
      main: pink[700],
      contrastText: "#fff",
    },
    seventh: {
      main: teal[400],
      contrastText: "#fff",
    },
    eighth: {
      main: "#f44336",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif",
    fontWeight: "400",
  },
});

// axios
axios.defaults.baseURL = "https://api.fitechs.in/";
//axios.defaults.baseURL = "http://localhost:8081/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App />
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
