import { useDispatch, useSelector } from 'react-redux';
import style from './style.module.scss'
import { RootState } from '../../store/store';
import { CartItem } from '../../assets/types';
import { addQuality, deleteItemFromCart } from '../../store/reducers/initialData';
import { MdDelete } from "react-icons/md";

export default function Cart() {

    const items = useSelector((state: RootState) => state.initial.cartItems)
    const itemsCout = useSelector((state: RootState) => {
        let cout = 0
        state.initial.cartItems.forEach((item) => cout += item.quality)
        return cout
    })
    const totalPrice = useSelector((state: RootState) =>{
        let totalPrice = 0
        state.initial.cartItems.forEach((item) => totalPrice += item.quality*item.item.price)
        return totalPrice
    })

    const dispatch = useDispatch()

    const changeQual = (itemId: number, effect: number) => dispatch(addQuality({ id: itemId, effect }))
    const deleteItemFrCart = (cartItem:CartItem) => dispatch(deleteItemFromCart(cartItem))

    const renderItems = items.map((cartItem: CartItem) => (
        <div className={style['cart-item']}>
            <img src={cartItem.item.imgURL} alt="cart_item" />
            <div className={style.info}>
                <button className={style['delete-btn']} onClick={()=>deleteItemFrCart(cartItem)}><MdDelete /></button>
                <p className={style['item-title']}>{cartItem.item.title}</p>
                <p>{cartItem.chosenSize}</p>
                <p className={style['item-total-price']}>{cartItem.item.price * cartItem.quality} ₽</p>
                <div className={style.quality}>
                    <p>Количество</p>
                    <div className={style['tool-menu']}>
                        <button className={style.tool} onClick={() => changeQual(cartItem.item.id, 1)}>+</button>
                        <p>{cartItem.quality}</p>
                        <button className={style.tool} onClick={() => changeQual(cartItem.item.id, -1)}>-</button>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <div>
            <h1>Корзина</h1>
            {itemsCout==0&&<p className={style['empty-cart-text']}><i>Добавьте товары в корзину</i></p>}
            <div className={style['items-container']}>
                {renderItems}
                <hr />
                <p className={style['total-price-text']}>Итог: {totalPrice}₽</p>
                {itemsCout>0&&<a href='https://www.tinkoff.ru/kassa/' target='_black' className={style['link-btn']}><button className={style['place-an-order-btn']}>Оформить заказ</button></a>}
            </div>
        </div>
    );
}