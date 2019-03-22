import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { config } from '../config/index';

@Injectable()

export class ParseService {

	constructor() {
		Parse.initialize(config.APP_ID, null, config.MASTER_KEY);
		Parse.serverURL = config.SERVER_URL;
	}

	executeCMD() {
		return new Promise(function (resolve, reject) {
			Parse.Cloud.run('cmd-run-robot')
				.then(function (res: any) {
					resolve(res);
					console.log('Parse Run success', res);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}

	saveFile(content: string) {
		return new Promise(function (resolve, reject) {
			Parse.Cloud.run('saveFile', {
				content: content,
			})
				.then(function (res: any) {
					// ratings is 4.5
					resolve(res);
					console.log('Parse Run success', res);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}

	getLog() {
		return new Promise(function (resolve, reject) {
			Parse.Cloud.run('getLog', {
			})
				.then(function (res: any) {
					// ratings is 4.5
					resolve(res);
					console.log('Parse Run success', res);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	}


}
