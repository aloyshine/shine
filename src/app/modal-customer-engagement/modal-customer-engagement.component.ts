import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-customer-engagement',
  templateUrl: './modal-customer-engagement.component.html',
  styleUrls: ['./modal-customer-engagement.component.css']
})
export class ModalComponent3 implements OnInit {
//   country:string = 'India';
//   race:string = 'black';
//   gender:string = 'male';
//   income:number;

customerengagement:string;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent3>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("constructor",data);
    }

  ngOnInit() {
  }
}
