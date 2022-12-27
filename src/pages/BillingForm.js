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
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import BillingFormInput from "../Components/BillingFormInput";
import country_state_district from "country_state_district";
import moment from "moment";
import CryptoJS from "crypto-js";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import "./BillingForm.css";

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

const BillingForm = () => {
  const navigate = useNavigate();
  // date method
  const dt = new Date();
  const year = dt.getFullYear();
  const m = dt.getMonth();
  const d = dt.getDate();

  // states
  const [pawti, setPawti] = useState();
  const [name, setName] = useState("");
  const [receiptDate, setReceiptDate] = useState(
    `${d < 10 ? "0" + d : d}-${("0" + (m + 1)).slice(-2)}-${year}`
  );
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [payment, setPayment] = useState("online");
  const [method, setMethod] = useState("");
  const [bank, setBank] = useState("");
  const [branch, setBranch] = useState("");
  const [cheque, setCheque] = useState("");
  const [chequeDate, setChequeDate] = useState(
    `${year}-${("0" + (m + 1)).slice(-2)}-${d < 10 ? "0" + d : d}`
  );
  const [state, setState] = useState("Maharashtra");
  const [uid, setUid] = useState("");
  const [aadhar, setAadhar] = useState("");

  const [poojaDate, setPoojaDate] = useState(new Date());
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [forWhich, setForWhich] = useState("");
  const [gotra, setGotra] = useState("");
  const [loading, setLoading] = useState(true);
  const [souvenirType, setSouvenirType] = useState("");
  const [uidType, setUidType] = useState("");
  const [address, setAddress] = useState("");
  const { t } = useTranslation();

  const generateThanks = () => {
    navigate("/thanks-letter", {
      state: {
        pawti,
        name,
        receiptDate,
        mobile,
        email,
        forWhich,
        amount,
        state,
        city,
        payment,
        method,
        bank,
        branch,
        cheque,
        chequeDate,
        poojaDate,
        // gotra,
        uid,
        uidType,
        souvenirType,
      },
    });
  };
  // context
  // const { receipt, setReceipt } = useContext(ReceiptContext)

  // effects
  useEffect(() => {
    document.title = "Nira Deosthan";
  }, []);
  // last pawti
  useEffect(() => {
    axios.get("/receipt/check-pawati-number", {}).then((res) => {
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

  // form submit handler
  const handleForm = (event) => {
    event.preventDefault();
    setLoading(true);
    if (!pawti) {
      return alert("Pawati number not found");
    }
    if (payment === "offline" && !method) {
      return alert("Please check the method items");
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
      address: { city, state, address },
      purpose: forWhich,
      amount: amount,
      // gotra,
      uid,
      // uidType,
      aadhar,
    };

    if (payment === "offline" && method === "cash") {
      postData.modeOfPayment = {
        Cash: Number(amount),

        mode: "Offline",
      };
    } else if (payment === "offline" && method === "cheque") {
      postData.modeOfPayment = {
        mode: "Cheque",
        ChequeDD: Number(amount),
        ChequeDetail: {
          bankName: bank,
          bankBranch: branch,
          chequeDate: chequeDate,
          chequeNumber: cheque,
        },
      };
    } else {
      postData.modeOfPayment = {
        Online: Number(amount),
        mode: "Online",
      };
    }

    // fName and lName split
    const divideName = name.split(" ");
    const fName = divideName[0];
    divideName.shift();
    const lName = divideName.join(" ");
    const expiryDate = moment(moment().add(1, "days")._d).format("YYYY-MM-DD");
    console.log(expiryDate);
    const createOrderData = {
      fName,
      lName,
      orderId: `${Date.now()}`,
      mediaType: "SMS",
      amount: amount,
      product: "Donation",
      expiryDate,
      country: "IND",
      currency: "INR",
      mobileNo: mobile,
      customerEmail: email,
      gotra: gotra,
      purpose: forWhich,
      pawti: pawti,
    };
    console.log(createOrderData);
    if (payment === "online") {
      axios
        .post("/receipt/create-order", createOrderData)
        .then((res) => {
          const secrete = res.data.message;
          console.log("res within create-order", res);
          if (secrete) {
            // setReceipt({ pawti, name, date, mobile, email, forWhich, amount, state, day, city, payment, method, bank, branch, cheque, chequeDate, month, dateNumber, gotra })
            const decryptData = decrypt(
              secrete,
              "vT11bhGTmZHslsUNYl1Mh9H/wMuuKww/Mo7gaoe8YBg="
            );
            console.log("decrypt data within create-order", decryptData);
            if (decryptData === "Invalid Mobile number !!") {
              return alert("Invalid Mobile number !!");
            } else if (decryptData) {
              axios.post("/receipt/create-receipt", postData).then((res) => {
                console.log("res within create-receipt", res);
                navigate("/generate-receipt", {
                  state: {
                    pawti,
                    name,
                    receiptDate,
                    mobile,
                    email,
                    forWhich,
                    amount,
                    state,
                    city,
                    payment,
                    method,
                    bank,
                    branch,
                    cheque,
                    chequeDate,
                    poojaDate,
                    gotra,
                    uid,
                    aadhar,
                  },
                });
              });
            }
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("/receipt/create-receipt", postData)
        .then((res) => {
          navigate("/generate-receipt", {
            state: {
              pawti,
              name,
              receiptDate,
              mobile,
              email,
              forWhich,
              amount,
              state,
              city,
              payment,
              method,
              bank,
              branch,
              cheque,
              chequeDate,
              date: poojaDate,
              gotra,
            },
          });
        })
        .catch((error) => console.log(error));
    }
    setLoading(false);
  };

  // lists
  const stateList = country_state_district.getAllStates();
  const forWhichList = [
    { purpose: "Padya Puja" },
    { purpose: "Panchamrit Puja" },
    { purpose: "Abhishek " },
    { purpose: "Dengi" },
    { purpose: "Jinhodwar" },
    { purpose: "Shasvat Puja" },
    { purpose: "Nandadeep" },
    { purpose: "Shanti" },
    { purpose: "Javal" },
    { purpose: "Upanayan" },
    { purpose: "Photo" },
    { purpose: "  Prakashan" },
    { purpose: "Advance" },
    { purpose: "Bij Mantra" },
    { purpose: "Rangoli Chhap" },
    { purpose: "Itar" },
    { purpose: "Dharmshala" },
    { purpose: "jeernoddhaar" },

    { purpose: "Other" },
  ];
  // const souvenirList = [
  //   { type: "Front Page (cover)", amount: "3500000" },
  //   { type: "Back Page (cover)", amount: "3500000" },
  //   { type: "Front Page (inside)", amount: "1500000" },
  //   { type: "Front Page (inside)", amount: "1500000" },
  //   { type: "Full Page (inside)", amount: "200000" },
  //   { type: "Separator Page", amount: "1500000" },
  //   { type: "Other" },
  // ];
  const uidList = [
    { type: "Aadhar Number" },
    { type: "Permanent Account Number" },
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

  console.log(uidType);

  if (loading) {
    return (
      <div className="screenCenter">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="receipt">
      <Box mb={2}>
        <Typography
          variant="h1"
          sx={{ fontSize: "30px", fontWeight: "700" }}
          gutterBottom
        >
          {t("generate-receipt")}
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
            label={t("pawti-no")}
            id="pawti"
            placeholder="Number"
            type="number"
            disabled={true}
          />
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
            id="name"
            placeholder={t("fullname")}
            type="text"
            disabled={false}
            required={true}
          />
          <BillingFormInput
            value={address}
            onChange={setAddress}
            label={t("address")}
            id="address"
            placeholder={t("address")}
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
          {/* <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="city">
              {t("city")}
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
                {t("select-one")}
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.city_name} value={city.city_name}>
                  {" "}
                  {city.city_name}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "} */}
          <BillingFormInput
            value={mobile}
            onChange={setMobile}
            label={t("mobile")}
            id="mobile"
            placeholder={t("mobile")}
            type="number"
            disabled={false}
            required={true}
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
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="for">
              {t("purpose")}
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
                {t("select-one")}
              </MenuItem>
              {forWhichList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.purpose}
                  onClick={() => setAmount(item.amount ? item.amount : "")}
                >
                  {item.purpose}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* {forWhich === "Souvenir" && (
            <FormControl>
              <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="for">
                {t("souvenir-type")}
              </FormLabel>
              <Select
                id="city"
                placeholder="state"
                sx={{ width: "100%" }}
                color="third"
                size="small"
                defaultValue={0}
                onChange={(e) => setSouvenirType(e.target.value)}
              >
                <MenuItem value={0} disabled>
                  {t("select-one")}
                </MenuItem>
                {souvenirList.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.type}
                    onClick={() => setAmount(item.amount ? item.amount : "")}
                  >
                    {item.type} {item.amount ? "- ₹" + item.amount : ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )} */}
          <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="for">
              {" "}
              {t("date")}
            </FormLabel>
            <DatePicker
              className="customInput"
              selected={poojaDate}
              onChange={(date) => setPoojaDate(date)}
              dateFormat="dd-MM-yyyy"
            />
          </FormControl>
          <BillingFormInput
            value={amount}
            onChange={setAmount}
            label={t("amount")}
            id="amount"
            placeholder={t("amount")}
            type="number"
            disabled={false}
            required={true}
          />
          {/* <FormControl>
            <FormLabel sx={{ mb: 1, color: "black" }} htmlFor="for">
              {t("select-id")}
            </FormLabel>
            <Select
              id="city"
              placeholder="state"
              sx={{ width: "100%" }}
              color="third"
              size="small"
              defaultValue={0}
              onChange={(e) => setUidType(e.target.value)}
            >
              <MenuItem value={0} disabled>
                {t("select-one")}
              </MenuItem>
              {uidList.map((item, index) => (
                <MenuItem key={index} value={item.type}>
                  {item.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          {amount > 2000 ? (
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
              <BillingFormInput
                value={aadhar}
                onChange={setAadhar}
                label="Aadhar Number"
                id="pan"
                placeholder="Aadhar Number"
                type="text"
                disabled={false}
                required={true}
              />
            </>
          ) : null}
        </Box>

        <FormControl sx={{ mt: 2, display: " block" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            {t("mode")}{" "}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="online"
              checked={payment === "online"}
              onChange={(e) => setPayment(e.target.value)}
              control={<Radio />}
              label={t("online")}
              color="success"
            />
            <FormControlLabel
              value="offline"
              checked={payment === "offline"}
              onChange={(e) => setPayment(e.target.value)}
              control={<Radio />}
              label={t("offline")}
            />
          </RadioGroup>
        </FormControl>

        {/* depend on payment radio select */}
        {payment === "offline" && (
          <FormControl sx={{ mt: 1, display: " block" }}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              {t("mode")}{" "}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="cash"
                checked={method === "cash"}
                onChange={(e) => setMethod(e.target.value)}
                control={<Radio />}
                label={t("cash")}
              />
              <FormControlLabel
                value="cheque"
                checked={method === "cheque"}
                onChange={(e) => setMethod(e.target.value)}
                control={<Radio />}
                label={t("chq-dd")}
              />
            </RadioGroup>
          </FormControl>
        )}

        {payment === "offline" && method === "cheque" && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr 1fr", sm: "1fr 1fr" },
              gap: 2,
              mt: 2,
              mb: 3,
            }}
          >
            <BillingFormInput
              value={bank}
              onChange={setBank}
              label={t("bank")}
              id="bank"
              placeholder={t("bank")}
              type="text"
              disabled={false}
            />

            <BillingFormInput
              value={branch}
              onChange={setBranch}
              label={t("branch")}
              id="branch"
              placeholder={t("branch")}
              type="text"
              disabled={false}
            />

            <BillingFormInput
              value={cheque}
              onChange={setCheque}
              label={t("chqno")}
              id="cheque"
              placeholder={t("chqno")}
              type="text"
              disabled={false}
            />

            <BillingFormInput
              value={chequeDate}
              onChange={setChequeDate}
              label={t("chqdate")}
              id="chequeDate"
              placeholder="Check Issue Date"
              type="date"
              disabled={false}
            />
          </Box>
        )}
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
        {/* <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{ mr: 2, textTransform: "capitalize" }}
            onClick={generateThanks}
            color="third"
            disableElevation
          >
            {t("generate-thanks")}{" "}
          </Button>
        </Box> */}
      </Box>
    </div>
  );
};

export default memo(BillingForm);
