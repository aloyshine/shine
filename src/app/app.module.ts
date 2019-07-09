import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { DiagramEditorComponent } from './diagram-editor/diagram-editor.component';
import { IvrComponent } from './ivr-tree/ivr.component';
import { ModalComponent1 } from './modalDemoGraphics/modalDemographics.component';
import { ModalComponent2 } from './modal-purchase/modal-purchase.component';
import { ModalComponent3 } from './modal-customer-engagement/modal-customer-engagement.component';

@NgModule({
  declarations: [AppComponent, ModalComponent,ModalComponent1,ModalComponent2,ModalComponent3, DiagramEditorComponent,IvrComponent, ],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent,ModalComponent1,ModalComponent2,ModalComponent3]
})
export class AppModule {}
