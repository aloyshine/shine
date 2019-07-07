import { Component } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter: number = 0;
  attributes: [{ key: string; parent?: string; name: string; source: string; }] = [ // the "key" and "parent" property names are required,
    // but you can add whatever data properties you need for your app
    { key: "4", name: "All Customers", source: "cat1.png" },
    // { key: "1", parent: "0", name: "Email Subscription", source: "cat1.png" },
    // { key: "2", parent: "1", name: "Purchase Behaviour", source: "cat2.png" },
    // { key: "3", parent: "1", name: "Customer Engagement", source: "cat3.png" },
    // { key: "7", parent: "1", name: "Model Qualifiers", source: "cat3.png" },
    // { key: "4", parent: "3", name: "Geagraphy", source: "cat4.png" },
    // { key: "5", parent: "3", name: "Demographics", source: "cat5.png" },
    // { key: "6", parent: "2", name: "Customer Persona", source: "cat6.png" },
    // { key: "6", parent: "2", name: "Pro Attributes", source: "cat6.png" }
  ];
  model = new go.TreeModel(this.attributes
  );

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }


  qwerty(key) {
    console.log("xxx", key);
    // this.addNode1(key);
  }

  qwerty1(obj) {
    console.log("type of node to make", obj);
    this.attributes.push({ key: (++this.counter).toString(), parent: obj.key, name: obj.sss, source: "cat3.png" })
    console.log(this.attributes);
    this.model = new go.TreeModel(this.attributes);
  }
}
