import React, {forwardRef, type ChangeEvent, useContext, useState} from 'react';
import classNames from 'classnames';
import classes from './EnterMobile.module.scss';
import {AuthContext} from '../../store/AuthStore';
import {receiveNotification} from '../../requests/requests';
import {useForm} from 'react-hook-form';

type Props = {
	className?: string;
	onClose: () => void;
};

type FormInputs = {
	mobileNumber: string;
};

const EnterMobile = forwardRef<HTMLDivElement, Props>(
	({className, onClose}, ref) => {
		const {idInstance, apiTokenInstance, handleMobileNumberChange, formattedNumber, handleFormattedNumberChange}
            = useContext(AuthContext);
		const {
			register,
			handleSubmit,
			formState: {errors},
		} = useForm<FormInputs>();

		const convertToWhatsAppFormat = (mobileNumber: string) => {
			const cleanedNumber = mobileNumber.replace(/\D/g, '');

			let formattedNumber = cleanedNumber;
			if (!formattedNumber.startsWith('7')) {
				formattedNumber = '7' + formattedNumber;
			}

			formattedNumber += '@c.us';

			return formattedNumber;
		};

		const onSubmit = async (data: FormInputs) => {
			handleMobileNumberChange(data.mobileNumber);
			const whatsappNumber = convertToWhatsAppFormat(data.mobileNumber);
			handleFormattedNumberChange(whatsappNumber);

			onClose();
		};

		return (
			<div className={classNames(classes.modalBackdrop)}>
				<div
					ref={ref}
					className={classNames(classes['enter-mobile'], className)}
				>
					<h2 className={classNames(classes['enter-mobile__header'])}>
                        Введите номер телефона получателя
					</h2>
					<form
						className={classNames(classes['enter-mobile__form-wrapper'])}
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							className={classNames(classes['enter-mobile__form-item'], {
								[classes['enter-mobile__form-item--error']]:
                  errors.mobileNumber,
							})}
							placeholder='Номер телефона'
							{...register('mobileNumber', {
								required: true,
								pattern: /^(?:\+7|7)\d{10}$/,
							})}
						/>
						{errors.mobileNumber && (
							<span
								className={classNames(classes['enter-mobile__error-message'])}
							>
                                Мобильный номер должен быть в формате +7xxxxxxxxxx или
                                7xxxxxxxxxx
							</span>
						)}
						<button
							type='submit'
							className={classNames(classes['enter-mobile__btn'])}
						>
                            Начать чат
						</button>
					</form>
				</div>
			</div>
		);
	},
);

EnterMobile.displayName = 'EnterMobile';

export default EnterMobile;
