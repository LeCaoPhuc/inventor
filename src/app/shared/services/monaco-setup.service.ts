import { Injectable } from '@angular/core';
import { languages, Range } from 'monaco-editor/esm/vs/editor/editor.api';
import * as builtIn from '../../../assets/robot-language/keyword/builtIn.json';
import * as dialogs from '../../../assets/robot-language/keyword/dialogs.json';
import * as operatingSystem from '../../../assets/robot-language/keyword/operatingSystem.json';
import * as process from '../../../assets/robot-language/keyword/process.json';
import * as screenshot from '../../../assets/robot-language/keyword/screenshot.json';
import * as seleniumLibrary from '../../../assets/robot-language/keyword/seleniumLibrary.json';
import * as string from '../../../assets/robot-language/keyword/string.json';
import * as telnet from '../../../assets/robot-language/keyword/telnet.json';
import * as xml from '../../../assets/robot-language/keyword/xml.json';
import * as special from '../../../assets/robot-language/keyword/special.json';
import { ShareDataService } from './share-data.service';

@Injectable()

export class MonacoSetupService {
	public monaco: any;
	private filePath = '../../../assets/robot-language/keyword/Dialogs.json';
	constructor(
		public shareDataService: ShareDataService,
	) {
	}
	public initNewLanguage(monaco: any) {
		if (!this.monaco) {
			this.monaco = monaco;
		}

		monaco.languages.register({ id: 'robotLanguage' });
		let jsonData: any = this.getDataJson();
		let tokenizerRoot = this.generateTokenRootAndKeywordLanguage(monaco);
		let tokenizerRootSpecialSections = this.generateTokenRootSpecialKeywordSelection(monaco);
		let tokenizerRootSpecialTestCaseKeyword = this.generateTokenRootSpecialKeywordTestCaseKeyword(monaco);
		let tokenizerRootSpecialSettingsKeyword = this.generateTokenRootSpecialKeywordSettingKeyword(monaco);
		let tokenizerRootFunctionComment = this.generateTokenRootComment(monaco);
		let tokenizerRootFunctionTestCase = this.functionTestCase(monaco);
		let tokenizerRootVariable = this.generateTokenRootVariable(monaco);
		monaco.languages.setMonarchTokensProvider('robotLanguage', {
			tokenizer: {
				root: tokenizerRoot.concat(tokenizerRootSpecialSections,
					tokenizerRootSpecialTestCaseKeyword, tokenizerRootSpecialSettingsKeyword,
					tokenizerRootFunctionComment, tokenizerRootFunctionTestCase, tokenizerRootVariable),
			},
		});

		let rulesList = [];
		for (let j = 0; j < tokenizerRoot.length; j++) {
			rulesList.push({ token: tokenizerRoot[j][1], foreground: 'a26d26' });
		}
		let rulesListSections = [];
		for (let j = 0; j < tokenizerRootSpecialSections.length; j++) {
			rulesListSections.push({ token: tokenizerRootSpecialSections[j][1], foreground: 'ff0000' });
		}
		let rulesListTestCaseKeyword = [];
		for (let j = 0; j < tokenizerRootSpecialTestCaseKeyword.length; j++) {
			rulesListTestCaseKeyword.push({ token: tokenizerRootSpecialTestCaseKeyword[j][1], foreground: '0000ff' });
		}

		let rulesListSettingKeyword = [];
		for (let j = 0; j < tokenizerRootSpecialSettingsKeyword.length; j++) {
			rulesListSettingKeyword.push({ token: tokenizerRootSpecialSettingsKeyword[j][1], foreground: '0000ff' });
		}

		let rulesListFunctionComment = [];
		for (let j = 0; j < tokenizerRootFunctionComment.length; j++) {
			rulesListFunctionComment.push({
				token: tokenizerRootFunctionComment[j][1],
				foreground: '608b46', fontStyle: 'italic',
			});
		}
		let rulesListFunctionTestCase = [];
		for (let j = 0; j < tokenizerRootFunctionTestCase.length; j++) {
			rulesListFunctionTestCase.push({ token: tokenizerRootFunctionTestCase[j][1], foreground: 'ab7726' });
		}

		let rulesListVariableToken = [];
		for (let j = 0; j < tokenizerRootVariable.length; j++) {
			rulesListVariableToken.push({ token: tokenizerRootVariable[j][1], foreground: '008ec3' });
		}
		monaco.editor.defineTheme('robotTheme', {
			base: 'vs',
			inherit: false,
			rules: rulesList.concat(rulesListSections, rulesListTestCaseKeyword,
				rulesListSettingKeyword, rulesListFunctionComment,
				rulesListFunctionTestCase, rulesListVariableToken),
		});
	}

