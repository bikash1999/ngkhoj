function getColor(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,v,m,g,y,r=r||i.length>0;if(i.length>0)for(var b=0;b<i.length;b++)if(e>i[b].lo&&e<=i[b].hi)return i[b].color;s=n.length;if(s===1)return n[0];o=r?1/s:1/(s-1),u=[];for(var b=0;b<n.length;b++)a=r?o*(b+1):o*b,f=parseInt(cutHex(n[b]).substring(0,2),16),l=parseInt(cutHex(n[b]).substring(2,4),16),c=parseInt(cutHex(n[b]).substring(4,6),16),u[b]={pct:a,color:{r:f,g:l,b:c}};if(t===0)return"rgb("+[u[0].color.r,u[0].color.g,u[0].color.b].join(",")+")";for(var w=0;w<u.length;w++)if(t<=u[w].pct)return r?"rgb("+[u[w].color.r,u[w].color.g,u[w].color.b].join(",")+")":(h=u[w-1],p=u[w],d=p.pct-h.pct,v=(t-h.pct)/d,m=1-v,g=v,y={r:Math.floor(h.color.r*m+p.color.r*g),g:Math.floor(h.color.g*m+p.color.g*g),b:Math.floor(h.color.b*m+p.color.b*g)},"rgb("+[y.r,y.g,y.b].join(",")+")")}function setDy(e,t,n){if(!ie||ie>9)e.node.firstChild.attributes.dy.value=0}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function cutHex(e){return e.charAt(0)=="#"?e.substring(1,7):e}function humanFriendlyNumber(e,t){var n,r,i,s;n=Math.pow,r=n(10,t),i=7;while(i)s=n(10,i--*3),s<=e&&(e=Math.round(e*r/s)/r+"KMGTPE"[i]);return e}function getStyle(e,t){var n="";return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,"").getPropertyValue(t):e.currentStyle&&(t=t.replace(/\-(\w)/g,function(e,t){return t.toUpperCase()}),n=e.currentStyle[t]),n}function onCreateElementNsReady(e){document.createElementNS!==undefined?e():setTimeout(function(){onCreateElementNsReady(e)},100)}JustGage=function(e){var t=this;t.config={id:e.id,parentNode:e.parentNode?e.parentNode:null,width:e.width?e.width:null,height:e.height?e.height:null,title:e.title?e.title:"",titleFontColor:e.titleFontColor?e.titleFontColor:"#999999",value:e.value?e.value:0,valueFontColor:e.valueFontColor?e.valueFontColor:"#010101",symbol:e.symbol?e.symbol:"",min:e.min!==undefined?parseFloat(e.min):0,max:e.max!==undefined?parseFloat(e.max):100,humanFriendlyDecimal:e.humanFriendlyDecimal?e.humanFriendlyDecimal:0,textRenderer:e.textRenderer?e.textRenderer:null,gaugeWidthScale:e.gaugeWidthScale?e.gaugeWidthScale:1,gaugeColor:e.gaugeColor?e.gaugeColor:"#edebeb",label:e.label?e.label:"",labelFontColor:e.labelFontColor?e.labelFontColor:"#b3b3b3",shadowOpacity:e.shadowOpacity?e.shadowOpacity:.2,shadowSize:e.shadowSize?e.shadowSize:5,shadowVerticalOffset:e.shadowVerticalOffset?e.shadowVerticalOffset:3,levelColors:e.levelColors?e.levelColors:["#a9d70b","#f9c802","#ff0000"],startAnimationTime:e.startAnimationTime?e.startAnimationTime:700,startAnimationType:e.startAnimationType?e.startAnimationType:">",refreshAnimationTime:e.refreshAnimationTime?e.refreshAnimationTime:700,refreshAnimationType:e.refreshAnimationType?e.refreshAnimationType:">",donutStartAngle:e.donutStartAngle?e.donutStartAngle:90,valueMinFontSize:e.valueMinFontSize||16,titleMinFontSize:e.titleMinFontSize||10,labelMinFontSize:e.labelMinFontSize||10,minLabelMinFontSize:e.minLabelMinFontSize||10,maxLabelMinFontSize:e.maxLabelMinFontSize||10,hideValue:e.hideValue?e.hideValue:!1,hideMinMax:e.hideMinMax?e.hideMinMax:!1,hideInnerShadow:e.hideInnerShadow?e.hideInnerShadow:!1,humanFriendly:e.humanFriendly?e.humanFriendly:!1,noGradient:e.noGradient?e.noGradient:!1,donut:e.donut?e.donut:!1,relativeGaugeSize:e.relativeGaugeSize?e.relativeGaugeSize:!1,counter:e.counter?e.counter:!1,decimals:e.decimals?e.decimals:0,customSectors:e.customSectors?e.customSectors:[]};var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x;t.config.value>t.config.max&&(t.config.value=t.config.max),t.config.value<t.config.min&&(t.config.value=t.config.min),t.originalValue=e.value,t.config.id!==null&&document.getElementById(t.config.id)!==null?t.canvas=Raphael(t.config.id,"100%","100%"):t.config.parentNode!==null&&(t.canvas=Raphael(t.config.parentNode,"100%","100%")),t.config.relativeGaugeSize===!0&&t.canvas.setViewBox(0,0,200,150,!0),t.config.relativeGaugeSize===!0?(n=200,r=150):t.config.width!==null&&t.config.height!==null?(n=t.config.width,r=t.config.height):t.config.parentNode!==null?(t.canvas.setViewBox(0,0,200,150,!0),n=200,r=150):(n=getStyle(document.getElementById(t.config.id),"width").slice(0,-2)*1,r=getStyle(document.getElementById(t.config.id),"height").slice(0,-2)*1),t.config.donut===!0?(n>r?(s=r,i=s):n<r?(i=n,s=i,s>r&&(o=s/r,s/=o,i=s/o)):(i=n,s=i),u=(n-i)/2,a=(r-s)/2,f=s/8>10?s/10:10,l=u+i/2,c=a+s/11,h=s/6.4>16?s/5.4:18,p=u+i/2,t.config.label!==""?d=a+s/1.85:d=a+s/1.7,v=s/16>10?s/16:10,m=u+i/2,g=d+v,y=s/16>10?s/16:10,b=u+i/10+i/6.666666666666667*t.config.gaugeWidthScale/2,w=g,E=s/16>10?s/16:10,S=u+i-i/10-i/6.666666666666667*t.config.gaugeWidthScale/2,x=g):(n>r?(s=r,i=s*1.25,i>n&&(o=i/n,i/=o,s/=o)):n<r?(i=n,s=i/1.25,s>r&&(o=s/r,s/=o,i=s/o)):(i=n,s=i*.75),u=(n-i)/2,a=(r-s)/2,f=s/8>t.config.titleMinFontSize?s/10:t.config.titleMinFontSize,l=u+i/2,c=a+s/6.4,h=s/6.5>t.config.valueMinFontSize?s/6.5:t.config.valueMinFontSize,p=u+i/2,d=a+s/1.275,v=s/16>t.config.labelMinFontSize?s/16:t.config.labelMinFontSize,m=u+i/2,g=d+h/2+5,y=s/16>t.config.minLabelMinFontSize?s/16:t.config.minLabelMinFontSize,b=u+i/10+i/6.666666666666667*t.config.gaugeWidthScale/2,w=g,E=s/16>t.config.maxLabelMinFontSize?s/16:t.config.maxLabelMinFontSize,S=u+i-i/10-i/6.666666666666667*t.config.gaugeWidthScale/2,x=g),t.params={canvasW:n,canvasH:r,widgetW:i,widgetH:s,dx:u,dy:a,titleFontSize:f,titleX:l,titleY:c,valueFontSize:h,valueX:p,valueY:d,labelFontSize:v,labelX:m,labelY:g,minFontSize:y,minX:b,minY:w,maxFontSize:E,maxX:S,maxY:x},n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x=null,t.canvas.customAttributes.pki=function(e,t,n,r,i,s,o,u,a){var f,l,c,h,p,d,v,m,g,y;return a?(f=(1-2*(e-t)/(n-t))*Math.PI,l=r/2-r/7,c=l-r/6.666666666666667*u,h=r/2+s,p=i/1.95+o,d=r/2+s+l*Math.cos(f),v=i-(i-p)+0-l*Math.sin(f),m=r/2+s+c*Math.cos(f),g=i-(i-p)+0-c*Math.sin(f),y+="M"+(h-c)+","+p+" ",y+="L"+(h-l)+","+p+" ",e>(n-t)/2&&(y+="A"+l+","+l+" 0 0 1 "+(h+l)+","+p+" "),y+="A"+l+","+l+" 0 0 1 "+d+","+v+" ",y+="L"+m+","+g+" ",e>(n-t)/2&&(y+="A"+c+","+c+" 0 0 0 "+(h+c)+","+p+" "),y+="A"+c+","+c+" 0 0 0 "+(h-c)+","+p+" ",y+="Z ",{path:y}):(f=(1-(e-t)/(n-t))*Math.PI,l=r/2-r/10,c=l-r/6.666666666666667*u,h=r/2+s,p=i/1.25+o,d=r/2+s+l*Math.cos(f),v=i-(i-p)+0-l*Math.sin(f),m=r/2+s+c*Math.cos(f),g=i-(i-p)+0-c*Math.sin(f),y+="M"+(h-c)+","+p+" ",y+="L"+(h-l)+","+p+" ",y+="A"+l+","+l+" 0 0 1 "+d+","+v+" ",y+="L"+m+","+g+" ",y+="A"+c+","+c+" 0 0 0 "+(h-c)+","+p+" ",y+="Z ",{path:y})},t.gauge=t.canvas.path().attr({stroke:"none",fill:t.config.gaugeColor,pki:[t.config.max,t.config.min,t.config.max,t.params.widgetW,t.params.widgetH,t.params.dx,t.params.dy,t.config.gaugeWidthScale,t.config.donut]}),t.level=t.canvas.path().attr({stroke:"none",fill:getColor(t.config.value,(t.config.value-t.config.min)/(t.config.max-t.config.min),t.config.levelColors,t.config.noGradient,t.config.customSectors),pki:[t.config.min,t.config.min,t.config.max,t.params.widgetW,t.params.widgetH,t.params.dx,t.params.dy,t.config.gaugeWidthScale,t.config.donut]}),t.config.donut&&t.level.transform("r"+t.config.donutStartAngle+", "+(t.params.widgetW/2+t.params.dx)+", "+(t.params.widgetH/1.95+t.params.dy)),t.txtTitle=t.canvas.text(t.params.titleX,t.params.titleY,t.config.title),t.txtTitle.attr({"font-size":t.params.titleFontSize,"font-weight":"bold","font-family":"Arial",fill:t.config.titleFontColor,"fill-opacity":"1"}),setDy(t.txtTitle,t.params.titleFontSize,t.params.titleY),t.txtValue=t.canvas.text(t.params.valueX,t.params.valueY,0),t.txtValue.attr({"font-size":t.params.valueFontSize,"font-weight":"bold","font-family":"Arial",fill:t.config.valueFontColor,"fill-opacity":"0"}),setDy(t.txtValue,t.params.valueFontSize,t.params.valueY),t.txtLabel=t.canvas.text(t.params.labelX,t.params.labelY,t.config.label),t.txtLabel.attr({"font-size":t.params.labelFontSize,"font-weight":"normal","font-family":"Arial",fill:t.config.labelFontColor,"fill-opacity":"0"}),setDy(t.txtLabel,t.params.labelFontSize,t.params.labelY),t.txtMinimum=t.config.min,t.config.humanFriendly&&(t.txtMinimum=humanFriendlyNumber(t.config.min,t.config.humanFriendlyDecimal)),t.txtMin=t.canvas.text(t.params.minX,t.params.minY,t.txtMinimum),t.txtMin.attr({"font-size":t.params.minFontSize,"font-weight":"normal","font-family":"Arial",fill:t.config.labelFontColor,"fill-opacity":t.config.hideMinMax||t.config.donut?"0":"1"}),setDy(t.txtMin,t.params.minFontSize,t.params.minY),t.txtMaximum=t.config.max,t.config.humanFriendly&&(t.txtMaximum=humanFriendlyNumber(t.config.max,t.config.humanFriendlyDecimal)),t.txtMax=t.canvas.text(t.params.maxX,t.params.maxY,t.txtMaximum),t.txtMax.attr({"font-size":t.params.maxFontSize,"font-weight":"normal","font-family":"Arial",fill:t.config.labelFontColor,"fill-opacity":t.config.hideMinMax||t.config.donut?"0":"1"}),setDy(t.txtMax,t.params.maxFontSize,t.params.maxY);var T=t.canvas.canvas.childNodes[1],N="http://www.w3.org/2000/svg";ie<9?onCreateElementNsReady(function(){t.generateShadow(N,T)}):t.generateShadow(N,T),T,N=null,t.config.textRenderer?t.originalValue=t.config.textRenderer(t.originalValue):t.config.humanFriendly?t.originalValue=humanFriendlyNumber(t.originalValue,t.config.humanFriendlyDecimal)+t.config.symbol:t.originalValue=(t.originalValue*1).toFixed(t.config.decimals)+t.config.symbol,t.config.counter===!0?(eve.on("raphael.anim.frame."+t.level.id,function(){var e=t.level.attr("pki");t.config.textRenderer?t.txtValue.attr("text",t.config.textRenderer(Math.floor(e[0]))):t.config.humanFriendly?t.txtValue.attr("text",humanFriendlyNumber(Math.floor(e[0]),t.config.humanFriendlyDecimal)+t.config.symbol):t.txtValue.attr("text",(e[0]*1).toFixed(t.config.decimals)+t.config.symbol),setDy(t.txtValue,t.params.valueFontSize,t.params.valueY),e=null}),eve.on("raphael.anim.finish."+t.level.id,function(){t.txtValue.attr({text:t.originalValue}),setDy(t.txtValue,t.params.valueFontSize,t.params.valueY)})):eve.on("raphael.anim.start."+t.level.id,function(){t.txtValue.attr({text:t.originalValue}),setDy(t.txtValue,t.params.valueFontSize,t.params.valueY)}),t.level.animate({pki:[t.config.value,t.config.min,t.config.max,t.params.widgetW,t.params.widgetH,t.params.dx,t.params.dy,t.config.gaugeWidthScale,t.config.donut]},t.config.startAnimationTime,t.config.startAnimationType),t.txtValue.animate({"fill-opacity":t.config.hideValue?"0":"1"},t.config.startAnimationTime,t.config.startAnimationType),t.txtLabel.animate({"fill-opacity":"1"},t.config.startAnimationTime,t.config.startAnimationType)},JustGage.prototype.refresh=function(e,t){var n=this,r,i,t=t||null;t!==null&&(n.config.max=t,n.txtMaximum=n.config.max,n.config.humanFriendly&&(n.txtMaximum=humanFriendlyNumber(n.config.max,n.config.humanFriendlyDecimal)),n.txtMax.attr({text:n.txtMaximum}),setDy(n.txtMax,n.params.maxFontSize,n.params.maxY)),r=e,e*1>n.config.max*1&&(e=n.config.max*1),e*1<n.config.min*1&&(e=n.config.min*1),i=getColor(e,(e-n.config.min)/(n.config.max-n.config.min),n.config.levelColors,n.config.noGradient,n.config.customSectors),n.config.textRenderer?r=n.config.textRenderer(r):n.config.humanFriendly?r=humanFriendlyNumber(r,n.config.humanFriendlyDecimal)+n.config.symbol:r=(r*1).toFixed(n.config.decimals)+n.config.symbol,n.originalValue=r,n.config.value=e*1,n.config.counter||(n.txtValue.attr({text:r}),setDy(n.txtValue,n.params.valueFontSize,n.params.valueY)),n.level.animate({pki:[n.config.value,n.config.min,n.config.max,n.params.widgetW,n.params.widgetH,n.params.dx,n.params.dy,n.config.gaugeWidthScale,n.config.donut],fill:i},n.config.refreshAnimationTime,n.config.refreshAnimationType),n,r,i,t=null},JustGage.prototype.generateShadow=function(e,t){var n=this,r,i,s,o,u,a,f;r=document.createElementNS(e,"filter"),r.setAttribute("id","inner-shadow"),t.appendChild(r),i=document.createElementNS(e,"feOffset"),i.setAttribute("dx",0),i.setAttribute("dy",n.config.shadowVerticalOffset),r.appendChild(i),s=document.createElementNS(e,"feGaussianBlur"),s.setAttribute("result","offset-blur"),s.setAttribute("stdDeviation",n.config.shadowSize),r.appendChild(s),o=document.createElementNS(e,"feComposite"),o.setAttribute("operator","out"),o.setAttribute("in","SourceGraphic"),o.setAttribute("in2","offset-blur"),o.setAttribute("result","inverse"),r.appendChild(o),u=document.createElementNS(e,"feFlood"),u.setAttribute("flood-color","black"),u.setAttribute("flood-opacity",n.config.shadowOpacity),u.setAttribute("result","color"),r.appendChild(u),a=document.createElementNS(e,"feComposite"),a.setAttribute("operator","in"),a.setAttribute("in","color"),a.setAttribute("in2","inverse"),a.setAttribute("result","shadow"),r.appendChild(a),f=document.createElementNS(e,"feComposite"),f.setAttribute("operator","over"),f.setAttribute("in","shadow"),f.setAttribute("in2","SourceGraphic"),r.appendChild(f),n.config.hideInnerShadow||(n.canvas.canvas.childNodes[2].setAttribute("filter","url(#inner-shadow)"),n.canvas.canvas.childNodes[3].setAttribute("filter","url(#inner-shadow)")),r,i,s,o,u,a,f=null};var ie=function(){var e,t=3,n=document.createElement("div"),r=n.getElementsByTagName("i");while(n.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",r[0]);return t>4?t:e}();