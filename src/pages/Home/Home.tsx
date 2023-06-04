import React, {useContext, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import classes from './Home.module.scss';
import {Navigate} from 'react-router-dom';
import Auth from '../../blocks/Auth/Auth';
import Header from '../../blocks/Header/Header';
import {AuthContext} from '../../store/AuthStore';

function Home() {
	const {
		isLogin,
		handleIsLoginChange,
	} = useContext(AuthContext);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutsideModal = (event: MouseEvent) => {
			if (
				modalRef.current
        && !modalRef.current.contains(event.target as Node)
			) {
				setIsModalOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutsideModal);
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideModal);
		};
	}, []);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	if (isLogin) {
		return <Navigate to='/chat' />;
	}

	return (
		<div className={classNames(classes.home)}>
			<Header handleOpenModal={handleOpenModal} />
			{/* <img
				className={classNames(classes.home__logo)}
				src={myLogo}
				alt='logo gif'
			/> */}
			{isModalOpen && <Auth onClose={handleCloseModal} ref={modalRef} />}
		</div>
	);
}

export default Home;