	private setupSuggestion(): Array<languages.CompletionItem> {
		let suggestions: Array<languages.CompletionItem> = [];
		return suggestions;
	}

	private generateTokenRootAndKeywordLanguage(monaco) {
		let jsonData: any = this.getDataJson();
		let tokenizerRoot = [];
		for (let i = 0; i < jsonData.length; i++) {
			if (jsonData[i].name === 'Comment') {
				continue;
			}
			let re = new RegExp(jsonData[i].name + '\t', 'g');

			let keyword = jsonData[i].name.replace(/ /g, '-');
			keyword = keyword.toLowerCase();
			tokenizerRoot.push([re, keyword]);
			let args = '';
			if (jsonData[i].args) {
				for (let j = 0; j < jsonData[i].args.length; j++) {
					args += ('\t\t' + '${' + (j + 1) + ':' + jsonData[i].args[j] + '}');
				}
				if (args === '') {
					args += '\t\t';
				}
			} else {
				args += '\t\t';
				console.log('jsonData[i].name + args ', jsonData[i].name + args);
			}
			if (i === 0) {
				console.log(re);
				console.log(args);
			}
			monaco.languages.registerCompletionItemProvider('robotLanguage', {
				provideCompletionItems: () => {
					let suggestions = [{
						label: jsonData[i].name,
						kind: 17,
						insertText: jsonData[i].name + args,
						insertTextRules: 4,
						documentation: jsonData[i].doc,
						range: null,
					}];
					return { suggestions: suggestions };
				},
			});
		}
		return tokenizerRoot;
	}

	private generateTokenRootSpecialKeywordSelection(monaco) {
		let jsonDataSpecialSections: any = special.sections;
		let tokenizerRootSpecialSections = [];
		for (let i = 0; i < jsonDataSpecialSections.length; i++) {
			let parseRegKeyword = jsonDataSpecialSections[i].name.replace(/\*/g, '/*');
			let re = new RegExp(parseRegKeyword, 'g');
			let keyword = jsonDataSpecialSections[i].name.replace(/ /g, '-');
			keyword = keyword.toLowerCase();
			tokenizerRootSpecialSections.push([re, keyword]);
			let args = '\n';
			monaco.languages.registerCompletionItemProvider('robotLanguage', {
				provideCompletionItems: () => {
					let suggestions = [{
						label: jsonDataSpecialSections[i].name,
						kind: 17,
						insertText: jsonDataSpecialSections[i].name + args,
						insertTextRules: 1,
						documentation: jsonDataSpecialSections[i].doc,
						range: null,
					}];
					return { suggestions: suggestions };
				},
			});
		}
		return tokenizerRootSpecialSections;
	}

	private generateTokenRootSpecialKeywordTestCaseKeyword(monaco) {
		let jsonDataSpecialTestCaseKeyword: any = special.testCasesKeyWord;
		let tokenizerRootSpecialTestCaseKeyword = [];
		for (let i = 0; i < jsonDataSpecialTestCaseKeyword.length; i++) {
			let parseRegKeyword = ' ' + jsonDataSpecialTestCaseKeyword[i].name.replace(/\[/, '\\[').replace(/\]/, '\\]');
			let re = new RegExp(parseRegKeyword, 'g');
			let keyword = '[' + jsonDataSpecialTestCaseKeyword[i].name.replace(/ /g, '-') + ']';
			keyword = keyword.toLowerCase();
			tokenizerRootSpecialTestCaseKeyword.push([re, keyword]);
			let args = '';
			if (jsonDataSpecialTestCaseKeyword[i].args) {
				for (let j = 0; j < jsonDataSpecialTestCaseKeyword[i].args.length; j++) {
					args += ('\t\t' + '${' + (j + 1) + ':' + jsonDataSpecialTestCaseKeyword[i].args[j] + '}');
				}
				if (args === '') {
					args += '\t\t';
				}
			} else {
				args += '\t\t';
			}
			monaco.languages.registerCompletionItemProvider('robotLanguage', {
				provideCompletionItems: () => {
					let insertText = '[' + jsonDataSpecialTestCaseKeyword[i].name.replace(/\[/g, '').replace(/\]/g, '') + ']';
					let suggestions = [{
						label: jsonDataSpecialTestCaseKeyword[i].name,
						kind: 17,
						insertText: insertText + args,
						insertTextRules: 4,
						documentation: jsonDataSpecialTestCaseKeyword[i].doc,
						range: null,
					}];
					return { suggestions: suggestions };
				},
			});
		}
		return tokenizerRootSpecialTestCaseKeyword;
	}

