import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';
import { IvrComponent } from './ivr-tree/ivr.component';

@NgModule({
  declarations: [AppComponent, ModalComponent, DiagramEditorComponent,IvrComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule {}
