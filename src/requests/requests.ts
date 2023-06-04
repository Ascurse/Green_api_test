import axios, {type AxiosResponse} from 'axios';

type SettingsData = {
	wid: string;
	countryInstance: string;
	typeAccount: string;
	webhookUrl: string;
	webhookUrlToken: string;
	delaySendMessagesMilliseconds: number;
	markIncomingMessagesReaded: string;
	markIncomingMessagesReadedOnReply: string;
	sharedSession: string;
	outgoingWebhook: string;
	outgoingMessageWebhook: string;
	outgoingAPIMessageWebhook: string;
	incomingWebhook: string;
	deviceWebhook: string;
	statusInstanceWebhook: string;
	stateWebhook: string;
	enableMessagesHistory: string;
	keepOnlineStatus: string;
};

type Status = {
	statusInstance: string;
};

type WebhookMessage = {
	receiptId: number;
	body: WebhookMessageBody;
};

type WebhookMessageBody = {
	typeWebhook: string;
	instanceData: InstanceData;
	timestamp: number;
	idMessage: string;
	senderData: SenderData;
	messageData: MessageData;
};

type InstanceData = {
	idInstance: number;
	wid: string;
	typeInstance: string;
};

type SenderData = {
	chatId: string;
	sender: string;
	senderName: string;
};

type MessageData = {
	typeMessage: string;
	textMessageData: TextMessageData;
};

export type TextMessageData = {
	textMessage: string;
};

type PostMessageData = {
	chatId: string;
	message: string;
};

type DeleteNotification = {
	result: boolean;
};

export async function fetchSettings(idInstance: string, apiTokenInstance: string): Promise<SettingsData> {
	const url = `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`;

	try {
		const response = await axios.post<SettingsData>(url);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function setSettings(idInstance: string, apiTokenInstance: string): Promise<SettingsData> {
	const url = `https://api.green-api.com/waInstance${idInstance}/setSettings/${apiTokenInstance}`;

	const payload = {
		webhookUrl: '',
		outgoingWebhook: 'yes',
		stateWebhook: 'yes',
		incomingWebhook: 'yes',
	};

	try {
		const response = await axios.post<SettingsData>(url, payload);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function fetchStatus(idInstance: string, apiTokenInstance: string): Promise<Status> {
	const url = `https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`;

	try {
		const response = await axios.get<Status>(url);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function receiveNotification(idInstance: string, apiTokenInstance: string, chatId: string): Promise<WebhookMessage> {
	const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?chatId=${chatId}`;

	try {
		const response = await axios.get<WebhookMessage>(url);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function postMessage(idInstance: string, apiTokenInstance: string, chatId: string, message: string): Promise<WebhookMessage> {
	const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

	const requestBody: PostMessageData = {
		chatId,
		message,
	};

	try {
		const response = await axios.post<WebhookMessage>(url, requestBody);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function deleteNotification(idInstance: string, apiTokenInstance: string, receiptId: number): Promise<boolean> {
	const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

	try {
		const requestBody = {
			receiptId,
		};
		const response = await axios.delete<DeleteNotification>(url);
		console.log(response);
		return response.data.result;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
