import { IOSSwitch } from './SwitchInput.js'
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

export const Header = () => {
    const title = 'Expense';
    const [checked, setChecked] = React.useState(true);

    const handleChange = () => {
        setChecked(true);
        title = checked ? 'Expense' : 'Income';
    };
  
  return (
    <div className='header-container'>
        <h1>{title}</h1>
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Income</Typography>
                <IOSSwitch onChange={handleChange} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
            <Typography>Expense</Typography>
      </Stack>
    </div>
  )
}
