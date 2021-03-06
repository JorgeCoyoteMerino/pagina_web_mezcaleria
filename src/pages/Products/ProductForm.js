import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import {ref,push, update} from 'firebase/database';
import {database,storage} from '../../config/firebaseConfig';
import {ref as stRef,uploadBytes,getDownloadURL} from 'firebase/storage';
import { withRouter, useLocation } from "react-router-dom";
import {Input} from "@mui/material";

const ProductForm=(props)=>{
    const location = useLocation();
    
    const [product,setProduct]=useState({
        sku:'',
        description:'',
        price:'',
        stock:'',
        image:'',

    });
     
const [image,setImage]=useState(null);
    
    const handleChangue=(e)=>{
        setProduct({
            ...product,
            [e.target.name]:e.target.value,

        });
    }; 
const handleImage=(e)=>{
if(!e.target.files[0]) return;
const file =e.target.files[0];
setImage({
    type:file.type.split("/")[1],
    file
});
}

const saveProduct=(item)=>{
    if(item.id) {
        const data = { ...item};
        delete data.id;
        update(ref(database, `/products/${item.id}`), data)
        .then (()=>{
            props.history.push("/productos");
        })
        .catch((error)=>{
            console.log(error);
        });

    } else {
    push(ref(database,"/products"),item)
    .then (()=>{
        props.history.push("/productos");
    })
    .catch((error)=>{
        console.log(error);
    });
    }
};

const handleSubmit=(e)=>{
e.preventDefault();

if(image){
    const imageName=`img_${Date.now()}.${image.type}`;
    const imageRef =stRef(storage,`/products/${imageName}`);

    uploadBytes(
        stRef(storage,imageRef),
        image.file
    )
    .then(()=>{
        //guardar en la base datos

        // primero obtner la url
        getDownloadURL(imageRef)
        .then((url)=>{
            setProduct({
                ...product,
                image:url
            });
            saveProduct({...product,image:url});
        },
        (error)=>{
            console.log(error);
        });

    })

    } else{
        saveProduct(product);
    }
};

useEffect(() => {
    if (location?.state?.product){
        setProduct({ ...location.state.product });
    }
}, [location]);

    return(
        <Paper
        sx={{
            p: 3,
        }}
        >
            <Grid container spacing={12} component="form" onSubmit={handleSubmit}
               sx={{mt:3, justifyContent:'center'}}
            >
                <Grid item container xs={12}md={6} spacing={12}>
                    <Grid item xs={12}>
                        <TextField
                        name="sku"
                        required
                        fullWidth
                        label="Producto"
                        value={product.sku}
                        onChange={handleChangue}
                        autoFocus
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField
                        name="description"
                        required
                        fullWidth
                        label="Descripcci??n"
                        value={product.description}
                        onChange={handleChangue}
       
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField
                        name="stock"
                        required
                        fullWidth
                        label="Existencias"
                        value={product.stock}
                        onChange={handleChangue}
                        />
                 </Grid>
                 <Grid item xs={12}>
                        <TextField
                        name="price"
                        required
                        fullWidth
                        label="Precio"
                        value={product.price}
                        onChange={handleChangue}
                        />
                 </Grid>
                 <Grid item xs={12}>
                     <Input
                     type="file"
                     accept="image/*"
                     name="productImage"
                     id="productImage"
                     onChange={handleImage}
                     style={{with:'1px'}}
                     />
                     <label htmlFor="productImage">
                        <Button variant="contained" component="span" style ={{marginLeft:-1}}>
                          Imagen de producto
                        </Button>
                        {image && (<span style={{ marginLeft:'13' }}>
                            
                            {image.file.name}
                            </span>)}
                     </label>

                  </Grid>
                  {product.image && (
                      <Grid item xs={12} sx={{m:5,textAlign:'center'}}>
                          <img src={product.image}
                          style={{ height:'120px', width:'auto', fitObject: 'center' }}
                          />
                        </Grid>
                  )}
                  <Grid item xs={12} sx={{m:5,textAlign:'center'}}>
                  <Button 
                        type="submit"
                        variant="conteined " startIcon={<SaveIcon />}>
                        Guardar producto
                    </Button>
                </Grid>
               </Grid>
             </Grid>
         </Paper> 
         
         );

};
export default withRouter(ProductForm);