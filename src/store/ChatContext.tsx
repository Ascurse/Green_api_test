/* eslint-disable @typescript-eslint/no-empty-function */
import React, {createContext, useState, useContext} from 'react';
import {type TextMessageData} from '../requests/requests';

export type Message = {
	chatId: string;
	message: TextMessageData | string;
	type: 'sent' | 'received';
};

type ChatContextType = {
	messages: Message[];
	setMessages: (messages: Message[]) => void;
};

type AppProps = {
	children: React.ReactNode;
};

export const ChatContext = createContext<ChatContextType>({
	messages: [],
	setMessages() {},
});

export const ChatProvider: React.FC<AppProps> = ({children}) => {
	const [messages, setMessages] = useState<Message[]>([]);

	return (
		<ChatContext.Provider value={{messages, setMessages}}>
			{children}
		</ChatContext.Provider>
	);
};

export const useChatContext = (): ChatContextType => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error('useChatContext must be used within a ChatProvider');
	}

	return context;
};
