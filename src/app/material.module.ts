import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  exports: 
  [FormsModule,
     MatDialogModule,
      MatFormFieldModule, 
      MatButtonModule, 
      MatInputModule,
      MatSelectModule,
      MatTabsModule]
})
export class MaterialModule {}
