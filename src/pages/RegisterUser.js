import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import BillingFormInput from "../Components/BillingFormInput";

//states
const registeruser = (event) => {};

const RegisterUser = () => {
  const [name, setName] = useState("");

  return (
    <div className="register">
      <Box mb={2} mt={4}>
        <div className="register-title">
          <Typography
            variant="h1"
            sx={{ fontSize: "30px", fontWeight: "700", mt: "15px", ml: 2 }}
            gutterBottom
          >
            Register User
          </Typography>
        </div>
        <Box
          component="form"
          onSubmit={registeruser}
          sx={{
            backgroundColor: "#fff",
            boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
            px: 3,
            py: 2,
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr", sm: "1fr 1fr" },
              gap: 1.5,
              mb: 2,
            }}
          ></Box>
        </Box>
      </Box>
    </div>
  );
};

export default RegisterUser;
