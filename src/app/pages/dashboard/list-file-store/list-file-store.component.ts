import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ParseService } from '../../../shared/services/parse.service';

@Component({
	selector: 'list-file-store-cmp',
	templateUrl: './list-file-store.component.html',
	styleUrls: ['list-file-store.component.scss'],
})
export class ListFileStoreComponent {
	private listFiles = [];
	constructor(
		public nbDialogRef: NbDialogRef<ListFileStoreComponent>,
		public parseService: ParseService,
	) {
		let self = this;
		this.parseService.getFileStore()
			.then(function (result: Array<any>) {
				self.listFiles = result;
			})
			.catch(function (err) {
				console.log(err);
			});
	}

	onItemClick(item) {
		this.nbDialogRef.close(item);
	}
}
