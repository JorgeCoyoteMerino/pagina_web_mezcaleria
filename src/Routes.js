import { Route, Switch } from 'react-router-dom';

//pages
import Customers from './pages/Customers';
import CustomerForm from './pages/Customers/CustomerForm';
import Products from './pages/Products';
import ProductForm from './pages/Products/ProductForm';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Customers} />
        <Route exact path="/clientes" component={Customers} />
        <Route exact path="/clientes/agregar" component={CustomerForm} />
        <Route exact path="/productos" component={Products} />
        <Route exact path="/productos/agregar" component={ProductForm} />
        <Route exact path="/productos/editar" component={ProductForm} />
         <Route exact path="/productos/editar" component={ProductForm} />
    </Switch>
);

export default Routes;