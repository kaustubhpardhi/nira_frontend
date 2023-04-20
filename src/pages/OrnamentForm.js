import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import DatePicker from "react-datepicker";
import country_state_district from "country_state_district";
import { useTranslation } from "react-i18next";
import "./OrnamentForm.css";

const OrnamentForm = () => {
  const stateList = country_state_district.getAllStates();
  const navigate = useNavigate();
  const [pawti, setPawti] = useState();
  const dt = new Date();
  const year = dt.getFullYear();
  const m = dt.getMonth();
  const d = dt.getDate();
  const [receiptDate, setReceiptDate] = useState(
    `${d < 10 ? "0" + d : d}-${("0" + (m + 1)).slice(-2)}-${year}`
  );
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [ornamentName, setOrnamentName] = useState();
  const [ornamentType, setOrnamentType] = useState();
  const [ornamentWeight, setOrnamentWeight] = useState();
  const [ornamentValue, setOrnamentValue] = useState();
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [gotra, setGotra] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  //checking the last pawti number
  useEffect(() => {
    axios.get("/ornament/check-ornament-pawati", {}).then((res) => {
      if (res.data) {
        const pawatiNumber = res.data[0]?.pawatiNumber || 0;
        setPawti(pawatiNumber + 1);
        setLoading(false);
      }
    });
  }, []);

  // get all cities by state name
  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
          "api-token":
            "eOO6JCQY1TiZ79HOSapDwHmTiGpkJeKYQjnaq5Yj60vh_mFaUr2ueAG1Br7wmMgKkmA",
          "user-email": "suronjit797@gmail.com",
        },
      })
      .then((res) => {
        const token = res.data.auth_token;
        if (state && token) {
          axios
            .get(`https://www.universal-tutorial.com/api/cities/${state}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setCityList(res.data);
            });
        }
      })
      .catch((error) => setCityList([]));
  }, [state]);
  //lists
  const gotraList = [
    "काश्यप",
    "वशिष्ठ",
    "अंगीरस",
    "अत्री",
    "मार्कंडेय ",
    "भारद्वाज",
    "सांख्यन",
    "नित्युंदन",
    "कौडिण्य",
    "जमदग्नी",
    "कौशिक",
    "भृगु",
    "वत्स",
    "अल्म्बयान",
    "कात्यायन",
    "सुपर्णस्य",
    "प्रतानोएशा",
    "कृपाचार्य",
    "विभांडिक",
    "शिलांस",
    "हरितस्य",
    "मांडविया",
    "नंदी",
    "स्कंद",
    "कृष्णात्रेय",
    "कुंडल रुषी",
    "कापी",
    "मुद्गल",
    "शांडिल्य",
    "विश्वामित्र",
    "मुनी भांगव",
    "ऑगस्ट",
    "गौतम",
    "गर्या",
    "पराशर",
    "शकी",
    "जैन",
    "दुर्वास",
    "प्रतावंश",
    "सुपेनाची",
    "भार्गव",
    "वृषबाह",
    "खोजिरवाले",
    "सुदेशा",
  ];

  const handleOrnamentForm = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!pawti) {
      return alert("Please retry");
    }
    if (!ornamentName) {
      return alert("Please enter ornament name");
    }
    if (!ornamentValue) {
      return alert("Please enter ornament value");
    }
    if (!ornamentWeight) {
      return alert("Please enter ornament weight");
    }
    if (!name) {
      return alert("Please enter your name");
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/i.test(mobile)) {
      return alert("Please Provide a valid mobile number");
    }
    if (!gotra) {
      return alert("Please enter your gotra");
    }

    const postData = {
      pawatiNumber: pawti,
      receiptDate,
      Name: name,
      email,
      mobileNumber: mobile,
      address: { state },
      gotra,
      uid,
      ornamentName,
      ornamentType,
      ornamentWeight,
      ornamentValue,
    };

    axios.post("/ornament/create-ornament-receipt", postData).then((res) => {
      navigate("/generate-ornament", {
        state: {
          pawti,
          name,
          receiptDate,
          mobile,
          email,
          ornamentName,
          ornamentValue,
          ornamentType,
          ornamentWeight,
          uid,
        },
      });
    });
  };
  const handleOrnamentMgm = () => {
    navigate("/ornament-management");
  };
  if (loading) {
    return (
      <div className="screenCenter">
        <CircularProgress />
        <br></br>
        <h2>कृपया थांबा</h2>
      </div>
    );
  }
  return (
    <div className="ornaments">
      <Box mb={2} mt={4}>
        <div className="ornament-title">
          <Typography
            variant="h1"
            sx={{ fontSize: "30px", fontWeight: "700", mt: "15px" }}
            gutterBottom
          >
            Generate Ornament Receipt
          </Typography>
          <Button
            variant="contained"
            sx={{ mr: 2, textTransform: "capitalize", height: "3rem" }}
            color="eighth"
            disableElevation
            onClick={handleOrnamentMgm}
          >
            Ornament Management 📜
          </Button>
        </div>

        <Box
          component="form"
          onSubmit={handleOrnamentForm}
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
          >
            <BillingFormInput
              value={receiptDate}
              onChange={setReceiptDate}
              label={t("receipt-date")}
              id="date"
              placeholder="Receipt Date"
              type="text"
              disabled={true}
            />
            <BillingFormInput
              value={name}
              onChange={setName}
              label={t("name")}
              id="date"
              placeholder={t("fullname")}
              type="text"
              disabled={false}
            />
            <BillingFormInput
              value={mobile}
              onChange={setMobile}
              label={t("mobile")}
              id="date"
              placeholder={t("mobile")}
              type="text"
              disabled={false}
            />
            <BillingFormInput
              value={email}
              onChange={setEmail}
              label={t("email")}
              id="email"
              placeholder={t("email")}
              type="email"
              disabled={false}
            />
            <FormControl>
              <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="state">
                {t("state")}
              </FormLabel>
              <Select
                id="state"
                placeholder="state"
                sx={{ width: "100%" }}
                color="third"
                size="small"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <MenuItem value={0} disabled>
                  {t("select-one")}
                </MenuItem>
                {stateList.map((s) => (
                  <MenuItem
                    key={s?.id}
                    name={s?.id}
                    value={s?.name}
                    selected={s.name === "Tripura"}
                    onClick={() => setCity("")}
                  >
                    {s?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <BillingFormInput
              value={ornamentName}
              onChange={setOrnamentName}
              label="Ornament Name"
              id="ornamentName"
              placeholder="Ornament Name"
              type="text"
              disabled={false}
            />
            <BillingFormInput
              value={ornamentType}
              onChange={setOrnamentType}
              label="Ornament Type"
              id="ornamentType"
              placeholder="Ornament Type"
              type="text"
              disabled={false}
            />
            <BillingFormInput
              value={ornamentWeight}
              onChange={setOrnamentWeight}
              label="Ornament Weight"
              id="ornamentWeight"
              placeholder="Ornament Weight"
              type="text"
              disabled={false}
            />
            <BillingFormInput
              value={ornamentValue}
              onChange={setOrnamentValue}
              label="Ornament Value"
              id="ornamentValue"
              placeholder="Ornament Value"
              type="text"
              disabled={false}
            />
            <FormControl>
              <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="gotra">
                {t("gotra")}
              </FormLabel>
              <input
                value={gotra}
                onChange={(e) => setGotra(e.target.value)}
                id={"gotra"}
                placeholder={t("gotra-enter")}
                type="text"
                className="customInput"
                list={"Gotras"}
              />
            </FormControl>
            <datalist id="Gotras">
              {gotraList.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </datalist>
            <BillingFormInput
              value={address}
              onChange={setAddress}
              label="Address"
              id="address"
              placeholder="
              Enter your address"
              type="text"
              disabled={false}
            />
            {ornamentValue > 2000 ? (
              <>
                <BillingFormInput
                  value={uid}
                  onChange={setUid}
                  label={t("id-number")}
                  id="pan"
                  placeholder="PAN Number"
                  type="text"
                  disabled={false}
                  required={true}
                />
              </>
            ) : null}
          </Box>
          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              sx={{ mr: 2, textTransform: "capitalize" }}
              type="submit"
              color="eighth"
              disableElevation
            >
              {" "}
              {t("generate-receipt")}{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OrnamentForm;
