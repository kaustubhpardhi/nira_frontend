import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import BillingForm from "./pages/BillingForm";
import GenerateReceipt from "./pages/GenerateReceipt";
import Drawer from "./Components/Drawer";
import { styled } from "@mui/material/styles";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import RequireAuth from "./Components/RequireAuth";
import Account from "./pages/Account";
import ReceiptManagement from "./pages/ReceiptManagement";
import BillingFormNoAuth from "./pages/BillingFormNoAuth";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import DownloadExcelButton from "./pages/DownloadExcelButton";
import { ReceiptContext } from "./context/ReceiptContext";
import "react-datepicker/dist/react-datepicker.css";
import GenerateThanks from "./pages/GenerateThanks";
import Footer from "./pages/Footer";
import Dashboard from "./pages/Dashboard";
import OrnamentForm from "./pages/OrnamentForm";
import GenerateOrnament from "./pages/GenerateOrnament";
import OrnamentManagement from "./pages/OrnamentManagement";
import RegisterUser from "./pages/RegisterUser";
const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

function App() {
  const [sideBar, setSideBar] = useState(false);
  const [receipt, setReceipt] = useState({});
  return (
    <div className="app">
      <ReceiptContext.Provider value={{ receipt, setReceipt }}>
        <Box sx={{ mt: 5 }}>
          <div style={{ display: "flex" }}>
            <Drawer
              sideBar={sideBar}
              setSideBar={setSideBar}
              drawerWidth={drawerWidth}
            />
            <Main open={sideBar} sx={{ pb: 0, pt: 4 }}>
              <Routes>
                <Route path="/" element={<BillingFormNoAuth />} />
                <Route
                  path="/billing"
                  element={
                    <RequireAuth>
                      {" "}
                      <BillingForm />{" "}
                    </RequireAuth>
                  }
                />
                <Route
                  path="/generate-receipt"
                  element={
                    <RequireAuth>
                      {" "}
                      <GenerateReceipt />{" "}
                    </RequireAuth>
                  }
                />
                <Route
                  path="/generate-ornament"
                  element={
                    <RequireAuth>
                      <GenerateOrnament />{" "}
                    </RequireAuth>
                  }
                />
                <Route
                  path="/thanks-letter"
                  element={
                    <RequireAuth>
                      {" "}
                      <GenerateThanks />{" "}
                    </RequireAuth>
                  }
                />

                <Route
                  path="/account"
                  element={
                    <RequireAuth>
                      <Account />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/receipt-management"
                  element={
                    <RequireAuth>
                      <ReceiptManagement />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/ornament-management"
                  element={
                    <RequireAuth>
                      <OrnamentManagement />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/ornament-donation"
                  element={
                    <RequireAuth>
                      <OrnamentForm />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/register-user"
                  element={
                    <RequireAuth>
                      <RegisterUser />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route path="/success" element={<Success />} />
                <Route path="/failed" element={<Failed />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/download-receipt"
                  element={<DownloadExcelButton />}
                />
              </Routes>
            </Main>
          </div>
        </Box>
      </ReceiptContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
