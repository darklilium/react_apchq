// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/templates/_ObliqueRotationWidget.html":'\x3cdiv\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"gaugeNode" class\x3d"esriObliqueRotationWidgetGauge"\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/_ObliqueRotationWidget","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../lang ./_EventedWidget dijit/_Widget dijit/_TemplatedMixin dojo/text!./templates/_ObliqueRotationWidget.html dojo/_base/html dojo/on dojox/dgauges/CircularGauge ./ObliqueViewer/OVCircularScale dojox/dgauges/CircularRangeIndicator ./ObliqueViewer/OVCircularValueIndicator dojox/dgauges/LinearScaler dojo/dom-geometry dojo/dom-construct dojo/i18n!../nls/jsapi dojo/dom-style dojo/query dojo/dom-attr".split(" "),function(f,
g,h,p,q,d,r,s,t,u,B,v,w,x,k,l,y,z,m,A,n,C,D,E){f=f([r,s,t],{baseClass:"esriObliqueRotationWidget",declaredClass:"esri.dijit._ObliqueRotationWidget",templateString:u,azimuthAngle:0,azimuthField:"SensorAzimuth",isNadir:!1,_rangeIndicatorWidth:8,constructor:function(a,c){g.mixin(this,a);this._i18n=A;this.isNadir=!d.isDefined(this.azimuthAngle)},postCreate:function(){this.inherited(arguments);this._coords=this.domNode.getBoundingClientRect();this._computeCircleRadius();this._getCenter();this.refresh()},
startup:function(){this.inherited(arguments);this._setupGauge();this._addTooltips()},_getFontWeight:function(a){return 120<=a?"bold":"normal"},_getFontSize:function(a){return 120<=a?10:7},_getLabelGap:function(a){return 120<=a?5:2},resize:function(a){a=a||Math.min(this.domNode.getBoundingClientRect().height,this.domNode.getBoundingClientRect().width);var c=this._getLabelGap(a);this._getFontSize(a);var b=this._getFontWeight(a);this._gauge.resize(a,a);this._gauge.set("font",{family:"Helvetica",style:"normal",
size:"10pt",color:"black",weight:b});this._scale.set("labelGap",c);this._addTooltips()},_setupGauge:function(){var a=this,c=Math.min(this._coords.height,this._coords.width);this._gauge=new w({value:0,font:{family:"Helvetica",style:"normal",size:this._getFontSize(c)+"pt",color:"black",weight:this._getFontWeight(c)},style:"margin: -2px;"},this.gaugeNode);this._addGaugeBackground();this._addGaugeScale();this._addGaugeIndicators();this._gauge.startup();this.own(v(this._gauge.domNode,"mouseup",function(b){a._getCenter();
var c=b.pageX-a._centerLocnInPage[0];b=b.pageY-a._centerLocnInPage[1];10>=Math.abs(c)&&10>=Math.abs(b)?(a._scale.azimuthAngle=null,a._switchToNadir()):(a.azimuthAngle=a._convertAngleToAzimuthNotation(a._calculateAngleFromXY(c,b)),a._switchToOblique())}));this.own(this._gauge.on("endEditing",g.hitch(this,function(c){a.isNadir||(this.snap&&this._snap(),a.azimuthAngle=this._convertAngleToAzimuthNotation(c.indicator.value),a.emit("azimuth-change",{azimuth:a.azimuthAngle}))})));this.on("azimuth-change",
function(){a.gaugeNode&&(a.isNadir?(a.rotateAngle=0,a._scale.azimuthAngle=null,n.set(a.gaugeNode,"transform","none")):(a.rotateAngle=a.rotateAngle||0,a.rotateAngle=Math.abs(a.rotateAngle+a.azimuthAngle)>Math.abs(a.rotateAngle-(360-a.azimuthAngle))?360-a.azimuthAngle:0-a.azimuthAngle,n.set(a.gaugeNode,"transform","rotate("+a.rotateAngle+"deg)"),a._scale.azimuthAngle=a.azimuthAngle));a._azimuthIndicator.azimuthAngle=a.azimuthAngle;a.textNodes=a.gaugeNode.querySelectorAll("text")})},_addGaugeBackground:function(){var a=
"M "+this._center.join(",")+"m "+(0-this._radius)+",0 a "+this._radius+","+this._radius+" 0 1,0 "+2*this._radius+",0 a "+this._radius+","+this._radius+" 0 1,0 "+(0-2*this._radius)+",0";this._gauge.addElement("background",function(c){c.createPath({path:a}).setFill("rgba(255,255,255,0.5)").setStroke("rgba(89, 106, 114, 1)")});this._addNadirDataIndicator()},_addNadirDataIndicator:function(){var a="M "+this._center.join(",")+"m -7,0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0";this._gauge.addElement("nadirDataIndicator",
function(c){c.createPath({path:a}).setFill("rgba(54, 104, 178, 0.5)").setStroke("rgba(0,0,0, 1)")})},_addGaugeScale:function(){var a=Math.min(this._coords.width,this._coords.height);this._scale=new x({originX:this._center[0],originY:this._center[1],radius:this._radius,startAngle:0,endAngle:359.999,orientation:"clockwise",scaler:new y({minimum:0,maximum:360,majorTickInterval:90,minorTickInterval:45}),tickShapeFunc:function(a,b,e){if(!e.isMinor)return a.createLine({x1:0,y1:0,x2:e.isMinor?15:20,y2:0}).setStroke({color:"black",
width:1})},labelGap:this._getLabelGap(a),tickLabelFunc:function(a){var b=["E","S","W","N"];return!a.isMinor?0===a.value%90?b[a.value/90]:a.value:" "}});this._gauge.addElement("scale",this._scale)},_addGaugeIndicators:function(){var a=new k({value:359.9999,radius:this._radius-8,startThickness:6,endThickness:6,fill:"rgba(0,0,0,0.9)"});this._scale.addIndicator("indicatorBg",a);this.isNadir?(this._nadirIndicator=this._createNadirIndicator(),this._scale.addIndicator("nadir_indicator",this._nadirIndicator)):
(this._azimuthIndicator=this._createObliqueIndicator(),this._scale.addIndicator("azimuth_indicator",this._azimuthIndicator))},_convertAngleToAzimuthNotation:function(a){if(d.isDefined(a))return(a+90)%360},_convertAngleToGaugeNotation:function(a){if(d.isDefined(a))return(a+270)%360},_computeCircleRadius:function(){var a;a=Math.min(this._coords.width/2,this._coords.height/2);return this._radius=a=Math.floor(a-2)},showAvailableData:function(a){var c=this;if(a=a||this.features){h.forEach(this._availableDataIndicators,
function(a){c._scale.removeIndicator(a)});this._availableDataIndicators=[];this.features=a;for(var b=0,e,b=0;b<a.length;b++)e=new k({start:this._convertAngleToGaugeNotation(a[b].attributes[this.azimuthField]-5),value:this._convertAngleToGaugeNotation(a[b].attributes[this.azimuthField]+5),radius:this._radius,startThickness:7,endThickness:7,fill:"#3668B2",stroke:"#3668B2"}),this._scale.addIndicator("indicator_"+b,e),this._availableDataIndicators.push("indicator_"+b)}},refresh:function(a){g.mixin(this,
a);this.showAvailableData()},_getCenter:function(){var a=[],c,b=[];this._coords=this.gaugeNode.getBoundingClientRect();a.push(Math.ceil(this._coords.width/2));a.push(Math.ceil(this._coords.height/2));c=z.position(this.gaugeNode);b.push(c.x+a[0]);b.push(c.y+a[1]);this._centerLocnInPage=b;return this._center=a},_snap:function(){if(this._azimuthIndicator&&this.features&&this.features.length){var a=this._convertAngleToAzimuthNotation(this._azimuthIndicator.value),c,b,e=1E3;h.forEach(this.features,function(d){b=
Math.min(Math.abs(d.attributes[this.azimuthField]-a),Math.abs(d.attributes[this.azimuthField]-a-360));b<=e&&(c=d.attributes[this.azimuthField],e=b)},this);this.azimuthAngle=c;this._azimuthIndicator.set("value",this._convertAngleToGaugeNotation(this.azimuthAngle))}},_switchToNadir:function(){this.isNadir||(this._scale.azimuthAngle=null,this._nadirIndicator=this._createNadirIndicator(),this._scale.removeIndicator("azimuth_indicator"),this._scale.addIndicator("nadir_indicator",this._nadirIndicator),
this.isNadir=!0,this.emit("azimuth-change",{azimuth:null}))},_switchToOblique:function(){this.isNadir&&(this._azimuthIndicator=this._createObliqueIndicator(),this._scale.removeIndicator("nadir_indicator"),this._scale.addIndicator("azimuth_indicator",this._azimuthIndicator),this._snap(),this.isNadir=!1,this.emit("azimuth-change",{azimuth:this.azimuthAngle}))},_createNadirIndicator:function(){return new l({interactionArea:"gauge",title:"Nadir",interactionMode:"none",indicatorShapeFunc:function(a){return a.createPolyline([-7,
0,7,0,0,0,0,7,0,-7]).setStroke({color:"#000000",width:1})},value:0})},_createObliqueIndicator:function(){var a=this;return new l({interactionArea:"gauge",title:"Change Azimuth",indicatorShapeFunc:function(c){return c.createPolyline([0,-1,a._radius-1,-10,a._radius-1,10,0,1,0,-1]).setFill("rgba(50, 100, 200, 0.5)").setStroke("rgba(50, 100, 200, 0.5)")},value:this._convertAngleToGaugeNotation(this.azimuthAngle),azimuthAngle:this._convertAngleToGaugeNotation(this.azimuthAngle)})},_calculateAngleFromXY:function(a,
c){var b;b=Math.atan2(c,a);return 180*(b/Math.PI)+(0<b?0:360)},_addTooltips:function(){var a=this,c,b=this.domNode.getBoundingClientRect(),b=Math.min(b.width/2,b.height/2);h.forEach(this._tooltipNodes,function(a){this.gaugeNode.removeChild(a.node)},this);this._tooltipNodes=[{top:0,left:b-5,direction:"north",angle:0},{top:b-5,left:2*(b-5),direction:"east",angle:90},{top:2*(b-5),left:b,direction:"south",angle:180},{top:b-5,left:0,direction:"west",angle:270},{top:b-5,left:b-5,direction:"nadir",angle:null}];
h.forEach(this._tooltipNodes,function(b){c=m.create("div");c.style.top=b.top+"px";c.style.left=b.left+"px";c.style.position="absolute";c.style.height="10px";c.style.width="10px";c.style.cursor="pointer";c.style.zIndex=999;c.id=this.domNode.id+"_tooltip_"+b.direction;m.place(c,this.gaugeNode);c.title=this._i18n.widgets.obliqueViewer[b.direction+"Tooltip"];c.onclick=function(){d.isDefined(b.angle)&&(a.azimuthAngle=b.angle,a._azimuthIndicator.set("value",a._convertAngleToGaugeNotation(b.angle)),a.snap&&
a._snap(),a.emit("azimuth-change",{azimuth:a.azimuthAngle}))};b.node=c},this)},setAzimuth:function(a){d.isDefined(a)&&(this.azimuthAngle=a,this.isNadir?this._switchToOblique():this._azimuthIndicator.set("value",this._convertAngleToGaugeNotation(this.azimuthAngle)))}});p("extend-esri")&&g.setObject("dijit._ObliqueRotationWidget",f,q);return f});