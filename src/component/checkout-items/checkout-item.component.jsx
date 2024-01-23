import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({cartItems}) => {
    const {name,imageUrl,price,quantity} = cartItems;
    const {clearItemFromCart,addItemToCart, removeItemToCart} = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cartItems);
    const removeItemHandler = () => removeItemToCart(cartItems);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt = {`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                {quantity}
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={()=>clearItemFromCart(cartItems)}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;