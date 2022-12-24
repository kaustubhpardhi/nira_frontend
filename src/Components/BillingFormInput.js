import React from 'react';
import { FormControl, FormLabel, TextField } from '@mui/material';


const BillingFormInput = ({ value, onChange, label, id, disabled, placeholder, type, required }) => {
    return (
        <FormControl>
            <FormLabel sx={{ mb: 1, color: 'black' }} htmlFor={id}>
                {label}
            </FormLabel>
            <TextField
                required={required ? required : false}
                value={value}
                onChange={e => onChange(e.target.value)}
                sx={{ width: '100%' }}
                id={id}
                placeholder={placeholder}
                type={type}
                color="third"
                size='small'
                disabled={disabled}
            />
        </FormControl>
    );
};

export default BillingFormInput;