import React, {type SetStateAction, useContext, useState, type ChangeEvent, type KeyboardEvent} from 'react';
import classNames from 'classnames';
import classes from './MessageInput.module.scss';
import {AuthContext} from '../../store/AuthStore';
import {postMessage} from '../../requests/requests';
import {type Message} from '../../pages/Chat/Chat';

type Props = {
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export default function MessageInput({setMessages}: Props) {
	const {
		idInstance,
		apiTokenInstance,
		formattedNumber,
		handleFormattedNumberChange,
	} = useContext(AuthContext);
	const [message, setMessage] = useState('');

	const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const handleSendMessage = async () => {
		if (message.trim() !== '') {
			await postMessage(idInstance, apiTokenInstance, formattedNumber, message);
			setMessages(prevMessages => [
				...prevMessages,
				{
					chatId: formattedNumber,
					message,
					type: 'sent',
				},
			]);
			setMessage('');
		}
	};

	const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			await handleSendMessage();
		}
	};

	return (
		<div className={classNames(classes['message-input'])}>
			<input
				type='text'
				value={message}
				onChange={handleMessageChange}
				onKeyDown={handleKeyDown}
				className={classNames(classes['message-input__input'])}
			/>
			<button
				onClick={handleSendMessage}
				className={classNames(classes['message-input__btn'])}
			>
                Отправить
			</button>
		</div>
	);
}
