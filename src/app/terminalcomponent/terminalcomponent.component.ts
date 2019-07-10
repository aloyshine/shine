import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Form } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-terminalcomponent',
  templateUrl: './terminalcomponent.component.html',
  styleUrls: ['./terminalcomponent.component.css']
})
export class TerminalcomponentComponent implements OnInit {
  activityForm: FormGroup;
  linkdataArray=[];
  nodedataArray=[];
  operators=["AND","OR"];
  finalnodes=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.activityForm = new FormGroup({});
    this.activityForm.addControl('Operator', new FormControl())
    this.activityForm.addControl('leafNodes', new FormControl())
    console.log(data)
    this.linkdataArray=data['linkDataArray'];
    this.nodedataArray=data['nodeDataArray']
    this.nodedataArray.forEach(node=>{
      let key=node.key
      let keyflag=false;
      this.linkdataArray.forEach(element => {
        if((element.from==key) || (element.category=="Terminal"))
        {
          keyflag=true
        }
      });
      if(keyflag==false){
        this.finalnodes.push(node)
      }
    }
    )
    console.log("finalnodes", this.finalnodes)
  }
 

  ngOnInit() {
  }

}
