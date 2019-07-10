import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatSelectModule]
})
export class MaterialModule {}
