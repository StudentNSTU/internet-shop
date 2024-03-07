import { Link } from 'react-router-dom';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Header() {

    const itemsCout = useSelector((state: RootState) => {
        let cout = 0
        state.initial.cartItems.forEach((item) => cout += item.quality)
        return cout
    })

    return (
        <div className={style.wrapper}>
            <ul className={style.toolmenu}>
                <li><Link to={'/'} className={style.link}>Главная</Link></li>
                <li>Обувь</li>
                <li>Электроника</li>
                <li>Premium</li>
                <li>Акции</li>
                <li><Link to={'/cart'} className={style.link}>Корзина {itemsCout > 0 && `(${itemsCout})`}</Link></li>
                <li><Link to={'/login'} className={style.link}>Войти</Link></li>
            </ul>
        </div>
    );
}