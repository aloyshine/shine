import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule,MatChipsModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@NgModule({
  exports: 
  [FormsModule,
     MatDialogModule,
      MatFormFieldModule, 
      MatButtonModule, 
      MatInputModule,
      MatSelectModule,
      MatTabsModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatIconModule,MatListModule]
})
export class MaterialModule {}
