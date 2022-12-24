import React, { useContext } from 'react';
import { ReceiptContext } from '../context/ReceiptContext'

const Success = (props) => {
    const { receipt, setReceipt } = useContext(ReceiptContext)
    console.log(receipt)
    return (
        <div className='success'>
            <h1>Thank you, Your receipt is generating </h1>
        </div>
    );
};

export default Success;