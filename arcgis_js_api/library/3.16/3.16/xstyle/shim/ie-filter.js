//>>built
define("xstyle/shim/ie-filter",[],function(){return{onProperty:function(f,e){var b=e.split(/\s+/);if("box-shadow"==f){var c=parseFloat(b[0]),d=parseFloat(b[1]),a=Math.sqrt(c*c+d*d),c=(0<d?180:360)-180*Math.atan(c/d)/Math.PI;return"filter: progid:DXImageTransform.Microsoft.Shadow(strength\x3d"+a+",direction\x3d"+c+",color\x3d'"+b[3]+"');"}if("transform"==f&&e.match(/rotate/))return a=e.match(/rotate\(([-\.0-9]+)deg\)/)[1]/180*Math.PI,b=Math.cos(a),a=Math.sin(a),"filter: progid:DXImageTransform.Microsoft.Matrix(M11\x3d"+
b+", M12\x3d"+-a+",M21\x3d"+a+", M22\x3d"+b+", sizingMethod\x3d'auto expand');"}}});