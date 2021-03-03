export interface IAddress {
  name: string;
  email: string;
}

export interface IMessage {
  to: IAddress;
  from: IAddress;
  body: string;
  subject: string;
};

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>
};