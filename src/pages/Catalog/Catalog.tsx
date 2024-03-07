import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import style from './style.module.scss'
import { ChosenItemType, Item } from "../../assets/types";
import { addToCart, setAlarm } from "../../store/reducers/initialData";
import { useState } from "react";

export default function Catalog() {

    const items = useSelector((state: RootState) => state.initial.items)
    const dispatch = useDispatch()

    const addItem = (itemId: number, itemSize: string) => {
        if (itemSize == '')
            dispatch(setAlarm({ id: itemId, alarm: true }))
        else
            dispatch(addToCart({ id: itemId, size: itemSize }))
    }

    function useRenderItems() {

        const [chosenSizes, setChosenSize] = useState<ChosenItemType[]>([])

        const addSize = (itemId: number, size: string) => {
            const filtredList = chosenSizes.filter((item) => item.id == itemId)
            if (filtredList.length > 0) {
                setChosenSize(chosenSizes.map((item) => {
                    if (item.id == itemId)
                        return { ...item, size: size }
                    else
                        return item
                }))
            }
            else{
                setChosenSize((prevArr) => [...prevArr, { id: itemId, size: size }])
            }
            dispatch(setAlarm({ id: itemId, alarm: false }))
        }

        const getCurrentChosenSize = (itemId: number) => {
            if (chosenSizes.length > 0) {
                const filtredList = chosenSizes.filter((item) => item.id == itemId)
                if (filtredList.length > 0)
                    return filtredList[0].size
                else
                    return ''
            }
            else
                return ''
        }

        return items.map((item: Item) => (
            <div className={style.item}>
                <div className={style['item-img']}>
                    <img src={item.imgURL} alt={item.title} />
                </div>
                <p className={style.title}>{item.title}</p>
                <div className={style.sizes}>
                    <p>Размеры:</p>
                    <div className={style['sizes-container']}>
                        {
                            item.sizes.map((size: string) => (
                                <div className={`${style.size} ${getCurrentChosenSize(item.id) == size && style.active} ${item.alarm && style.alarmed}`} onClick={() => addSize(item.id, size)}>
                                    <p>{size}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={style['buy-block']}>
                    <p className={style.price}>{item.price} {item.currency}</p>
                    <button className={style['add-to-cart-btn']} onClick={() => addItem(item.id, getCurrentChosenSize(item.id))}>Добавить в корзину +</button>
                </div>
            </div>
        ))
    }

    return (
        <div className={style.wrapper}>
            <h1>Каталог</h1>
            <div className={style['items-container']}>
                {useRenderItems()}
            </div>
        </div>
    );
}