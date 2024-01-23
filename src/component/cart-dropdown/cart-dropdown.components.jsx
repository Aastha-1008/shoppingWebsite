import './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../context/cart.context';
import { CartDropdownContainer,EmptyMessage,CartItems } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate =useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item)=>(
                        <CartItem key={item.id} cartItem={item}/>
                    ))) : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button onClick= {goToCheckoutHandler}>Go To Checkout</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;