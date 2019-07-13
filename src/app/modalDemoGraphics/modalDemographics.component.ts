import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {MatChipsModule, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DemographicsService } from '../demographics.service';
@Component({
  selector: 'app-modal-demographics',
  templateUrl: './modalDemographics.component.html',
  styleUrls: ['./modalDemographics.component.css']
})
export class ModalComponent1 implements OnInit {
  country:string = 'India';
  age:string = 'black';
  gender:string = 'male';
  income:number;
  addOnBlur: boolean = true;
  DemographicsForm: FormGroup;
  separatorKeysCodes = [ENTER, COMMA];
  geography:string;
  filteredAge
  parent:any;
  SelectedAges=[]
  merchtypes=["Tobacco","Fuel","Non-Tobacco"]
  AllAge=["1","3","5"]
  @ViewChild('fruitInput' ) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent1>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _demographicservice:DemographicsService) {
    
      console.log("constructor",data);
      this.parent=data['key']
      console.log(parent);
      this.DemographicsForm = new FormGroup({});
      this.DemographicsForm.addControl('Age', new FormControl(this.SelectedAges ? this.SelectedAges : null))
      this.DemographicsForm.addControl('MerchType', new FormControl(''))
      this.filteredAge =  this.DemographicsForm.controls.Age.valueChanges.pipe(
        startWith(null),
        map((age: string | null) => age ? this._filter(age) : this.AllAge.slice()));
    }



  ngOnInit() {
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.AllAge.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.SelectedAges.push(value.trim());
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
      console.log("Selected Ages",this.SelectedAges)
      this.DemographicsForm.controls.Age.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.SelectedAges.indexOf(fruit);

    if (index >= 0) {
      this.SelectedAges.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.SelectedAges.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.DemographicsForm.controls.Age.setValue(null);
  }

  submit(formData){
    let req={
      datainner:{
          key:this.parent,
          Age:this.SelectedAges
       }
    }
    this._demographicservice.changeMessage(req)

  }

}
