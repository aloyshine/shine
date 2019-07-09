import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal-purchase',
  templateUrl: './modal-purchase.component.html',
  styleUrls: ['./modal-purchase.component.css']
})
export class ModalComponent2 implements OnInit {
//   country:string = 'India';
//   race:string = 'black';
//   gender:string = 'male';
//   income:number;

purchase:string;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent2>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log("constructor",data);
    }

  ngOnInit() {
  }
}
