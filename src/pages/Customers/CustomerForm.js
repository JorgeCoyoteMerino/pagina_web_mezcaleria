import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import DataSaverOffOutlinedIcon from '@mui/icons-material/DataSaverOffOutlined';
import { useState } from "react";
import { ref, push } from "firebase/database";
import { withRouter } from "react-router-dom";
import { database } from "../../config/firebaseConfig";


const CustomerForm = (props) => {
    const [customer, setCustomer] = useState ({
        name: '',
        lastname:'',
        email:'',
        phone:'',
        company:'',
    });

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        push(ref(database, "/customers"), customer)
        .then(() => {
            //redireccionar a /clientes
            props.history.push("/clientes");
        })
        .catch((error) => {
            console.log(error);
        });
    };


    return (
        <Paper
        sx={{
            p: 3,
        }}
        >
            <Grid container spacing={2} component="form" onSubmit={handleSubmit}
            sx={{ mt: 3, justify: 'center'}}
            >
                <Grid item container xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                <TextField
                name="name"
                required
                fullWidth
                label="Nombre"
                value={customer.name}
                onChange={handleChange}
                autoFocus
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                name="lastname"
                required
                fullWidth
                label="Apellidos"
                value={customer.lastname}
                onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                name="email"
                type="email"
                required
                fullWidth
                label="Email"
                value={customer.email}
                onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                name="phone"
                required
                fullWidth
                label="Teléfono"
                value={customer.phone}
                onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                name="company"
                required
                fullWidth
                label="Empresa"
                value={customer.company}
                onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sx={{ m: 5, texAling:'center' }}>
                <Button 
                    type="submit"
                    variant="contained"  
                    startIcon={<DataSaverOffOutlinedIcon />}>
                 Guardar cliente
                </Button>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
    );
};

export default withRouter(CustomerForm);