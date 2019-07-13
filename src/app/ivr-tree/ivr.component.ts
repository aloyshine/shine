import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as go from 'gojs';

import { GuidedDraggingTool } from './GuidedDraggingTool';
import { ModalComponent } from '../modal/modal.component';
import { TerminalcomponentComponent } from '../terminalcomponent/terminalcomponent.component'
import { ModalComponent1 } from '../modalDemoGraphics/modalDemographics.component';
import { ModalComponent3 } from '../modal-customer-engagement/modal-customer-engagement.component';
import { ModalComponent2 } from '../modal-purchase/modal-purchase.component';
import { DemographicsService } from '../demographics.service';
go.Shape.defineFigureGenerator("RoundedRightRectangle", function (shape, w, h) {
    // this figure takes one parameter, the size of the corner
    var p1 = h / 2;  // default corner size
    if (shape !== null) {
        var param1 = shape.parameter1;
        if (!isNaN(param1) && param1 >= 0) p1 = param1;  // can't be negative or NaN
    }
    p1 = Math.min(p1, w / 2);
    p1 = Math.min(p1, h / 2);  // limit by whole height or by half height?
    var geo = new go.Geometry();
    // a single figure consisting of straight lines and quarter-circle arcs
    geo.add(new go.PathFigure(0, 0)
        .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
        .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
        .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
        .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
        .add(new go.PathSegment(go.PathSegment.Line, p1, h))
        .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
    // don't intersect with two top corners when used in an "Auto" Panel
    geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1);
    geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0);
    return geo;
});

go.Shape.defineFigureGenerator("RoundedLeftRectangle", function (shape, w, h) {
    // this figure takes one parameter, the size of the corner
    var p1 = h / 2;  // default corner size
    if (shape !== null) {
        var param1 = shape.parameter1;
        if (!isNaN(param1) && param1 >= 0) p1 = param1;  // can't be negative or NaN
    }
    p1 = Math.min(p1, w / 2);
    p1 = Math.min(p1, h / 2);  // limit by whole height or by half height?
    var geo = new go.Geometry();
    // a single figure consisting of straight lines and quarter-circle arcs
    geo.add(new go.PathFigure(0, p1)
        .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
        .add(new go.PathSegment(go.PathSegment.Line, w, 0))
        .add(new go.PathSegment(go.PathSegment.Line, w, h))
        .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close()));
    // don't intersect with two top corners when used in an "Auto" Panel
    geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1);
    geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0);
    return geo;
});



@Component({
    selector: 'app-ivr',
    templateUrl: './ivr.component.html',
    styleUrls: ['./ivr.component.css']
})
export class IvrComponent implements OnInit {
    private diagram: go.Diagram = new go.Diagram();
    private palette: go.Palette = new go.Palette();

    @ViewChild('diagramDiv')
    private diagramRef: ElementRef;

    @ViewChild('g')
    private inputRef: ElementRef;

    @ViewChild('paletteDiv')
    private paletteRef: ElementRef;
    message: string;

    @Input()
    get model(): go.Model { return this.diagram.model; }
    set model(val: go.Model) { this.diagram.model = val; }

    @Output()
    nodeSelected = new EventEmitter<any>();

    @Output()
    typeOfNode = new EventEmitter<any>();

    @Output()
    terminalevent = new EventEmitter<any>();

    @Output()
    nodeMetrics = new EventEmitter<any>();

    @Output()
    modelChanged = new EventEmitter<go.ChangedEvent>();
    allCustomersArray = [];
    nodeDataArrayInsideIVR = [];
    linkDataArrayInsideIVR = [];


