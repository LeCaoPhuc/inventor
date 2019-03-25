import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParseService } from './services/parse.service';
import { AuthService } from './services/auth.service';
import { FormioModule } from 'angular-formio';
import { AngularMonacoEditorModule } from 'angular-monaco-editor';
import { LoadingComponent } from './modules/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { MonacoSetupService } from './services/monaco-setup.service';
import { ShareDataService } from './services/share-data.service';
import { KafkaService } from './services/kafka.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AuthGuard } from './services/auth-guard.service';

// const config: SocketIoConfig = { url: 'http://192.168.1.168:1337', options: {} };
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
    imports: [CommonModule, FormsModule, AngularMonacoEditorModule],
    declarations: [LoadingComponent],
    exports: [CommonModule, FormsModule, FormioModule, AngularMonacoEditorModule, LoadingComponent],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ParseService, AuthGuard, AuthService,
                LoadingService, ShareDataService, MonacoSetupService, KafkaService],
        };
    }
}
