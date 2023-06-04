import React, {useContext, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import classes from './Chat.module.scss';
import {Navigate} from 'react-router-dom';
import Header from '../../blocks/Header/Header';
import {AuthContext} from '../../store/AuthStore';
import EnterMobile from '../../blocks/EnterMobile/EnterMobile';
import MessageInput from '../../components/MessageInput/MessageInput';
import {deleteNotification, receiveNotification, type TextMessageData} from '../../requests/requests';

export type Message = {
	chatId: string;
	message: string;
	type: 'received' | 'sent';
};

function Chat() {
	const {isLogin, handleIsLoginChange, mobileNumber, idInstance, apiTokenInstance, formattedNumber} = useContext(AuthContext);
	const [messages, setMessages] = useState<Message[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const formattedNumberRef = useRef<string>(formattedNumber);
	const prevMobileNumberRef = useRef<string>('');

	useEffect(() => {
		formattedNumberRef.current = formattedNumber;
	}, [formattedNumber]);

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

	useEffect(() => {
		if (mobileNumber !== prevMobileNumberRef.current) {
			setMessages([]);
			prevMobileNumberRef.current = mobileNumber;
		}
	}, [mobileNumber]);

	const fetchMessages = async () => {
		const processNotification = async () => {
			const notification = await receiveNotification(
				idInstance,
				apiTokenInstance,
				formattedNumberRef.current,
			);
			if (notification) {
				const {body, receiptId} = notification;
				console.log(body);
				console.log(body.typeWebhook);
				if (
					body.typeWebhook === 'incomingMessageReceived'
				) {
					const {chatId} = body.senderData;
					console.log(chatId);
					console.log(formattedNumberRef.current);
					if (chatId === formattedNumberRef.current) {
						const message = body.messageData.textMessageData.textMessage;
						console.log(body.messageData);
						setMessages((prevMessages: Message[]) => [
							...prevMessages,
							{
								chatId,
								message,
								type: 'received',
							},
						]);
					}

					console.log(messages);
				}

				await deleteNotification(idInstance, apiTokenInstance, receiptId);
			}
		};

		await processNotification();
	};

	useEffect(() => {
		const interval = setInterval(async () => {
			await fetchMessages();
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	if (!isLogin) {
		return <Navigate to='/' />;
	}

	return (
		<div className={classNames(classes.chat)}>
			<Header handleOpenModal={handleOpenModal} />
			<div className={classNames(classes.chat__messages)}>
				{messages.map((message, index) => (
					<div
						key={index}
						className={classNames(classes.chat__message, {
							[classes.sent]: message.type === 'sent',
							[classes.received]: message.type === 'received',
						})}
					>
						{message.message}
					</div>
				))}
			</div>
			{isModalOpen && <EnterMobile onClose={handleCloseModal} ref={modalRef} />}
			{mobileNumber && <MessageInput setMessages={setMessages} />}
		</div>
	);
}

export default Chat;
