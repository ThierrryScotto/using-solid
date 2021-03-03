import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
	constructor(
		private userRepository: IUsersRepository,
		private mailProvider: IMailProvider
	) { }

	async execute(data: ICreateUserDTO) {
		const userAlreadyExist = this.userRepository.findByEmail(data.email);

		if (userAlreadyExist) {
			throw new Error('User already exists.');
		}

		const user = new User(data);

		await this.userRepository.save(user);

		this.mailProvider.sendMail({
			to: {
				name: data.name,
				email: data.email
			},
			from: {
				name: 'anyway',
				email: 'thierryscottoti@gmail.com'
			},
			body: '<b>My test send mail from api with typescript<b>',
			subject: 'Open my email, please'
		})
	}
}