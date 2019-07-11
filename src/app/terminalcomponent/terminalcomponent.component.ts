import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { TerminalService } from '../terminal.service';4


@Component({
  selector: 'app-terminalcomponent',
  templateUrl: './terminalcomponent.component.html',
  styleUrls: ['./terminalcomponent.component.css']
})
export class TerminalcomponentComponent implements OnInit {
  activityForm: FormGroup;
  linkdataArray = [];
  nodedataArray = [];
  fromnode:any;
  operators = ["AND", "OR"];
  finalnodes = [];
  oper:any;
  leaf:any;
  returnResult:any={};
  bsubject=new BehaviorSubject({});
  constructor(public dialogRef: MatDialogRef<TerminalcomponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private terminal:TerminalService) {


    this.activityForm = new FormGroup({
      // name: new FormControl('Benedict'),
      // email: new FormControl(''),
      // message: new FormControl('')
    });
    this.activityForm.addControl('Operator', new FormControl())
    this.activityForm.addControl('leafNodes', new FormControl())
    console.log("line 28", data)
    this.fromnode=data['key'];
    this.linkdataArray = data['linkDataArray'];
    this.nodedataArray = data['nodeDataArray']
    this.nodedataArray.forEach(node => {
      let key = node.key
      let keyflag = false;
      this.linkdataArray.forEach(element => {
        if ((element.from === key) || (element.category === "Terminal")) {
          keyflag = true
        }
      });
      if (keyflag === false) {
        this.finalnodes.push(node)
      }
    }
    )
    console.log("finalnodes", this.finalnodes)
  }


  ngOnInit() {
  }

  onSubmit(f) {
    console.log("form submit", f);
  }

  changeOperator(e){
    console.log(e)
    this.oper=e
    this.returnResult.operator=this.oper
  }
  changeLeaf(e){
    console.log(e)
    this.leaf=e
    this.returnResult.leaf=this.leaf
  }

  createterminallink(){
    this.returnResult.fromnode=this.fromnode;
    this.leaf=null;
    this.oper=null;
    this.fromnode=null;
    this.terminal.changeMessage(this.returnResult)
    this.returnResult=null

  }
}
