import { User } from "../entities/User";

export interface IUsersRepository {
	findByEmail(email: string): Promise<string>;
	save(user: User): Promise<void>;
};