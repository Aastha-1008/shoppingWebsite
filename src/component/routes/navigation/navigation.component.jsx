import { Outlet,useNavigate } from "react-router-dom";
import { Fragment, useContext,useEffect } from "react";

import {ReactComponent as CrownLogo} from '../../../assets/crown.svg';
import { UserContext } from "../../../context/user.context";
import { CartContext } from "../../../context/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.components";
import { NavigationContainer,LogoContainer,NavLinksContainer ,NavLink} from "./navigation.styles.jsx";

import './navigation.styles.jsx';




const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const signOutHandler = () => {
        const res = signOutUser();
        navigate('/auth');
    }

    const {isCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(()=> {
        console.log(currentUser);
        if(currentUser){
            navigate('/shop');
        }
    },[currentUser]);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinksContainer>
                    {currentUser ? <NavLink to="/shop/">SHOP</NavLink>:<NavLink to="/auth">SHOP</NavLink>}
                    
                    {
                        currentUser ? <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>:<NavLink to="/auth">SIGN IN</NavLink>
                    }
                    <CartIcon/>
                    
                </NavLinksContainer>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
      
    );
}

export default Navigation;