import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom'
import Products from "./products/Products";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/cart";
import NotFound from "./utils/NotFound";
import DetailProducts from "./DetailProducts/DetailProducts";
import OrderHistory from "./history/orderHistory";
import OrderDetails from "./history/orderDetails";
import Categories from "./categories/categories";
import CreateProduct from "./createProduct/createProduct";
import StockForm from "./utils/StockForm";
import ContactForm from './utils/Emailer'
import {GlobalState} from "../../GlobalState";

function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin;

    return (
       <Switch>
           <Route path={'/'} exact component={Products} />
           <Route path={'/detail/:id'} exact component={DetailProducts} />

           <Route path={'/login'} exact component={isLogged ? NotFound : Login} />
           <Route path={'/register'} exact component={isLogged ? NotFound : Register} />

           <Route path={'/category'} exact component={isAdmin ? Categories : NotFound} />
           <Route path={'/create_product'} exact component={isAdmin ? CreateProduct : NotFound} />
           <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />
           <Route path={'/Inventory'} exact component={isAdmin ? StockForm : NotFound} />

           <Route path={'/cart'} exact component={Cart} />

           <Route path={'/history'} exact component={isLogged ? OrderHistory : NotFound} />
           <Route path={'/history/:id'} exact component={isLogged ? OrderDetails : NotFound} />

           <Route path={'/email'} exact component={isLogged ? ContactForm : NotFound} />

           <Route path={'*'} exact component={NotFound} />
       </Switch>
    );
}

export default Pages;