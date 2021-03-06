import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';
import { AgentManagerService } from './agent-manager.service';
import { LogListComponent } from './log-list/log-list.component';
import { LogFileFilterPipe } from './log-file-filter.pipe';
import { NavbarEventService } from './navbar-event.service';
import { MessagesFilterPipe } from './messages-filter.pipe';
import { LogFileBagService } from './log-file-bag.service';

const appRoutes: Routes = [
  { path: 'tail', component: LogViewerComponent },
  { path: 'list', component: LogListComponent },
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LogViewerComponent,
    LogListComponent,
    LogFileFilterPipe,
    MessagesFilterPipe
	],
  imports: [
    BrowserModule,
    HttpClientModule,
	FormsModule,
	NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [ AgentManagerService, NavbarEventService, LogFileBagService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
