import { Component, Input } from '@angular/core';
import * as go from 'gojs';
import { MatDialog } from '@angular/material';
import { TerminalcomponentComponent } from './terminalcomponent/terminalcomponent.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private terminaldialog: MatDialog) {

  }
  // @Input() openterminaldialog : boolean;
  counter: number = 0;
  counter1: number = 1;
  attributes: [{ key: string; figure?: string; spending?: number; color?: string; parent?: string; text: string; source: string; }] = [ // the "key" and "parent" property names are required,
    // but you can add whatever data properties you need for your app
    { key: "4", figure: "ElectricalHazard", spending: 100, color: "green", text: "All Customers", source: "data:image/jpeg;base64,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" },
    // { key: "1", parent: "0", name: "Email Subscription", source: "cat1.png" },
    // { key: "2", parent: "1", name: "Purchase Behaviour", source: "cat2.png" },
    // { key: "3", parent: "1", name: "Customer Engagement", source: "cat3.png" },
    // { key: "7", parent: "1", name: "Model Qualifiers", source: "cat3.png" },
    // { key: "4", parent: "3", name: "Geagraphy", source: "cat4.png" },
    // { key: "5", parent: "3", name: "Demographics", source: "cat5.png" },
    // { key: "6", parent: "2", name: "Customer Persona", source: "cat6.png" },
    // { key: "6", parent: "2", name: "Pro Attributes", source: "cat6.png" }
  ];


  nodeDataArray = [
    {
      key: 1, question: "All Customers",
      actions: [
        // { text: "Sales", figure: "ElectricalHazard", fill: "green" },
        // { text: "Parts and Services", figure: "FireHazard", fill: "red" },
        // { text: "Representative", figure: "IrritationHazard", fill: "yellow" }
      ], category: ""
    },
    // {
    //   key: 2, question: "Email Subscription",
    //   actions: [
    //     { text: "Sales", figure: "ElectricalHazard", fill: "green" },
    //     { text: "Parts and Services", figure: "FireHazard", fill: "red" },
    //     { text: "Representative", figure: "IrritationHazard", fill: "yellow" }
    //   ]
    // },
    // {
    //   key: 3, question: "Demographics",
    //   actions: [
    //     { text: "Compact", figure: "ElectricalHazard", fill: "blue" },
    //     { text: "Mid-Size", figure: "FireHazard", fill: "red" },
    //     { text: "Large", figure: "IrritationHazard", fill: "yellow" }
    //   ]
    // },
    // {
    //   key: 4, question: "Customer Persona",
    //   actions: [
    //     { text: "Maintenance", figure: "ElectricalHazard", fill: "blue" },
    //     { text: "Repairs", figure: "FireHazard", fill: "red" },
    //     { text: "State Inspection", figure: "IrritationHazard", fill: "yellow" }
    //   ]
    // },
    // { key: 5, question: "Geography" },
    // { key: 6, question: "Compact" },
    // { key: 7, question: "Mid-Size" },
    // {
    //   key: 8, question: "Large",
    //   actions: [
    //     { text: "SUV", figure: "ElectricalHazard", fill: "blue" },
    //     { text: "Van", figure: "FireHazard", fill: "red" }
    //   ]
    // },
    // // { key: 8, question: "Maintenance" },
    // { key: 9, question: "Repairs" },
    // { key: 10, question: "State Inspection" },
    // { key: 11, question: "SUV" },
    // { key: 12, question: "Van" },
    // { key: 13, category: "Terminal", text: "Susan" },
    // { key: 14, category: "Terminal", text: "Eric" },
    // { key: 15, category: "Terminal", text: "Steven" },
    // { key: 16, category: "Terminal", text: "Tom" },
    // { key: 17, category: "Terminal", text: "Emily" },
    // { key: 18, category: "Terminal", text: "Tony" },
    // { key: 19, category: "Terminal", text: "Ken" },
    // { key: 20, category: "Terminal", text: "Rachel" }
  ];
  linkDataArray = [
    // { from: 1, to: 2, answer: 1 },
    // { from: 1, to: 3, answer: 2 },
    // { from: 1, to: 4, answer: 3 },
    // { from: 2, to: 5, answer: 1 },
    // { from: 2, to: 6, answer: 2 },
    // { from: 2, to: 7, answer: 3 },
    // { from: 3, to: 8, answer: 1 },
    // { from: 3, to: 9, answer: 2 },
    // { from: 3, to: 10, answer: 3 },
    // { from: 7, to: 11, answer: 1 },
    // { from: 7, to: 12, answer: 2 },
    // { from: 5, to: 13 },
    // { from: 6, to: 14 },
    // { from: 11, to: 15 },
    // { from: 12, to: 16 },
    // { from: 8, to: 17 },
    // { from: 9, to: 18 },
    // { from: 10, to: 19 },
    // { from: 4, to: 20 }
  ];

  model = new go.TreeModel(this.attributes);
  modelIVR = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray)

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }


  // qwerty(key) {
  //   console.log("xxx", key);
  //   // this.addNode1(key);
  // }

  addNode(obj) {
    console.log("type of node to make", obj);
    switch (obj.name) {
      case "email":
        obj.source = 'data:image/png;base64,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'
        break;
      case "demographics":
        obj.source = 'data:image/jpeg;base64,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lVHqMyBq2VTawAYBenlOfJDLJx0Oknb+aNYuCvUrfHyLpERNCBMgTEsHAuF2tVqDX8q+X+IyYxtkN0d/B8F2Sa+JtW/Qe77zuiJ0pV4MG7EREkgREQBERAEREAREQBERAEREAREQBERAEjeK8KFXvLo/n0Po33klEhq9yU6KNXoMhyuLH/7bzmuXfFYVKgs63+o9h6SAxvAXXWmcw8tm+xmMsbWxqpp7kPE9OhBsQQfIixnmZlxBERAE8LQUHMEUH+LKL/Ge4gAi+8i63L1BqwrlTnBUghzbu6jSSkQnRFBhffWcGD4NQpOalOmFdr3bMxvm1OhNp3zIiwYnpFJNgCSdgBJHB8FqPqwyL5ka+5fvLBguHpSHdGvVjuftLxg2Vc0iP4VwbLZ6urdF6D2+Zk1ETdJLYybsRESSBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA1V8OjizqD7R9D0kZX5fQ+BivpuPv85MRIcU9yU2isVeAVR4Sre+x+f3nK/C6w3pn3WP0MuMSnbRbWylHBVP7p/9NvtMDB1P7p/9NvtLtEjtInuFNThlY7U29+n1nTS4FVO+Vfa1/peWmJPaRHcZCUOXlHjcn0At95J4bBU6fgQD13PxOs6IllFIq5NiIiWIEREARE8vfpb3wD1E8U835re689wBERAEREAREQBERAMREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREATMxEA//2Q=='
        break;
    }
    this.attributes.push({
      key: (++this.counter).toString(), parent: obj.key,
      text: obj.name, source: obj.source
    })

    this.nodeDataArray.push({
      key: (++this.counter), question: obj.name,
      actions: [
        { text: "Sales", figure: "ElectricalHazard", fill: "green" },
        { text: "Parts and Services", figure: "FireHazard", fill: "red" },
        { text: "Representative", figure: "IrritationHazard", fill: "yellow" }
      ],
      category: ""
    });
    console.log(this.nodeDataArray);
    this.model = new go.TreeModel(this.attributes);
  }

  addIvrNode(obj) {
    console.log("type of IVR node to make", obj);
    switch (obj.name) {
      case "email":
        obj.source = 'data:image/png;base64,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'
        break;
      case "demographics":
        obj.source = 'data:image/jpeg;base64,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lVHqMyBq2VTawAYBenlOfJDLJx0Oknb+aNYuCvUrfHyLpERNCBMgTEsHAuF2tVqDX8q+X+IyYxtkN0d/B8F2Sa+JtW/Qe77zuiJ0pV4MG7EREkgREQBERAEREAREQBERAEREAREQBERAEjeK8KFXvLo/n0Po33klEhq9yU6KNXoMhyuLH/7bzmuXfFYVKgs63+o9h6SAxvAXXWmcw8tm+xmMsbWxqpp7kPE9OhBsQQfIixnmZlxBERAE8LQUHMEUH+LKL/Ge4gAi+8i63L1BqwrlTnBUghzbu6jSSkQnRFBhffWcGD4NQpOalOmFdr3bMxvm1OhNp3zIiwYnpFJNgCSdgBJHB8FqPqwyL5ka+5fvLBguHpSHdGvVjuftLxg2Vc0iP4VwbLZ6urdF6D2+Zk1ETdJLYybsRESSBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA1V8OjizqD7R9D0kZX5fQ+BivpuPv85MRIcU9yU2isVeAVR4Sre+x+f3nK/C6w3pn3WP0MuMSnbRbWylHBVP7p/9NvtMDB1P7p/9NvtLtEjtInuFNThlY7U29+n1nTS4FVO+Vfa1/peWmJPaRHcZCUOXlHjcn0At95J4bBU6fgQD13PxOs6IllFIq5NiIiWIEREARE8vfpb3wD1E8U835re689wBERAEREAREQBERAMREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREATMxEA//2Q=='
        break;
      case "terminal":
        obj.category = "Terminal"
        break;
    }



    this.nodeDataArray.push({
      key: (++this.counter1), question: obj.name,
      actions: [
        // { text: "Sales", figure: "ElectricalHazard", fill: "green" },
        // { text: "Parts and Services", figure: "FireHazard", fill: "red" },
        // { text: "Representative", figure: "IrritationHazard", fill: "yellow" }
      ], category: obj.category
    });

    this.linkDataArray.push({
      from: obj.key,
      to: this.counter1
    })
    console.log(this.nodeDataArray);
    this.modelIVR = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);



  }


  onSomeEvent(result) {
    console.log('ccc', result);
    this.nodeDataArray.forEach((nodeItem) => {
      if (nodeItem.key === result.key) {
        nodeItem.actions = result.actions;
        this.modelIVR = new go.GraphLinksModel(this.nodeDataArray, this.linkDataArray);

      }
    })
  }

  openterminaldialog(e) {
    console.log("data", e)
    if (e != null) {
      const dialogRef = this.terminaldialog.open(TerminalcomponentComponent, {
        disableClose: true,
        data: { nodeDataArray: this.nodeDataArray, linkDataArray: this.linkDataArray, key: e.key }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log("result", result);
        // result.actions.push({ text: result.purchase, fill: "red" })
        // console.log("final result", result);
        // this.someEvent.emit(result);
        // result.actions.push({})
        // if (result) {
        //     this.diagram.model.commit(function (m) {
        //         console.log("m", m);
        //         m.set(data, "income", result.income);
        //         // m.set(data, "color", result.color);
        //         // m.set(data, "spending", result.spending);
        //     }, "modified node properties");
        //     // data.actions.push({ text: data.income, figure: "ElectricalHazard", fill: "green" })
        // }
        // console.log("inside open dialog after", data);
      });

    }



  }
}
