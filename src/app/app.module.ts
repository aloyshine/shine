import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';
import { IvrComponent } from './ivr-tree/ivr.component';
import { TerminalcomponentComponent } from './terminalcomponent/terminalcomponent.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, ModalComponent, DiagramEditorComponent,IvrComponent, TerminalcomponentComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule,FormsModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent,TerminalcomponentComponent]
})
export class AppModule {}
