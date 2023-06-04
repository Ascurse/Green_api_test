/* eslint-disable @typescript-eslint/no-empty-function */
import React, {createContext, useState, type ChangeEvent} from 'react';

type AuthContextType = {
	idInstance: string;
	apiTokenInstance: string;
	isLogin: boolean;
	mobileNumber: string;
	formattedNumber: string;
	handleIdInstanceChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleApiTokenInstanceChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleIsLoginChange: (value: boolean) => void;
	handleMobileNumberChange: (value: string) => void;
	handleFormattedNumberChange: (value: string) => void;
};

type AppProps = {
	children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
	idInstance: '',
	apiTokenInstance: '',
	isLogin: false,
	mobileNumber: '',
	formattedNumber: '',
	handleIdInstanceChange(e: ChangeEvent<HTMLInputElement>) {},
	handleApiTokenInstanceChange(e: ChangeEvent<HTMLInputElement>) {},
	handleIsLoginChange(value: boolean) { },
	handleMobileNumberChange(value: string) { },
	handleFormattedNumberChange(value: string) { },
});

export const AuthProvider: React.FC<AppProps> = ({children}) => {
	const [idInstance, setIdInstance] = useState('');
	const [apiTokenInstance, setApiTokenInstance] = useState('');
	const [isLogin, setIsLogin] = useState(false);
	const [mobileNumber, setMobileNumber] = useState('');
	const [formattedNumber, setFormattedNumber] = useState('');

	const handleIdInstanceChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIdInstance(e.target.value);
	};

	const handleApiTokenInstanceChange = (e: ChangeEvent<HTMLInputElement>) => {
		setApiTokenInstance(e.target.value);
	};

	const handleIsLoginChange = (value: boolean) => {
		setIsLogin(value);
	};

	const handleMobileNumberChange = (value: string) => {
		setMobileNumber(value);
	};

	const handleFormattedNumberChange = (value: string) => {
		setFormattedNumber(value);
	};

	const authContextValue: AuthContextType = {
		idInstance,
		apiTokenInstance,
		isLogin,
		mobileNumber,
		formattedNumber,
		handleIdInstanceChange,
		handleApiTokenInstanceChange,
		handleIsLoginChange,
		handleMobileNumberChange,
		handleFormattedNumberChange,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};
