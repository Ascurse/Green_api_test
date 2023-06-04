import React, {useContext} from 'react';
import classNames from 'classnames';
import classes from './Header.module.scss';
import {AuthContext} from '../../store/AuthStore';

type Props = {
	className?: string;
	handleOpenModal: (() => void);
};

export default function Header({className, handleOpenModal}: Props) {
	const {isLogin, handleIsLoginChange, mobileNumber, handleMobileNumberChange} = useContext(AuthContext);
	const handleLogout = () => {
		handleMobileNumberChange('');
		handleIsLoginChange(false);
	};

	return (
		<nav className={classNames(classes.header, className)}>
			<div className={classNames(classes.header__mobile)}>{mobileNumber && mobileNumber}</div>
			{isLogin ? (
				<div className={classNames(classes['header__btn-wrapper'])}>
					<button className={classNames(classes.header__btn)} onClick={handleOpenModal}>Новый чат</button>
					<button className={classNames(classes.header__btn)} onClick={handleLogout}>Выйти</button>
				</div>
			) : (
				<button
					className={classNames(classes.header__btn)}
					onClick={handleOpenModal}
				>
        Вход
				</button>
			)}
		</nav>
	);
}
