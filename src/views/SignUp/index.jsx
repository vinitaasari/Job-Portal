import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './../../auth-helper'
import { Redirect } from 'react-router-dom'
import { signup } from '../../api'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default function Signin(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        name:'',
        email: '',
        password: '',
        role_type:'',
        error: '',
        redirectToReferrer: false
    })

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            role_type: parseInt(values.role_type) || 0,

            email: values.email || undefined,
            password: values.password || undefined
        }

        signup(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                console.log(data)
                auth.authenticate(data, () => {
                    console.log("here");
                    setValues({ ...values, error: '' });
                    window.location.href = "/admin/login"
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const { redirectToReferrer } = values
    if (redirectToReferrer) {
        console.log("here")
        return (<Redirect to="/admin/login" />)
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Sign In
          </Typography>
          <TextField id="name" type="text" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal" /><br />
          <TextField id="role" type="number" label="Role" className={classes.textField} value={values.role} onChange={handleChange('role_type')} margin="normal" /><br />
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal" /><br />
                <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" />
                <br /> {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}
                    </Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
    )
}