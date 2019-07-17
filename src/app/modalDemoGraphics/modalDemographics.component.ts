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
  columnnames=[
    "age",
    "gender",
    "preferred_storeformat",
    "state",
    "tank_size",
    "Car_model",	
    "annual_hh_income",
      "education_level",
        "marital_status",
  	"employment_status"

    ]
    filterarray=[];
  merchtypes=["Tobacco","Fuel","Non-Tobacco"]
  Preferred_Store_format=["Small","Kiosk","Large"]
  Region=["Midwest","Southeast","Southwest"]
  State=["TX",
    "TX",
   "KY",
    "TN",
    "AR",
    "PA",
    "OK"
    ]
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


  tank_size=["13-16",
  "Above 20",
  "13-16",
  "17-20",
 "Less than 13"
  ]
  carmodel=["2016-2014",
    "2013-2010",
    "2019-2017",
    "Pre 2010",
    "2016-2014"
    ]
    annual_hh_income =["$40,000 or less",
    "$60,000 - $75,000",
    "$75,000 - $100,000",
    "$40,000 - $60,000",
    "$40,000 or less",
    "Prefer not to share",
    "More than $100,000"]
    
    education_level=["Some college",
      "College graduate",
      "High school graduate /GED",
      "Some college",
      "Non high school graduate",
     "Masters degree or higher"
      ]
      marital_status= ["Divorced",
        "Never married",
        "Married",
        "Widowed",
        "Divorced",
        "Separated"
        ]
        employment_status  =["Full time",
          "Full time",
          "Retired",
          "Not employed",
          "Part time"
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
   console.log("selected col",this.selcol)
    if(col=="gender"){
      this.showflag=true
      this.filterarray=this.gender
    }
    else if(col=="preferred_storeformat"){
      this.showflag=true
      this.filterarray=this.Preferred_Store_format
    }
    else if(col=="Region"){
      this.showflag=true
      this.filterarray=this.Region
    }
    else if(col=="state"){
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
    else if(col=="tank_size"){
      this.showflag=true
      this.filterarray=this.tank_size
    }
    else if(col=="Car_model"){
      this.showflag=true
      this.filterarray=this.carmodel
    }
    else if(col=="annual_hh_income"){
      this.showflag=true
      this.filterarray=this.annual_hh_income
    }
    else if(col=="education_level"){
      this.showflag=true
      this.filterarray=this.education_level
    }
    else if(col=="marital_status"){
      this.showflag=true
      this.filterarray=this.marital_status
    }
    else if(col=="employment_status"){
      this.showflag=true
      this.filterarray=this.employment_status
    }
    else if(col=="age"){
      this.showflag=false
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
      let filtername=this.selcol+"~"+this.selcat
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