	private generateTokenRootSpecialKeywordSettingKeyword(monaco) {
		let jsonDataSpecialSettingsKeyword: any = special.settingsKeyWord;
		let tokenizerRootSpecialSettingsKeyword = [];
		for (let i = 0; i < jsonDataSpecialSettingsKeyword.length; i++) {
			let parseRegKeyword = '^' + jsonDataSpecialSettingsKeyword[i].name;
			let re = new RegExp(parseRegKeyword, 'g');
			let keyword = jsonDataSpecialSettingsKeyword[i].name.replace(/ /g, '-');
			keyword = keyword.toLowerCase();
			tokenizerRootSpecialSettingsKeyword.push([re, keyword]);
			let args = '';
			if (jsonDataSpecialSettingsKeyword[i].args) {
				for (let j = 0; j < jsonDataSpecialSettingsKeyword[i].args.length; j++) {
					args += ('\t\t' + '${' + (j + 1) + ':' + jsonDataSpecialSettingsKeyword[i].args[j] + '}');
				}
				if (args === '') {
					args += '\t\t';
				}
			} else {
				args += '\t\t';
			}
			monaco.languages.registerCompletionItemProvider('robotLanguage', {
				provideCompletionItems: () => {
					let suggestions = [{
						label: jsonDataSpecialSettingsKeyword[i].name,
						kind: 17,
						insertText: jsonDataSpecialSettingsKeyword[i].name + args,
						insertTextRules: 4,
						documentation: jsonDataSpecialSettingsKeyword[i].doc,
						range: null,
					}];
					return { suggestions: suggestions };
				},
			});
		}
		return tokenizerRootSpecialSettingsKeyword;
	}

	private functionTestCase(monaco) {
		let functionTestCaseListRoot = [];
		let functionTestCase = /^[^\s\*\$](.*|\n|\r|\r\n)[^\s]$/g;
		let keywordFunctionTestCase = 'functionTestCase';
		functionTestCaseListRoot.push([functionTestCase, keywordFunctionTestCase]);

		// let functionTestCaseCalled = /(^\*[^\t\n\|]+)/g;
		// let functionTestCaseCalled = /(^\*[^*]+)/g;
		// let keywordFunctionTestCaseCalled = 'functionTestCaseCalled';
		// functionTestCaseListRoot.push([functionTestCaseCalled, keywordFunctionTestCaseCalled]);

		return functionTestCaseListRoot;
	}
	private generateTokenRootVariable(monaco) {
		let variableTokenListRoot = [];
		let variableToken = /(?:(&lt;!\\)?|(&lt;=\\\\)?)([$@&amp;%]\{)(.*?)(\})( ?=)?/g;
		let keywordVariableToken = 'variableToken';
		variableTokenListRoot.push([variableToken, keywordVariableToken]);

		return variableTokenListRoot;
	}

	private generateTokenRootComment(monaco) {
		let commentListRoot = [];
		let cmtKey = 'Comment';
		let re = new RegExp('Comment' + '\t.*', 'g');
		let keyword = 'comment';
		commentListRoot.push([re, keyword]);
		monaco.languages.registerCompletionItemProvider('robotLanguage', {
			provideCompletionItems: () => {
				let suggestions = [{
					label: cmtKey,
					kind: 17,
					insertText: cmtKey + ('\t\t' + '${' + 1 + ':' + 'message' + '}'),
					insertTextRules: 4,
					documentation: cmtKey,
					range: null,
				}];
				return { suggestions: suggestions };
			},
		});

		let regCmt = new RegExp('(?:^ ?|\t+| {2,})(#.*)$', 'g');
		let keywordCmt = '#comment';
		commentListRoot.push([regCmt, keywordCmt]);
		return commentListRoot;
	}
	private getDataJson() {
		if (this.shareDataService.getData('jsonDataFull')) {
			return JSON.parse(this.shareDataService.getData('jsonDataFull'));
		}
		let builtInJson = builtIn['default'].keywords;
		let dialogsJson = dialogs.keywords;
		let operatingSystemJson = operatingSystem.keywords;
		let processJson = process.keywords;
		let screenshotJson = screenshot.keywords;
		let seleniumLibraryJson = seleniumLibrary.keywords;
		let stringJson = string.keywords;
		let telnetJson = telnet.keywords;
		let xmlJson = xml.keywords;
		let jsonDataFull = [];
		jsonDataFull = jsonDataFull.concat(builtInJson, dialogsJson,
			operatingSystemJson, processJson, screenshotJson, seleniumLibraryJson,
			stringJson, telnetJson, xmlJson, xmlJson);
		this.shareDataService.setData('jsonDataFull', JSON.stringify(jsonDataFull));
		return jsonDataFull;
	}

}
