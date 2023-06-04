import React, {forwardRef, ChangeEvent, useContext} from 'react';
import classNames from 'classnames';
import classes from './Auth.module.scss';
import {AuthContext} from '../../store/AuthStore';
import {
	fetchSettings,
	fetchStatus,
	setSettings,
} from '../../requests/requests';

type Props = {
	className?: string;
	onClose: () => void;
};

const Auth = forwardRef<HTMLDivElement, Props>(
	({className, onClose}, ref) => {
		const {
			idInstance,
			apiTokenInstance,
			handleApiTokenInstanceChange,
			handleIdInstanceChange,
			handleIsLoginChange,
			isLogin,
		} = useContext(AuthContext);

		const handleSubmit = async (event: React.FormEvent) => {
			event.preventDefault();

			await fetchSettings(idInstance, apiTokenInstance);
			const status = await fetchStatus(idInstance, apiTokenInstance);
			if (status?.statusInstance === 'online') {
				await setSettings(idInstance, apiTokenInstance);
				handleIsLoginChange(true);
			}

			onClose();
		};

		return (
			<div className={classNames(classes.modalBackdrop)}>
				<div ref={ref} className={classNames(classes.auth, className)}>
					<h2 className={classNames(classes.auth__header)}>
            Войти в личный кабинет
					</h2>
					<form
						className={classNames(classes['auth__form-wrapper'])}
						onSubmit={handleSubmit}
					>
						<input
							className={classNames(classes['auth__form-item'])}
							placeholder='idInstance'
							value={idInstance}
							onChange={handleIdInstanceChange}
						/>
						<input
							className={classNames(classes['auth__form-item'])}
							placeholder='apiTokenInstance'
							value={apiTokenInstance}
							onChange={handleApiTokenInstanceChange}
						/>
						<button type='submit' className={classNames(classes.auth__btn)}>
              Войти
						</button>
					</form>
				</div>
			</div>
		);
	},
);

Auth.displayName = 'Auth';

export default Auth;
