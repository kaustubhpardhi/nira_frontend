import React, { useContext, useEffect, useState } from "react";
import { ReceiptContext } from "../context/ReceiptContext";
import axios from "axios";

const Success = (props) => {
  const { receipt, setReceipt } = useContext(ReceiptContext);

  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://nira-frontend.vercel.app/success`
        );
        console.log(response.data);
        setResponseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <div>{responseData && <p>{responseData}</p>}</div>;
};

export default Success;