    constructor(public dialog: MatDialog,private _demographicservice:DemographicsService) {

        const $ = go.GraphObject.make;
        // Place GoJS license key here:
        // (go as any).licenseKey = "..."
        this.diagram = new go.Diagram();
        this.diagram.initialContentAlignment = go.Spot.Center;
        this.diagram.allowCopy = false;
        // this.diagram.draggingTool.dragsTree = true;
        this.diagram.commandHandler.deletesTree = true;
        this.diagram.allowDrop = true;

        this.diagram.undoManager.isEnabled = true;
        // this.diagram.hoverDelay = 100;
        this.diagram.toolManager.draggingTool = new GuidedDraggingTool();
        this.diagram.addDiagramListener("ChangedSelection",
            e => {
                // console.log('changed selection event', e);
                const node = e.diagram.selection.first();
                console.log('changed selection node', node.data);
                if (node.data.question === "All Customers") {
                    node.data.filtered = this.allCustomersArray;
                }

                // this.nodeDataArrayInsideIVR.push(node.data);
                // this.linkDataArrayInsideIVR.push(node.data);

                // check if an element exists in array using a comparer function
                // comparer : function(currentElement)
                function inArray(arr1, comparer) {
                    for (var i = 0; i < arr1.length; i++) {
                        if (comparer(arr1[i])) return true;
                    }
                    return false;
                };

                // adds an element to the array if it does not already exist using a comparer
                // function
                function pushIfNotExist(arr, element, comparer) {
                    if (!inArray(arr, comparer)) {
                        arr.push(element);
                    }
                };
                if (node.data.question) {
                    // debugger;
                    pushIfNotExist(this.nodeDataArrayInsideIVR, node.data, function (e) {
                        return e.key === node.data.key;
                    });

                } else {
                    pushIfNotExist(this.linkDataArrayInsideIVR, node.data, function (e) {
                        return e.from === node.data.from;
                    });

                }
                console.log("nodeDataArrayInsideIVR", this.nodeDataArrayInsideIVR)
                console.log("linkDataArrayInsideIVR", this.linkDataArrayInsideIVR);
                // this.allConnectionsArray.push(node.data);
                // console.log("all connections array", this.allConnectionsArray);
                this.nodeSelected.emit(node.data);
            });
        this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

        var that = this;

        function addEmail(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Email' })
        }

        function addDemographics(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Demographics' })
        }

        function addPurchase(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Purchase' })
        }

        function addCusteng(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Customer Engagement' })
        }

        function addModquan(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Model Qualifiers' })
        }

        function addGeography(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Geography' })
        }

        function addCustper(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Customer Persona' })
        }

        function addProattr(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Pro Attributes' })
        }

        function addGraphcreate(e, obj) {
            console.log("email sub");
            that.typeOfNode.emit({ key: obj.part.key, name: 'Graph Create' })
        }

        function addTerminal(e, obj) {
            console.log("uuu", obj);
            that.typeOfNode.emit({ key: obj.part.key, name: 'Terminal' })
        }
        // this is shown by the mouseHover event handler
        // var nodeHoverAdornment =
        //     $(go.Adornment, "Spot",
        //         {
        //             background: "transparent",
        //             // hide the Adornment when the mouse leaves it
        //             mouseLeave: function (e, obj) {
        //                 var ad = obj.part;
        //                 ad.adornedPart.removeAdornment("mouseHover");
        //             }
        //         },
        //         $(go.Placeholder,
        //             {
        //                 background: "transparent",  // to allow this Placeholder to be "seen" by mouse events
        //                 isActionable: true,  // needed because this is in a temporary Layer
        //                 click: function (e, obj) {
        //                     var node = obj.part.adornedPart;
        //                     node.diagram.select(node);
        //                 }
        //             }),
        //         {
        //             contextMenu:     // define a context menu for each node
        //                 $("ContextMenu",  // that has one button
        //                     $("ContextMenuButton",
        //                         $(go.TextBlock, "Email Sub"),
        //                         { click: addEmail }
        //                     )
        //                     // more ContextMenuButtons would go here
        //                 )  // end Adornment
        //         },
        //         $("Button",
        //             // { alignment: go.Spot.Left, alignmentFocus: go.Spot.Right, },
        //             {
        //                 alignment: go.Spot.Left,
        //                 alignmentFocus: go.Spot.Right,
        //                 "ButtonBorder.fill": "#007bff",
        //                 "ButtonBorder.stroke": "#007bff",
        //                 "_buttonFillOver": "#007bff",
        //                 "_buttonStrokeOver": "#007bff",
        //                 cursor: "pointer",
        //                 width: 80,

        //             },
        //             {
        //                 click: function (e, obj) {
        //                     console.log("prashant", e, obj.part.key);
        //                     console.log("Email Subscription");
        //                     that.typeOfNode.emit({ key: obj.part.key, name: 'email' })
        //                 }
        //             },
        //             $(go.TextBlock, "Email Sub", {
        //                 stroke: '#fff',
        //                 margin: 2,
        //             })),
        //         $("Button",
        //             // { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
        //             {
        //                 alignment: go.Spot.Right,
        //                 alignmentFocus: go.Spot.Left,
        //                 "ButtonBorder.fill": "#007bff",
        //                 "ButtonBorder.stroke": "#007bff",
        //                 "_buttonFillOver": "#007bff",
        //                 "_buttonStrokeOver": "#007bff",
        //                 cursor: "pointer",
        //                 width: 100,

        //             },
        //             {
        //                 click: function (e, obj) {
        //                     console.log("Demographics");
        //                     that.typeOfNode.emit({ key: obj.part.key, name: 'demographics' })
        //                 }
        //             },
        //             $(go.TextBlock, "Demographics", {
        //                 stroke: '#fff',
        //                 margin: 2,
        //             })),
        //         $("Button",
        //             // { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left },
        //             {
        //                 alignment: go.Spot.Right,
        //                 alignmentFocus: go.Spot.Left,
        //                 "ButtonBorder.fill": "#007bff",
        //                 "ButtonBorder.stroke": "#007bff",
        //                 "_buttonFillOver": "#007bff",
        //                 "_buttonStrokeOver": "#007bff",
        //                 cursor: "pointer",
        //                 width: 100,

        //             },
        //             {
        //                 click: function (e, obj) {
        //                     console.log("ADD TERMINAL");
        //                     that.typeOfNode.emit({ key: obj.part.key, name: 'addterminal' })
        //                 }
        //             },
        //             $(go.TextBlock, "Add Terminal", {
        //                 stroke: '#fff',
        //                 margin: 2,
        //             }))
        //     );

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
                    console.log("type of node ", node.jb.question);
                    // console.log(node.jb.name);

                    // if(node.jb.name === "geography"){

                    //     this.openDialogGeography(node.data);
                    // }

                    // if(node.jb.name === "demographics"){

                    //     this.openDialog(node.data);
                    //     // this.openDialogGeography(node.data);
                    // }
                    // this.openDialog(node.data);



                    switch (node.jb.question) {
                        case "Geography":
                            this.openDialogGeography(node.data);
                            break;
                        case "Demographics":
                            this.openDialogDemographics(node.data);
                            break;
                        case "Purchase":
                            this.openDialogPurchase(node.data);
                            break;
                        case "Customer Engagement":
                            this.openDialogCustomerEngagement(node.data);
                            break;
                    }

                    // this.nodeSelected.emit(node.jb.key);
                    //check for bottomsheet
                    // this.openDialog(node.data);
                }
            },

            // the main "BODY" consists of a RoundedRectangle surrounding nested Panels
            $(go.Panel, "Auto",
                { name: "BODY" },
                $(go.Panel, "Horizontal",
                    $(go.Shape, { figure: "RoundedLeftRectangle", parameter1: 35, width: 70,height:60 },
                        {
                            fill: bluegrad, stroke: '#ccc'
                            // allow many kinds of links
                            //fromLinkable: true, toLinkable: true,
                            // fromLinkableSelfNode: true, toLinkableSelfNode: true,
                            // fromLinkableDuplicates: false, toLinkableDuplicates:false
                        },
                        new go.Binding("fill", "color")
                    ), $(go.Shape, { figure: "RoundedRightRectangle", parameter1: 35, width: 210,height:60 },
                        {
                            fill: '#fff', stroke: '#ccc', portId: "", cursor: "pointer",
                            // allow many kinds of links
                             fromLinkable: true, toLinkable: true,
                            // fromLinkableSelfNode: true, toLinkableSelfNode: true,
                            // fromLinkableDuplicates: true, toLinkableDuplicates: true
                        }
                    )),

                $(go.Panel, "Horizontal",
                    $(go.Panel,"Vertical",
                        $(go.Picture,
                        { margin: new go.Margin(0,0,0,10), width: 50, height: 50, background: "transparent" },
                        new go.Binding("source")
                        ),
                    ),
                    $(go.Panel,"Horizontal",{margin:new go.Margin(0,0,0,40)}),
                    $(go.Panel, "Horizontal", {padding: new go.Margin(0,130,0,0)},
                      
                         
                        
                        $(go.TextBlock,
                            {
                                stretch: go.GraphObject.Horizontal,
                                font: "10pt sans-serif",
                                stroke:'#3C5364'
                            },
                            new go.Binding("text", "question")
                        ),

                    ),
                    { margin: 3 },
                    // the title

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
                            // $("PanelExpanderButton", "COLLAPSIBLE",  // name of the object to make visible or invisible
                            //     { column: 1, alignment: go.Spot.Right }
                            // )
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
            // {
            //     // show the Adornment when a mouseHover event occurs
            //     mouseHover: function (e, obj) {
            //         var node = obj.part;
            //         nodeHoverAdornment.adornedObject = node;
            //         node.addAdornment("mouseHover", nodeHoverAdornment);
            //     }
            // },
            // {
            //     contextMenu:     // define a context menu for each node
            //         $("ContextMenu",  // that has one button
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Email Subscription"),
            //                 { click: addEmail }
            //             ),
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Demographics"),
            //                 { click: addDemographics }
            //             ),
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Purchase Behaviour"),
            //                 { click: addPurchase }
            //             ),
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Customer Engagement"),
            //                 { click: addCusteng }
            //             ),
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Model Qualifiers"),
            //                 { click: addModquan }
            //             ),
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Geography"),
            //                 { click: addGeography }
            //             ),
            //
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Customer Persona"),
            //                 { click: addCustper }
            //             ),
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Pro Attributes"),
            //                 { click: addProattr }
            //             ),
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Graph creators"),
            //                 { click: addGraphcreate }
            //             ),
            //
            //
            //             $("ContextMenuButton",
            //                 $(go.TextBlock, "Terminal Node"),
            //                 { click: addTerminal }
            //             ),
            //
            //             // more ContextMenuButtons would go here
            //         )  // end Adornment
            // }

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
                {
                    click: (e, node: any) => {
                        console.log(node.jb.name); this.nodeSelected.emit(node.jb.key);
                        //check for bottomsheet
                        this.openTerminalDialog(node.data);
                    }
                },
                $(go.Shape, "Circle",
                    { width: 55, height: 55, fill: greengrad, stroke: null }
                ),
                $(go.TextBlock,
                    { font: "10pt Verdana, sans-serif" },
                    new go.Binding("text", "label")
                ),
                // {
                //     // show the Adornment when a mouseHover event occurs
                //     mouseHover: function (e, obj) {
                //         var node = obj.part;
                //         terminalnodeAdornment.adornedObject = node;
                //         node.addAdornment("mouseHover", terminalnodeAdornment);
                //     }
                // },
            )
            // always this height, even if the TreeExpanderButton is not visible
        );


        // this.diagram.linkTemplate =
        //     $(go.Link, go.Link.Orthogonal,
        //         { deletable: false, corner: 10 },
        //         $(go.Shape,
        //             { strokeWidth: 2 }
        //         ),
        //         $(go.TextBlock, go.Link.OrientUpright,
        //             {
        //                 background: "white",
        //                 visible: false,  // unless the binding sets it to true for a non-empty string
        //                 segmentIndex: -2,
        //                 segmentOrientation: go.Link.None
        //             },
        //             new go.Binding("text", "answer"),
        //             // hide empty string;
        //             // if the "answer" property is undefined, visible is false due to above default setting
        //             new go.Binding("visible", "answer", function (a) { return (a ? true : false); })
        //         )
        //     );


        this.diagram.linkTemplate =
            $(go.Link,
                // allow relinking
                { relinkableFrom: true, relinkableTo: true },
                $(go.Shape, { strokeWidth: 2 }),
                $(go.Shape, { toArrow: "OpenTriangle" })
            );






        // this.diagram.layout =
        //     $(go.TreeLayout,
        //         { angle: 90, layerSpacing: 35 });

        // this.diagram.linkTemplate =
        //     $(go.Link,
        //         { routing: go.Link.Orthogonal, corner: 5 },
        //         $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape


        this.palette = new go.Palette();
        this.palette.nodeTemplateMap = this.diagram.nodeTemplateMap;

        // initialize contents of Palette
        this.palette.model.nodeDataArray =
            [
                // { key: 1, question: "All Customers", color: "lightblue", actions: [] },
                // { key: 2, question: "Demographics", color: "lightgreen", actions: [] },
                // { key: 3, question: "Email", color: "orange", actions: [] },
                // { key: 4, question: "Purchase", color: "pink", actions: [] },
                // { key: 5, question: "Customer Engagement", color: "yellow", actions: [] },
                // { key: 6, question: "Model Qualifiers", color: "yellow", actions: [] },
                // { key: 7, question: "Geography", color: "yellow", actions: [] },
                // { key: 8, question: "Customer Persona", color: "yellow", actions: [] },
                // { key: 9, question: "Pro Attributes", color: "yellow", actions: [] },
                // { key: 10, question: "Graph Create", color: "yellow", actions: [] },
                // { key: 11, question: "Terminal", color: "yellow", actions: [] },
                {
                    key: 1,
                    question: "All Customers",
                    color: "lightblue", source: './assets/social__person_Group_Business_community_teamwork_relationship-512.png'
                },

                {
                    key: 2,
                    question: "Demographics",
                    color: "#F1C40F", source: './assets/156283676431409527.png'
                },

                {
                    key: 3,
                    question: "Email",
                    color: "#32B8B3",
                    source: './assets/584856b4e0bb315b0f7675ac.png'
                },

                {
                    key: 4,
                    question: "Purchase",
                    color: "#8046b2",
                    source: './assets/Download-Shopping-Cart-Png-Image-75838-For-Designing-Projects.png'
                },

                {
                    key: 5,
                    question: "Customer Engagement",
                    color: "#4687b2", source: './assets/user-480.png'
                },

                {
                    key: 6,
                    question: "Model Qualifiers",
                    color: "#B24646", source: './assets/imageedit-3-8418722331.png'

                },

                {
                    key: 7,
                    question: "Geography",
                    color: "#16A085", source: 'https://ya-webdesign.com/images/black-and-white-globe-png.png'
                },

                {
                    key: 8,
                    question: "Customer Persona",
                    color: "#F5B041",
                    source: 'https://cdn3.iconfinder.com/data/icons/online-user/120/user-edit-1-512.png'
                },

                {
                    key: 9,
                    question: "Pro Attributes",
                    color: "#82E0AA ", source: 'http://cdn.onlinewebfonts.com/svg/img_164241.png'
                },

                {
                    key: 10,
                    question: "Terminal",
                    color: "yellow"
                },

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


    ngOnInit() {
        this.diagram.div = this.diagramRef.nativeElement;
        this.palette.div = this.paletteRef.nativeElement;

    }

    openDialogGeography(data: any): void {
        console.log("inside open dialog geography", data);
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '250px',disableClose: true,
            // data: { key: data.key, text: data.text, color: data.color, spending: data.spending }
            data: { key: data.key, question: data.question, actions: data.actions }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("result", result);
            result.actions.push({ text: result.country, fill: "green" })
            console.log("final result emitted", result);
            console.log("all of the customers", this.allCustomersArray);
            let ageFilteredCustomers = this.allCustomersArray.filter((customer) => {
                return customer.Age < 37
            });
            console.log('filtered customers based on age', ageFilteredCustomers);
            this.nodeMetrics.emit(result);
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
    openDialogPurchase(data: any): void {
        console.log("inside open dialog geography", data);
        const dialogRef = this.dialog.open(ModalComponent2, {
            width: '250px',
            // data: { key: data.key, text: data.text, color: data.color, spending: data.spending }
            data: { key: data.key, question: data.question, actions: data.actions }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("result", result);
            result.actions.push({ text: result.purchase, fill: "red" })
            console.log("final result", result);
            this.nodeMetrics.emit(result);
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
    openDialogCustomerEngagement(data: any): void {
        console.log("inside open dialog geography", data);
        const dialogRef = this.dialog.open(ModalComponent3, {
            width: '250px',
            // data: { key: data.key, text: data.text, color: data.color, spending: data.spending }
            data: { key: data.key, question: data.question, actions: data.actions }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log("result", result);
            result.actions.push({ text: result.customerengagement, fill: "lime" })
            console.log("final result", result);
            this.nodeMetrics.emit(result);
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

    findCorrectParent(result) {
        
        var parentLink = this.linkDataArrayInsideIVR.find((el) => {
            return el.to === result["key"];
        })
        console.log("parentLink", parentLink);
        // use parent.from to get the data to filter upon
        var nodeToActUpon = this.nodeDataArrayInsideIVR.find(el => {
            return el.key === parentLink.from;
        })
        console.log("nodeToActUpon", nodeToActUpon);
        return nodeToActUpon;
    }
    openDialogDemographics(data: any): void {
        console.log("inside open dialog demographics", data);
        const dialogRef = this.dialog.open(ModalComponent1, {
            width: '250px',
            // data: { key: data.key, text: data.text, color: data.color, spending: data.spending }
            data: { key: data.key, question: data.question, actions: data.actions }
        });

        dialogRef.afterClosed().subscribe(res => {
            
            this._demographicservice.currentMessage.subscribe(message => this.message = message)
            
            console.log("message",this.message)
            let result=this.message['datainner']
            console.log("resultkey", result["key"]);
           // if (result.country) {
//
           //     //result.actions.push({ text: result.country, fill: "green" })
           // }
//
           // if (result.gender) {
//
           //     //result.actions.push({ text: result.gender, fill: "yellow" })
           // }
           // if (result.age) {
//
           //     // result.actions.push({ text: result.age, fill: "blue" })
           // }
           // if (result.income) {
//
           //     // result.actions.push({ text: result.income, fill: "dodgerblue" })
           // }
            // console.log("final result", result);
            // console.log("all of the customers", this.allCustomersArray);
            // console.log("data", data);
            
            var nodeToActUpon = this.findCorrectParent(result)
            console.log("nodetoactupon",nodeToActUpon)
            let innerage=result["Age"];
            let ageFilteredCustomers:any
            innerage.forEach(age => {
                if(age.indexOf(">")!=-1){
                    let actualage=age.split(">")
                    
                    console.log(actualage)
                    ageFilteredCustomers=nodeToActUpon.filtered.filter((customer) => {

                        return (customer.Age > actualage[1])
                    });
                    
                }
                
            });
            // let ageIncomeFilteredCustomers = nodeToActUpon.filtered.filter((customer) => {

            //     return ((customer.Age < result.age) || (Number(customer.Income) < Number(result.income)))
            // });
            console.log('filtered customers based on age and income', ageFilteredCustomers);
            data.filtered = ageFilteredCustomers
            // result.filtered = ageIncomeFilteredCustomers;
            // this.nodeMetrics.emit(result);
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

    openTerminalDialog(data) {
        // console.log("data in terminal", data);
        this.terminalevent.emit(data)
    }
    csvJSON(csv) {
        var lines = csv.split("\n");


        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {

            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            this.allCustomersArray.push(obj);
            console.log("json result", this.allCustomersArray);
        }

        //return result; //JavaScript object
        return JSON.stringify(this.allCustomersArray); //JSON
    }
    convertFile(e) {
        const input = (<HTMLInputElement>document.getElementById('fileInput'))

        const reader = new FileReader();
        reader.onload = () => {
            let text = reader.result;
            //   console.log('CSV: ', text.substring(0, 100) + '...');

            //convert text to json here
            var json = this.csvJSON(text);
        };
        reader.readAsText(input.files[0]);
    };
}
