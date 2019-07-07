import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as go from 'gojs';

import { GuidedDraggingTool } from './GuidedDraggingTool';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.css']
})
export class DiagramEditorComponent implements OnInit {
  private diagram: go.Diagram = new go.Diagram();
  private palette: go.Palette = new go.Palette();

  @ViewChild('diagramDiv')
  private diagramRef: ElementRef;

  @ViewChild('paletteDiv')
  private paletteRef: ElementRef;

  @Input()
  get model(): go.Model { return this.diagram.model; }
  set model(val: go.Model) { this.diagram.model = val; }

  @Output()
  nodeSelected = new EventEmitter<any>();

  @Output()
  typeOfNode = new EventEmitter<any>();

  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  constructor(public dialog: MatDialog) {
    const $ = go.GraphObject.make;
    // Place GoJS license key here:
    // (go as any).licenseKey = "..."
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.allowDrop = true;
    this.diagram.undoManager.isEnabled = true;
    // this.diagram.hoverDelay = 10;
    this.diagram.toolManager.draggingTool = new GuidedDraggingTool();
    this.diagram.addDiagramListener("ChangedSelection",
      e => {
        console.log('changed selection')
        const node = e.diagram.selection.first();
        // this.nodeSelected.emit(node.name);
      });
    this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

    var that = this;

    // this is shown by the mouseHover event handler
    var nodeHoverAdornment =
      $(go.Adornment, "Spot",
        {
          background: "transparent",
          // hide the Adornment when the mouse leaves it
          mouseLeave: function (e, obj) {
            var ad = obj.part;
            ad.adornedPart.removeAdornment("mouseHover");
          }
        },
        $(go.Placeholder,
          {
            background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
            isActionable: true,  // needed because this is in a temporary Layer
            click: function (e, obj) {
              var node = obj.part.adornedPart;
              node.diagram.select(node);
            }
          }),
        $("Button",
          { alignment: go.Spot.Left, alignmentFocus: go.Spot.Right },
          {
            click: function (e, obj) {
              console.log("prashant", e, obj.part.jb.key);
              console.log("Email Subscription");
              that.typeOfNode.emit({ key: obj.part.jb.key, sss: 'email' })
            }
          },
          $(go.TextBlock, "Email Sub")),
        $("Button",
          { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
          {
            click: function (e, obj) {
              console.log("Demographics");
              that.typeOfNode.emit({ key: obj.part.jb.key, sss: 'demographics' })
            }
          },
          $(go.TextBlock, "Demographics"))
      );



    this.diagram.nodeTemplate =
      $(go.Node, "Horizontal", { background: "#DD4814" },
        // $(go.Shape, "RoundedRectangle"),

        {
          click: (e, node: any) => {
            console.log(node.jb.name); this.nodeSelected.emit(node.jb.key);
            // this.openDialog(node.data);
          }
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Picture,
          { margin: 10, width: 50, height: 50, background: "red" },
          new go.Binding("source")), // this line is important for data binding to work
        $(go.TextBlock,
          { margin: 8 /*, editable: true*/ },
          new go.Binding("text", "name")/*.makeTwoWay()*/),
        { // show the Adornment when a mouseHover event occurs
          mouseHover: function (e, obj) {
            var node = obj.part;
            nodeHoverAdornment.adornedObject = node;
            node.addAdornment("mouseHover", nodeHoverAdornment);
          }
        }
      );

    // var simpletemplate = $(go.Node, "Spot",
    //   $(go.Panel, "Auto",
    //     $(go.Shape, "Ellipse",
    //       new go.Binding("fill", "color")),
    //     $(go.TextBlock,
    //       new go.Binding("text", "key"))
    //   ),
    //   $("Button",
    //     { alignment: go.Spot.TopRight },
    //     $(go.Shape, "Ellipse", { width: 8, height: 8 }),
    //     { click: this.changeCategory })
    // );


    // var detailtemplate =
    //   $(go.Node, "Spot",
    //     $(go.Panel, "Auto",
    //       $(go.Shape, "RoundedRectangle",
    //         new go.Binding("fill", "color")),
    //       $(go.Panel, "Table",
    //         { defaultAlignment: go.Spot.Left },
    //         $(go.TextBlock, { row: 0, column: 0, columnSpan: 2, font: "bold 12pt sans-serif" },
    //           new go.Binding("text", "key")),
    //         $(go.TextBlock, { row: 1, column: 0 }, "Description:"),
    //         $(go.TextBlock, { row: 1, column: 1 }, new go.Binding("text", "desc")),
    //         $(go.TextBlock, { row: 2, column: 0 }, "Color:"),
    //         $(go.TextBlock, { row: 2, column: 1 }, new go.Binding("text", "color"))
    //       )
    //     ),
    //     $("Button",
    //       { alignment: go.Spot.TopRight },
    //       $(go.Shape, "Ellipse", { width: 8, height: 8 }),
    //       { click: this.changeCategory })
    //   );

    // var templmap = new go.Map(); // In TypeScript you could write: new go.Map<string, go.Node>();
    // templmap.add("simple", simpletemplate);
    // templmap.add("detailed", detailtemplate);
    // this.diagram.nodeTemplateMap = templmap;

    this.diagram.layout =
      $(go.TreeLayout,
        { angle: 90, layerSpacing: 35 });

    this.diagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape


    this.palette = new go.Palette();
    this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

    // initialize contents of Palette
    this.palette.model.nodeDataArray =
      [
        { key: 1, text: "Alpha", color: "lightblue" },
        { key: 2, text: "Beta", color: "orange" },
        { key: 3, text: "Gamma", color: "lightgreen" },
        { key: 4, text: "Delta", color: "pink" },
        { key: 5, text: "Epsilon", color: "yellow" }
      ];
  }

  // this function changes the category of the node data to cause the Node to be replaced
  // changeCategory(e, obj) {
  //   var node = obj.part;
  //   if (node) {
  //     var diagram = node.diagram;
  //     diagram.startTransaction("changeCategory");
  //     var cat = diagram.model.getCategoryForNodeData(node.data);
  //     if (cat === "simple")
  //       cat = "detailed";
  //     else
  //       cat = "simple";
  //     diagram.model.setCategoryForNodeData(node.data, cat);
  //     diagram.commitTransaction("changeCategory");
  //   }
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.

  //   const $ = go.GraphObject.make;
  //   // Place GoJS license key here:
  //   // (go as any).licenseKey = "..."
  //   this.diagram = new go.Diagram();
  //   this.diagram.initialContentAlignment = go.Spot.Center;
  //   this.diagram.allowDrop = true;
  //   this.diagram.undoManager.isEnabled = true;
  //   this.diagram.toolManager.draggingTool = new GuidedDraggingTool();
  //   this.diagram.addDiagramListener("ChangedSelection",
  //     e => {
  //       console.log('changed selection')
  //       const node = e.diagram.selection.first();
  //       this.nodeSelected.emit(node instanceof go.Node ? node : null);
  //     });
  //   this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

  //   this.diagram.nodeTemplate =
  //     $(go.Node, "Horizontal", { background: "#DD4814" },
  //       {
  //         click: (e, node: go.Node) => { this.openDialog(node.data); }
  //       },
  //       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  //       $(go.Picture,
  //         { margin: 10, width: 50, height: 50, background: "red" },
  //         new go.Binding("source")), // this line is important for data binding to work
  //       $(go.TextBlock,
  //         { margin: 8 /*, editable: true*/ },
  //         new go.Binding("text", "key")/*.makeTwoWay()*/)
  //     );

  //   this.diagram.layout =
  //     $(go.TreeLayout,
  //       { angle: 90, layerSpacing: 35 });

  //   this.diagram.linkTemplate =
  //     $(go.Link,
  //       { routing: go.Link.Orthogonal, corner: 5 },
  //       $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape


  //   this.palette = new go.Palette();
  //   this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

  //   // initialize contents of Palette
  //   this.palette.model.nodeDataArray =
  //     [
  //       { key: 1, text: "Alpha", color: "lightblue" },
  //       { key: 2, text: "Beta", color: "orange" },
  //       { key: 3, text: "Gamma", color: "lightgreen" },
  //       { key: 4, text: "Delta", color: "pink" },
  //       { key: 5, text: "Epsilon", color: "yellow" }
  //     ];

  // }

  ngOnInit() {
    this.diagram.div = this.diagramRef.nativeElement;
    this.palette.div = this.paletteRef.nativeElement;

  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: { key: data.key, text: data.text, color: data.color }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diagram.model.commit(function (m) {
          m.set(data, "text", result.text);
          m.set(data, "color", result.color);
        }, "modified node properties");
      }
    });
  }
}
