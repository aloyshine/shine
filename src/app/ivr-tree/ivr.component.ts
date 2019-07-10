import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as go from 'gojs';

import { GuidedDraggingTool } from './GuidedDraggingTool';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-ivr',
    templateUrl: './ivr.component.html',
    styleUrls: ['./ivr.component.css']
})
export class IvrComponent implements OnInit {
    private diagram: go.Diagram = new go.Diagram();
    // private palette: go.Palette = new go.Palette();

    @ViewChild('diagramDiv')
    private diagramRef: ElementRef;

    // @ViewChild('paletteDiv')
    // private paletteRef: ElementRef;

    @Input()
    get model(): go.Model { return this.diagram.model; }
    set model(val: go.Model) { this.diagram.model = val; }

    @Output()
    nodeSelected = new EventEmitter<any>();

    @Output()
    typeOfNode = new EventEmitter<any>();

    @Output()
    someEvent = new EventEmitter<any>();

    @Output()
    modelChanged = new EventEmitter<go.ChangedEvent>();

    constructor(public dialog: MatDialog) {

        const $ = go.GraphObject.make;
        // Place GoJS license key here:
        // (go as any).licenseKey = "..."
        this.diagram = new go.Diagram();
        this.diagram.initialContentAlignment = go.Spot.Center;
        this.diagram.allowCopy = false;
        // this.diagram.draggingTool.dragsTree = true;
        this.diagram.commandHandler.deletesTree = true;
        // this.diagram.allowDrop = true;

        this.diagram.undoManager.isEnabled = true;
        // this.diagram.hoverDelay = 100;
        this.diagram.toolManager.draggingTool = new GuidedDraggingTool();
        this.diagram.addDiagramListener("ChangedSelection",
            e => {
                console.log('changed selection')
                const node = e.diagram.selection.first();
                // this.nodeSelected.emit(node.name);
            });
        this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

        var that = this;

        function addEmail(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'email' })
        }

        function addDemographics(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'demographics' })
        }

        function addPurchase(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'purchase' })
        }

        function addCusteng(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'customerengagement' })
        }

        function addModquan(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'modelquantifiers' })
        }

        function addGeography(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'geography' })
        }

        function addCustper(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'customerpersona' })
        }

        function addProattr(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'proattributes' })
        }

        function addGraphcreate(e,obj){
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'graphcreate' })
        }

        function addTerminal(e,obj){
            that.typeOfNode.emit({ key: obj.part.key, name: 'terminal' })
        }
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
                    {
                        contextMenu:     // define a context menu for each node
                          $("ContextMenu",  // that has one button
                            $("ContextMenuButton",
                              $(go.TextBlock, "Email Sub"),
                              { click: addEmail }
                            )
                            // more ContextMenuButtons would go here
                          )  // end Adornment
                    },
                $("Button",
                    // { alignment: go.Spot.Left, alignmentFocus: go.Spot.Right, },
                    {
                        alignment: go.Spot.Left,
                        alignmentFocus: go.Spot.Right,
                        "ButtonBorder.fill": "#007bff",
                        "ButtonBorder.stroke": "#007bff",
                        "_buttonFillOver": "#007bff",
                        "_buttonStrokeOver": "#007bff",
                        cursor: "pointer",
                        width: 80,

                    },
                    {
                        click: function (e, obj) {
                            console.log("prashant", e, obj.part.key);
                            console.log("Email Subscription");
                            that.typeOfNode.emit({ key: obj.part.key, name: 'email' })
                        }
                    },
                    $(go.TextBlock, "Email Sub", {
                        stroke: '#fff',
                        margin: 2,
                    })),
                $("Button",
                    // { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
                    {
                        alignment: go.Spot.Right,
                        alignmentFocus: go.Spot.Left,
                        "ButtonBorder.fill": "#007bff",
                        "ButtonBorder.stroke": "#007bff",
                        "_buttonFillOver": "#007bff",
                        "_buttonStrokeOver": "#007bff",
                        cursor: "pointer",
                        width: 100,

                    },
                    {
                        click: function (e, obj) {
                            console.log("Demographics");
                            that.typeOfNode.emit({ key: obj.part.key, name: 'demographics' })
                        }
                    },
                    $(go.TextBlock, "Demographics", {
                        stroke: '#fff',
                        margin: 2,
                    })),
                    $("Button",
                    // { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
                    {
                        alignment: go.Spot.Right,
                        alignmentFocus: go.Spot.Left,
                        "ButtonBorder.fill": "#007bff",
                        "ButtonBorder.stroke": "#007bff",
                        "_buttonFillOver": "#007bff",
                        "_buttonStrokeOver": "#007bff",
                        cursor: "pointer",
                        width: 100,

                    },
                    {
                        click: function (e, obj) {
                            console.log("ADD TERMINAL");
                            that.typeOfNode.emit({ key: obj.part.key, name: 'addterminal' })
                        }
                    },
                    $(go.TextBlock, "Add Terminal", {
                        stroke: '#fff',
                        margin: 2,
                    }))
            );

        var terminalnodeAdornment = 
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
            // { alignment: go.Spot.Left, alignmentFocus: go.Spot.Right, },
            {
                alignment: go.Spot.Left,
                alignmentFocus: go.Spot.Right,
                "ButtonBorder.fill": "#007bff",
                "ButtonBorder.stroke": "#007bff",
                "_buttonFillOver": "#007bff",
                "_buttonStrokeOver": "#007bff",
                cursor: "pointer",
                width: 80,

            },
            {
                click: function (e, obj) {
                    console.log("aloy", e, obj.part.key);
                    console.log("AND");
                   // that.typeOfNode.emit({ key: obj.part.key, name: 'and' })
                }
            },
            $(go.TextBlock, "AND", {
                stroke: '#fff',
                margin: 2,
            })),
            $("Button",
            // { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
            {
                alignment: go.Spot.Right,
                alignmentFocus: go.Spot.Left,
                "ButtonBorder.fill": "#007bff",
                "ButtonBorder.stroke": "#007bff",
                "_buttonFillOver": "#007bff",
                "_buttonStrokeOver": "#007bff",
                cursor: "pointer",
                width: 100,

            },
            {
                click: function (e, obj) {
                    console.log("aloy", e, obj.part.key);
                    console.log("OR");
                   // that.typeOfNode.emit({ key: obj.part.key, name: 'or' })
                }
            },
            $(go.TextBlock, "OR", {
                stroke: '#fff',
                margin: 2,
            }))
        );

        var bluegrad = $(go.Brush, "Linear", { 0: "#C4ECFF", 1: "#70D4FF" });
        var greengrad = $(go.Brush, "Linear", { 0: "#B1E2A5", 1: "#7AE060" });

        // each action is represented by a shape and some text
        var actionTemplate =
            $(go.Panel, "Horizontal",
                $(go.Shape,
                    { width: 12, height: 12 },
                    new go.Binding("figure"),
                    new go.Binding("fill")
                ),
                $(go.TextBlock,
                    { font: "10pt Verdana, sans-serif" },
                    new go.Binding("text")
                )
            );

        // This method is called as a context menu button's click handler.
        // Rotate the selected node's color through a predefined sequence of colors.
        // function changeColor(e, obj) {
        //     this.diagram.commit(function (d) {
        //         // get the context menu that holds the button that was clicked
        //         var contextmenu = obj.part;
        //         // get the node data to which the Node is data bound
        //         var nodedata = contextmenu.data;
        //         // compute the next color for the node
        //         var newcolor = "lightblue";
        //         switch (nodedata.color) {
        //             case "lightblue": newcolor = "lightgreen"; break;
        //             case "lightgreen": newcolor = "lightyellow"; break;
        //             case "lightyellow": newcolor = "orange"; break;
        //             case "orange": newcolor = "lightblue"; break;
        //         }
        //         // modify the node data
        //         // this evaluates data Bindings and records changes in the UndoManager
        //         d.model.set(nodedata, "color", newcolor);
        //     }, "changed color");
        // }

        this.diagram.nodeTemplate = $(go.Node, "Vertical",
            { selectionObjectName: "BODY" },
            {
                click: (e, node: any) => {
                    console.log(node.jb.name); this.nodeSelected.emit(node.jb.key);
                    //check for bottomsheet
                    this.openDialog(node.data);
                }
            },
            // the main "BODY" consists of a RoundedRectangle surrounding nested Panels
            $(go.Panel, "Auto",
                { name: "BODY" },
                $(go.Shape, "RoundedRectangle",
                    { fill: bluegrad, stroke: null }
                ),
                $(go.Panel, "Vertical",
                    { margin: 3 },
                    // the title
                    $(go.TextBlock,
                        {
                            stretch: go.GraphObject.Horizontal,
                            font: "bold 12pt Verdana, sans-serif"
                        },
                        new go.Binding("text", "question")
                    ),
                    // the optional list of actions
                    $(go.Panel, "Vertical",
                        { stretch: go.GraphObject.Horizontal, visible: false },  // not visible unless there is more than one action
                        new go.Binding("visible", "actions", function (acts) {
                            return (Array.isArray(acts) && acts.length > 0);
                        }),
                        // headered by a label and a PanelExpanderButton inside a Table
                        $(go.Panel, "Table",
                            { stretch: go.GraphObject.Horizontal },
                            $(go.TextBlock, "Choices",
                                {
                                    alignment: go.Spot.Left,
                                    font: "10pt Verdana, sans-serif"
                                }
                            ),
                            $("PanelExpanderButton", "COLLAPSIBLE",  // name of the object to make visible or invisible
                                { column: 1, alignment: go.Spot.Right }
                            )
                        ), // end Table panel
                        // with the list data bound in the Vertical Panel
                        $(go.Panel, "Vertical",
                            {
                                name: "COLLAPSIBLE",  // identify to the PanelExpanderButton
                                padding: 10,
                                stretch: go.GraphObject.Horizontal,  // take up whole available width
                                background: "white",  // to distinguish from the node's body
                                defaultAlignment: go.Spot.Left,  // thus no need to specify alignment on each element
                                itemTemplate: actionTemplate  // the Panel created for each item in Panel.itemArray
                            },
                            new go.Binding("itemArray", "actions")  // bind Panel.itemArray to nodedata.actions
                        )  // end action list Vertical Panel
                    )  // end optional Vertical Panel
                )  // end outer Vertical Panel
            ),  // end "BODY"  Auto Panel
            $(go.Panel,  // this is underneath the "BODY"
                { height: 17 },  // always this height, even if the TreeExpanderButton is not visible
                $("TreeExpanderButton")
            ),
            {
                // show the Adornment when a mouseHover event occurs
                mouseHover: function (e, obj) {
                    var node = obj.part;
                    nodeHoverAdornment.adornedObject = node;
                    node.addAdornment("mouseHover", nodeHoverAdornment);
                }
            },
            {
                contextMenu:     // define a context menu for each node
                    $("ContextMenu",  // that has one button
                        $("ContextMenuButton",
                            $(go.TextBlock, "Email Subscription"),
                            { click: addEmail}
                        ),

                        $("ContextMenuButton",
                        $(go.TextBlock, "Demographics"),
                        { click: addDemographics}
                         ),

                         $("ContextMenuButton",
                         $(go.TextBlock, "Purchase Behaviour"),
                         { click: addPurchase}
                          ),

                          $("ContextMenuButton",
                         $(go.TextBlock, "Customer Engagement"),
                         { click: addCusteng}
                          ),

                          $("ContextMenuButton",
                          $(go.TextBlock, "Model Quantifiers"),
                          { click: addModquan}
                           ),

                           $("ContextMenuButton",
                           $(go.TextBlock, "Geography"),
                           { click: addGeography}
                            ),


                           $("ContextMenuButton",
                           $(go.TextBlock, "Customer Persona"),
                           { click: addCustper}
                            ),

                            $("ContextMenuButton",
                            $(go.TextBlock, "Pro Attributes"),
                            { click: addProattr}
                             ),

                             $("ContextMenuButton",
                             $(go.TextBlock, "Graph creators"),
                             { click: addGraphcreate}
                              ),


                        $("ContextMenuButton",
                            $(go.TextBlock, "Terminal Node"),
                            { click: addTerminal}
                        ),
                       
                        // more ContextMenuButtons would go here
                    )  // end Adornment
            }

        );

        // also define a context menu for the diagram's background
        // this.diagram.contextMenu =
        //     $("ContextMenu",
        //         $("ContextMenuButton",
        //             $(go.TextBlock, "Undo"),
        //             { click: function (e, obj) { e.diagram.commandHandler.undo(); } },
        //             new go.Binding("visible", "", function (o) {
        //                 return o.diagram.commandHandler.canUndo();
        //             }).ofObject()),
        //         $("ContextMenuButton",
        //             $(go.TextBlock, "Redo"),
        //             { click: function (e, obj) { e.diagram.commandHandler.redo(); } },
        //             new go.Binding("visible", "", function (o) {
        //                 return o.diagram.commandHandler.canRedo();
        //             }).ofObject()),
        //         // no binding, always visible button:
        //         $("ContextMenuButton",
        //             $(go.TextBlock, "New Node"),
        //             {
        //                 click: function (e, obj) {
        //                     e.diagram.commit(function (d) {
        //                         var data = {};
        //                         d.model.addNodeData(data);
        //                         //part = d.findPartForData(data);  // must be same data reference, not a new {}
        //                         // set location to saved mouseDownPoint in ContextMenuTool
        //                        // part.location = d.toolManager.contextMenuTool.mouseDownPoint;
        //                     }, 'new node');
        //                 }
        //             })
        //     );

        // define a second kind of Node:
        this.diagram.nodeTemplateMap.add("Terminal",
            $(go.Node, "Spot",
                $(go.Shape, "Circle",
                    { width: 55, height: 55, fill: greengrad, stroke: null }
                ),
                $(go.TextBlock,
                    { font: "10pt Verdana, sans-serif" },
                    new go.Binding("text")
                ),
                {
                    // show the Adornment when a mouseHover event occurs
                    mouseHover: function (e, obj) {
                        var node = obj.part;
                        terminalnodeAdornment.adornedObject = node;
                        node.addAdornment("mouseHover", terminalnodeAdornment);
                    }
                },
            )
              // always this height, even if the TreeExpanderButton is not visible
            );
    

        this.diagram.linkTemplate =
            $(go.Link, go.Link.Orthogonal,
                { deletable: false, corner: 10 },
                $(go.Shape,
                    { strokeWidth: 2 }
                ),
                $(go.TextBlock, go.Link.OrientUpright,
                    {
                        background: "white",
                        visible: false,  // unless the binding sets it to true for a non-empty string
                        segmentIndex: -2,
                        segmentOrientation: go.Link.None
                    },
                    new go.Binding("text", "answer"),
                    // hide empty string;
                    // if the "answer" property is undefined, visible is false due to above default setting
                    new go.Binding("visible", "answer", function (a) { return (a ? true : false); })
                )
            );
        // this.diagram.nodeTemplate =
        //   $(go.Node, "Horizontal",
        //     { background: "lightblue" },
        //     // $(go.Shape, "RoundedRectangle", { strokeWidth: 0 }),

        //     {
        //       click: (e, node: any) => {
        //         console.log(node.jb.name); this.nodeSelected.emit(node.jb.key);
        //         //check for bottomsheet
        //         this.openDialog(node.data);
        //       }
        //     },
        //     new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        //     $(go.Picture,
        //       { margin: 10, width: 50, height: 50, background: "white" },
        //       new go.Binding("source")), // this line is important for data binding to work
        //     $(go.TextBlock,
        //       { margin: 8/*, editable: true */ },
        //       new go.Binding("text", "name")/*.makeTwoWay()*/),
        //     $(go.TextBlock,
        //       { margin: 8/*, editable: true */ },
        //       new go.Binding("text", "name")/*.makeTwoWay()*/),
        //     { // show the Adornment when a mouseHover event occurs
        //       mouseHover: function (e, obj) {
        //         var node = obj.part;
        //         nodeHoverAdornment.adornedObject = node;
        //         node.addAdornment("mouseHover", nodeHoverAdornment);
        //       }
        //     },
        //     $("TreeExpanderButton",
        //       { alignment: go.Spot.MiddleBottom, alignmentFocus: go.Spot.Top },
        //       { visible: true })
        //   );

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
                { angle: 90, layerSpacing: 35, arrangement: go.TreeLayout.ArrangementFixedRoots });

        this.diagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.Orthogonal, corner: 5 },
                $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape


        // this.palette = new go.Palette();
        // this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

        // initialize contents of Palette
        // this.palette.model.nodeDataArray =
        //   [
        //     { key: 1, text: "Alpha", color: "lightblue" },
        //     { key: 2, text: "Beta", color: "orange" },
        //     { key: 3, text: "Gamma", color: "lightgreen" },
        //     { key: 4, text: "Delta", color: "pink" },
        //     { key: 5, text: "Epsilon", color: "yellow" }
        //   ];
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
        // this.palette.div = this.paletteRef.nativeElement;

    }

    openDialog(data: any): void {
        console.log("inside open dialog", data);
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '250px',
            // data: { key: data.key, text: data.text, color: data.color, spending: data.spending }
            data: { key: data.key, question: data.question, actions:data.actions }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("result",result);
            result.actions.push({text:result.country})
            result.actions.push({text:result.gender})
            console.log("final result",result);
            this.someEvent.emit(result);
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
