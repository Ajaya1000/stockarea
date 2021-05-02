import React from 'react';
import { makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';

const useStyle = makeStyles(() => ({
    label: {
        marginRight: '20px',
    },
}));

const Item = (props) => {
    const {
        label,
        value,
        type,
        onChange,
        isEditable,
        endorment,
        menuItems,
        ...rest
    } = props;
    const classes = useStyle();

    return (
        <>
            <Typography component='span' variant='h5' className={classes.label}>
                {label} :
            </Typography>
            {isEditable ? (
                <TextField
                    value={value}
                    onChange={(event) =>
                        onChange && onChange(event.target.value)
                    }
                    InputProps={endorment}
                    select={type === 'menu'}
                    type={type !== 'menu' ? type : undefined}
                >
                    {menuItems &&
                        menuItems.map((item) => (
                            <MenuItem key={item.label} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                </TextField>
            ) : (
                <Typography component='span' variant='h6'>
                    {type !== 'menu'
                        ? value
                        : menuItems.filter(
                              (menuItem) => menuItem.value === value
                          )[0].label}
                </Typography>
            )}
        </>
    );
};

export default Item;
