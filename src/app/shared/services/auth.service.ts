import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class AuthService {
	public authenticatedSubject: Subject<boolean>;

	constructor(
	) {
		this.authenticatedSubject = new BehaviorSubject(true);
	}

	/**
	 * Check current user is authenticated
	 * @returns boolean
	 */
	public isAuthenticated(): boolean {
		return !!this.getCurrentUser();
	}

	/**
	 * Get current user object
	 * @returns Parse.User
	 */
	public getCurrentUser(): Parse.User {
		return Parse.User.current();
	}

	/**
	 * Parse Login
	 * @param userName
	 * @param password
	 *
	 * @returns Parse.User
	 */
	public async login(userName: string, password: string): Promise<Parse.User> {
		try {
			let user = await Parse.User.logIn(userName, password);
			this.authenticatedSubject.next(true);
			return user;
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Parse Logout
	 * @returns Promise
	 */
	public async logout() {
		// this.authenticatedSubject.next(false);
		Parse.User.logOut()
			.then((res: any) => {
				return true;
			})
			.catch((error: any) => {
				return true;
			});
	}

}
