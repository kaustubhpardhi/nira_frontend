import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import BillingFormInput from "../Components/BillingFormInput";
import country_state_district from "country_state_district";
import moment from "moment";
import CryptoJS from "crypto-js";
import DatePicker from "react-datepicker";

function decrypt(text, skey) {
  console.log({ text, skey });
  const base64Iv = "0123456789abcdef";
  const key = CryptoJS.enc.Base64.parse(skey);
  const iv = CryptoJS.enc.Utf8.parse(base64Iv);
  const decrypted = CryptoJS.AES.decrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  console.log("I am in decrypt function:", decrypted);
  const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
  console.log({ decryptedData });
  return decryptedData;
}

const BillingForm = ({ setSideBar }) => {
  const navigate = useNavigate();
  // date method
  const dt = new Date();
  const year = dt.getFullYear();
  const m = dt.getMonth();
  const d = dt.getDate();

  let user = JSON.parse(localStorage.getItem("user"));

  // states
  const [pawti, setPawti] = useState();
  const [name, setName] = useState("");
  const [receiptDate, setReceiptDate] = useState(
    `${d < 10 ? "0" + d : d}-${("0" + (m + 1)).slice(-2)}-${year}`
  );
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [poojaDate, setPoojaDate] = useState("");
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [gotra, setGotra] = useState("");
  const [forWhich, setForWhich] = useState("");

  const [loading, setLoading] = useState(true);

  // effects
  useEffect(() => {
    document.title = "Billing Software by CFT Labs";
    setSideBar(false);
  }, [setSideBar]);
  useEffect(() => {
    if (user) {
      navigate("/billing");
    }
  }, [user, navigate]);
  // last pawti
  useEffect(() => {
    axios.get("/receipt/check-pawati-number", {}).then((res) => {
      if (res.data) {
        const pawatiNumber = res.data[0]?.pawatiNumber || 0;
        setPawti(pawatiNumber + 1);
        setLoading(false);
      }
    });
  }, [loading]);

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

  // form submit handler
  const handleForm = (event) => {
    event.preventDefault();
    if (!pawti) {
      return alert("Pawati number not found");
    }
    if (!name) {
      return alert("Pawati provide your name");
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/i.test(mobile)) {
      return alert("Please Provide a valid mobile number");
    }
    if (!forWhich) {
      return alert("Please Select a Purpose");
    }
    if (!amount || amount < 1) {
      return alert("Please Select a Valid Amount");
    }
    const postData = {
      pawatiNumber: pawti,
      receiptDate,
      poojaDate,
      Name: name,
      email,
      mobileNumber: mobile,
      address: { city, state },
      purpose: forWhich,
      amount: amount,
      modeOfPayment: { online: amount },
      gotra,
    };

    // fName and lName split
    const divideName = name.split(" ");
    const fName = divideName[0];
    divideName.shift();
    const lName = divideName.join(" ");
    const expiryDate = moment(moment().add(1, "days")._d).format("YYYY-MM-DD");
    const createOrderData = {
      fName,
      lName,
      orderId: `00000000${pawti}`.slice(-6),
      mediaType: "EMAIL AND SMS",
      amount: amount + "",
      product: "Donation",
      expiryDate,
      country: "IND",
      currency: "INR",
      mobileNo: mobile,
      customerEmail: email,
    };

    axios
      .post("/receipt/create-order", createOrderData)
      .then((res) => {
        const secrete = res.data.message;
        console.log(secrete);
        if (secrete) {
          const decryptData = decrypt(
            secrete,
            "nAHUtRh3tRVn/YhIFWQW448Co0E1EQjAMppR8gMwbqs="
          );
          if (decryptData) {
            axios
              .post("/receipt/create-receipt", postData)
              .then((res) => alert("Bill Create Successfully"));
          }
        }
      })
      .catch((error) => console.log(error));
  };

  // lists
  const stateList = country_state_district.getAllStates();
  const forWhichList = [
    { purpose: "Sankalp Abhishek", amount: 50 },
    { purpose: "Abhishek by hand", amount: 150 },
    { purpose: "Pawan Abhishek", amount: 500 },
    { purpose: "Festival Food Donation Service", amount: 500 },
    { purpose: "Daily Flower Service", amount: 500 },
    { purpose: "Daily Food Donation Service", amount: 500 },
    { purpose: "Satyadatta Pooja", amount: 750 },
    { purpose: "Daily Flower Service (Thursday)", amount: 1000 },
    { purpose: "Daily Food Donation Service (Thursday)", amount: 1000 },
    { purpose: "SMT. Dutt Yag", amount: 11111 },
    { purpose: "Other" },
  ];

  const gotraList = [
    "Kashyap",
    "Vasisths",
    "Angiras",
    "Attri",
    "Mankandeye",
    "Bharadwaj",
    "Sankhyayen",
    "Nityundan",
    "Kaundinya",
    "Jamadagni",
    "Kaushik",
    "Bhrugu",
    "Vatsa",
    "Almbayan",
    "Katyayan",
    "Suparnasya",
    "Pratanoesha",
    "Krupacharya",
    "Vibhandik",
    "Shilans",
    "Haritas",
    "Mandaviya",
    "Nandi",
    "Skanda",
    "Krushnatreya",
    "Kundal Rushi",
    "Kapi",
    "Mudgal",
    "Shahandilya",
    "VIshvamitra",
    "Muni Bhangav",
    "Augusti",
    "Gautam",
    "Garya",
    "Parashar",
    "Shaki",
    "Jain",
    "Durvas",
    "Pratavansh",
    "Supeenachsy",
    "Bhargav",
    "Vrushabah",
    "Khojirwale",
    "Sundesha",
  ];

  if (loading) {
    return (
      <div className="screenCenter">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Box mb={2}>
        <Typography
          variant="h1"
          sx={{ fontSize: "30px", fontWeight: "700" }}
          gutterBottom
        >
          Generate Receipt
        </Typography>
      </Box>
      {/* input body */}
      <Box
        component="form"
        onSubmit={handleForm}
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
            value={pawti}
            onChange={setPawti}
            label="Pawti Number"
            id="pawti"
            placeholder="Number"
            type="number"
            disabled={true}
          />

          <BillingFormInput
            value={receiptDate}
            onChange={setReceiptDate}
            label="Date"
            id="date"
            placeholder="Date"
            type="text"
            disabled={true}
          />

          <BillingFormInput
            value={name}
            onChange={setName}
            label="Name"
            id="name"
            placeholder="Enter Your full name"
            type="text"
            disabled={false}
            required={true}
          />

          <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="gotra">
              Gotra
            </FormLabel>
            <input
              value={gotra}
              onChange={(e) => setGotra(e.target.value)}
              id={"gotra"}
              placeholder="Enter Your Gotra"
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

          <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="state">
              State
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
                Select one
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

          <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="city">
              City
            </FormLabel>
            <Select
              id="city"
              placeholder="state"
              sx={{ width: "100%" }}
              color="third"
              size="small"
              value={city || 0}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state}
            >
              <MenuItem value={0} disabled>
                Select one
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.city_name} value={city.city_name}>
                  {" "}
                  {city.city_name}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <BillingFormInput
            value={mobile}
            onChange={setMobile}
            label="Mobile Number"
            id="mobile"
            placeholder="Mobile Number"
            type="number"
            disabled={false}
            required={true}
          />

          <BillingFormInput
            value={email}
            onChange={setEmail}
            label="Email"
            id="email"
            placeholder="Email"
            type="email"
            disabled={false}
          />

          <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="for">
              Purpose
            </FormLabel>
            <Select
              id="city"
              placeholder="state"
              sx={{ width: "100%" }}
              color="third"
              size="small"
              defaultValue={0}
              onChange={(e) => setForWhich(e.target.value)}
            >
              <MenuItem value={0} disabled>
                Select one
              </MenuItem>
              {forWhichList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.purpose}
                  onClick={() => setAmount(item.amount ? item.amount : "")}
                >
                  {item.purpose} {item.amount ? "- ₹" + item.amount : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="for">
              Date
            </FormLabel>
            <DatePicker
              className="customInput"
              selected={poojaDate}
              onChange={(date) => setPoojaDate(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
            />
          </FormControl>

          <BillingFormInput
            value={amount}
            onChange={setAmount}
            label="Amount"
            id="amount"
            placeholder="Amount"
            type="number"
            disabled={forWhich !== "Other"}
          />
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
            Generate Receipt{" "}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default memo(BillingForm);
