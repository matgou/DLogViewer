import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LogViewerComponent } from './log-viewer/log-viewer.component';
import { AgentManagerService } from './agent-manager.service';
import { LogListComponent } from './log-list/log-list.component';

const appRoutes: Routes = [
  { path: 'tail/:host/:filename', component: LogViewerComponent },
  { path: 'list', component: LogListComponent },
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogViewerComponent,
    LogListComponent
	],
  imports: [
    BrowserModule,
	NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ AgentManagerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
