import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import * as Parse from 'parse';
import { Router } from '@angular/router';


@Component({
	moduleId: module.id,
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	public form = {
		'components': [
			{
				'label': 'Username',
				'placeholder': '',
				'showWordCount': false,
				'showCharCount': false,
				'protected': true,
				'persistent': false,
				'tableView': true,
				'type': 'textfield',
				'allowMultipleMasks': false,
				'input': true,
				'key': 'id',
				'defaultValue': '',
				'validateOn': 'blur',
				'validate': {
					'required': true,
					'unique': false,
					'customMessage': '',
					'json': '',
					'minLength': 4,
					'maxLength': 100,
				},
				'inputFormat': 'plain',
				'widget': {
					'type': '',
				},
				'customClass': 'border-input',
			},
			{
				'label': 'Password',
				'placeholder': '',
				'showWordCount': false,
				'showCharCount': false,
				'protected': true,
				'tableView': true,
				'type': 'password',
				'input': true,
				'key': 'password',
				'defaultValue': '',
				'validateOn': 'blur',
				'validate': {
					'required': true,
					'unique': false,
					'customMessage': '',
					'json': '',
					'minLength': 4,
					'maxLength': 100,
				},
				'inputFormat': 'plain',
				'widget': {
					'type': '',
				},
				'customClass': 'border-input',
			},
			{
				'label': 'LOGIN',
				'theme': 'primary',
				'shortcut': 'Enter',
				'customClass': 'text-center btn-login btn-fill',
				'disableOnInvalid': true,
				'mask': false,
				'tableView': true,
				'type': 'button',
				'key': 'submit',
				'input': true,
				'validate': {
					'unique': false,
					'customMessage': '',
					'json': '',
					'minLength': 4,
					'maxLength': 100,
				},
				'conditional': {
					'show': '',
					'when': '',
					'json': '',
				},
				'logic': [],
				'customConditional': '',
				'properties': {},
				'tags': [],
			},
		],
	};
	constructor(
		private authService: AuthService,
		private router: Router,
	) { }

	ngOnInit() {
		console.log('ngOnInit');
	}

	onLoginSubmit(event) {
		console.log(event.form);
		this.authService.login(event.data.id, event.data.password)
			.then((res: any) => {
				console.log(res);
				this.router.navigate(['pages']);
			})
			.catch((error: Parse.Error) => {
				console.log(error);
				alert('Sai tài khoản hoặc mật khẩu');
			});
	}

}
