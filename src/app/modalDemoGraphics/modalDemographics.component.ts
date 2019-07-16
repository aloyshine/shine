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
 // country:string = 'India';
 // age:string = 'black';
 // gender:string = 'male';
 // income:number;
  addOnBlur: boolean = true;
  DemographicsForm: FormGroup;
  separatorKeysCodes = [ENTER, COMMA];
  geography:string;
  filteredAge
  parent:any;
  showflag:boolean=false;
  selcol:any
  selcat:any
  SelectedAges=[]
  totalfilter=[]
  columnnames=["memberid",
    "Gasolene_Fuel_Amount",
    "Diesel_Fuel_Amount",
   "MerchAmount",
    "Gasolene_Fuel_Gallons",
    "Diesel_Fuel_Gallons",
   "MerchUnits",
    "FuelVisit",
    "MerchVisit",
    "FuelMerchVisit",
    "earned_points",
    "burned_points",
    "expired_points",
    "Age",
    "Income",
    "Gender",
    "Preferred Store format",
    "Region",
    "State",
    "Preferred Product Category",
    "Preferred Product Sub Category",
    "Merch Types",
    "Preferred Product Department",
    ]
    filterarray=[];
  merchtypes=["Tobacco","Fuel","Non-Tobacco"]
  Preferred_Store_format=["Small","Kiosk","Large"]
  Region=["Midwest","Southeast","Southwest"]
  State=["Arkansas","Oklahama","Ohio","Texas","Alaska"]
  Preferred_Product_Category=["Other Tobacco",
  "Cigarettes",
  "Wine",
  "Standard Grades",
  "Liquor",
  "Packaged Beverages -Non-Alcoho",
  "Beer",
  "Smokeless Tobacco",
  "Clamato",
  "Specialty Grades"]
  Preferred_Product_Sub_Category=[
    "Premium Smokeless",
"Mid Tier Smokeless",
"Premium Cigarettes",
"Value Smokeless",
"Premium Discount Smokeless",
"Fourth Tier Cigarettes",
"Premium Discount Cigarettes",
"Super Premium Cigarettes",
"Value Cigarettes",
"Imports- Do Not Use"
  ]
  Preferred_Product_Department=[
    "Beer",
"Grocery",
"Other Tobacco",
"Packaged Beverages",
"General Merchandise",
"Fuel",
"Wine & Liquor",
"Lottery/Gaming",
"Cigarettes",
"Smokeless Tobacco"
  ]

gender=["Prefer not to say",
  "Female",
  "Prefer not to say",
  "Male"
  ]



  

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
      this.DemographicsForm.addControl('colnames', new FormControl(''))
      this.DemographicsForm.addControl('catnames', new FormControl(''))
      this.DemographicsForm.addControl('catinput', new FormControl(''))
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
          totalfilter:this.totalfilter
       }
    }
    this._demographicservice.changeMessage(req)

  }

  setfield(col)
  {
   this.selcol=col
    if(col=="Gender"){
      this.showflag=true
      this.filterarray=this.gender
    }
    else if(col=="Preferred Store format"){
      this.showflag=true
      this.filterarray=this.Preferred_Store_format
    }
    else if(col=="Region"){
      this.showflag=true
      this.filterarray=this.Region
    }
    else if(col=="State"){
      this.showflag=true
      this.filterarray=this.State
    }
    else if(col=="Preferred Product Category"){
      this.showflag=true
      this.filterarray=this.Preferred_Product_Category
    }
    else if(col=="Preferred Product Sub Category"){
      this.showflag=true
      this.filterarray=this.Preferred_Product_Sub_Category
    }
    else if(col=="Merch Types"){
      this.showflag=true
      this.filterarray=this.merchtypes
    }
    else if(col=="Preferred Product Department"){
      this.showflag=true
      this.filterarray=this.Preferred_Product_Department
    }
    else{
      this.showflag=false
    }
  }
  setcategory(cat){
    this.selcat=cat
  }
  addfilter(){
    if(this.showflag==true)
    {
      let filtername=this.selcol+"==="+this.selcat
      this.totalfilter.push(filtername)
      console.log("total filter",this.totalfilter)
    }
    else{
      let filtername=this.selcol+this.DemographicsForm.controls["catinput"].value
      this.totalfilter.push(filtername)
      console.log("total filter",this.totalfilter)
    }
   
  }
  Addcondition(val){
    if(this.totalfilter.length!=0)
    {
      if(val==1){
        this.totalfilter.push("And")
      }
      else if(val==2){
        this.totalfilter.push("Or")
      }
     
    }
    console.log("total filter",this.totalfilter)
  }
}
