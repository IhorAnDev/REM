!function(s,l){s.LiqPayCheckout=new function(){var n,a,i=s.encodeURIComponent,o={},p=(new Date).getTime().toString();this.init=function(t){var a,e=(t.host||"https://www.liqpay.ua/")+(t.language||"ru")+"/checkoutjs";for(a in e+="?hostname="+i(location.hostname),e+="&port="+i(location.port),e+="&protocol="+i(location.protocol),e+="&uid="+p,t)e+="&"+i(a)+"="+i(t[a]);(n=l.createElement("iframe")).setAttribute("frameborder","0"),n.setAttribute("allowtransparency","true"),n.setAttribute("allowpaymentrequest","true"),n.setAttribute("allow","payment"),n.setAttribute("scrolling","no"),n.setAttribute("style","width:100%;height:0px;background-color:transparent;"),n.setAttribute("src",e);try{"popup"==t.mode?this.popup(n):l.querySelector(t.embedTo||"body").appendChild(n)}catch(t){console.error(t)}return this},this.popup=function(t){(a=l.createElement("div")).innerHTML='<div id="liqpay_widget_popup_container" style="position: fixed !important;top: 0 !important;right: 0 !important;bottom: 0 !important;left: 0 !important;z-index: 3000 !important"><div id="liqpay_widget_popup_background" style="width: 100% !important;height: 100% !important;background: #000 !important;opacity: .4 !important"></div><div id="liqpay_widget_popup_iframe" style="-webkit-overflow-scrolling: touch !important; max-height: 100% !important; overflow: auto !important; position: absolute !important;\ttop: 50% !important;left: 50% !important;width: 385px !important;border-radius: 6px !important;\ttransform: translate(-50%, -50%) !important;-moz-transform: translate(-50%, -50%) !important;-ms-transform: translate(-50%, -50%) !important;-webkit-transform: translate(-50%, -50%) !important;-o-transform: translate(-50%, -50%) !important"></div></div>',l.querySelector("body").appendChild(a),l.querySelector("#liqpay_widget_popup_iframe").appendChild(t)},this.on=function(t,a){if("function"==typeof a)return t in o||(o[t]=[]),o[t].push(a),this},this.off=function(t,a){if(t in o){for(var e=[],n=0;n<o[t].length;n++)o[t][n]!=a&&e.push(o[t][n]);return o[t]=e,this}},this.call=function(t,a){if(t in o){for(var e=0;e<o[t].length;e++)o[t][e](a);return this}};function e(t,a){a={cmd:t,params:a,uid:p},a=JSON.stringify(a),n.contentWindow.postMessage(a,"*")}var t=function(t){if("object"!=typeof t.data)try{var a=JSON.parse(t.data);if(!a)return;if(a.uid!=p)return;var e=a.cmd||a.params.cmd;this.call(e,a.params),this.call("_",a.params)}catch(t){}}.bind(this);s.addEventListener?s.addEventListener("message",t,!1):s.attachEvent("onmessage",t),this.on("window.resize",function(t){n.style.height=t.height+"px"}),this.on("liqpay.close",function(){n.parentNode.removeChild(n),a&&a.parentNode.removeChild(a)});var r=void 0;this.on("applepay.canUse",function(t){s.ApplePaySession&&t.applepay_merchant_id&&s===s.parent?ApplePaySession.canMakePaymentsWithActiveCard(t.applepay_merchant_id).then(function(t){e("applepay.canUse",t?{canUse:!0}:{canUse:!1})}):e("applepay.canUse",{canUse:!1})}),this.on("applepay.begin",function(t){(r=new s.ApplePaySession(1,t.apple_data)).onvalidatemerchant=function(t){e("applepay.onvalidatemerchant",{validationURL:t.validationURL,domain:l.location.hostname})},r.onpaymentauthorized=function(t){e("applepay.onpaymentauthorized",{paymentData:t.payment.token.paymentData})}.bind(this),r.oncancel=function(t){e("applepay.oncancel",{})}.bind(this),r.begin()}),this.on("applepay.completeMerchantValidation",function(t){r.completeMerchantValidation(t.merchantSession)}),this.on("applepay.completePayment",function(t){r.completePayment(t.status)}),this.on("applepay.abort",function(){r.abort()})},s.LiqPayCheckoutCallback&&s.LiqPayCheckoutCallback()}(window,document);