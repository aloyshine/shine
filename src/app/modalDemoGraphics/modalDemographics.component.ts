import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal-demographics',
  templateUrl: './modalDemographics.component.html',
  styleUrls: ['./modalDemographics.component.css']
})
export class ModalComponent1 implements OnInit {
  country:string = 'India';
  race:string = 'black';
  gender:string = 'male';
  income:number;

geography:string;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent1>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("constructor",data);
    }

  ngOnInit() {
  }
}
