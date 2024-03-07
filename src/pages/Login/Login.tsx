import style from './style.module.scss'

export default function Login() {
    return (
        <div>
            <h1 className={style.title}>Авторизация</h1>
            <div className={style['auth']}>
                <input type="text" placeholder='Логин' />
                <input type="password" placeholder='Пароль' />
                <a href='#' className={style['forgot-password-text']}>Забыли пароль?</a>
                <button>Войти</button>
            </div>
        </div>
    );
}