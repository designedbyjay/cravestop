//first time a well scoped / namespaced variable is used, will be shifting everything to this approach:
var fatsecret_temp = {
	onStartRequest: null,
	onEndRequest: null,
	onTabChanged: null,
	
	vars: {},
	
	auth: {
		sign: function(url, key){
			var hasSignature = url.lastIndexOf('&fatsecret_signature');
			var sigString = hasSignature == -1 ? url : url.substring(0, hasSignature);
			var pair = key.split('|');
			sigString += '&fatsecret_session_key=' + pair[0];

			var signature = this.generateSignature(pair[1], sigString);
			return sigString + '&fatsecret_signature=' + escape(signature);
		},

        generateSignature: function(secret, sigString) {
            return this.doSign(secret, sigString);
        },
        
        doSign: function(k,d,_p,_z){
			if(!_p){_p='=';}if(!_z){_z=8;}function _f(t,b,c,d){if(t<20){return(b&c)|((~b)&d);}if(t<40){return b^c^d;}if(t<60){return(b&c)|(b&d)|(c&d);}return b^c^d;}function _k(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}function _s(x,y){var l=(x&0xFFFF)+(y&0xFFFF),m=(x>>16)+(y>>16)+(l>>16);return(m<<16)|(l&0xFFFF);}function _r(n,c){return(n<<c)|(n>>>(32-c));}function _c(x,l){x[l>>5]|=0x80<<(24-l%32);x[((l+64>>9)<<4)+15]=l;var w=[80],a=1732584193,b=-271733879,c=-1732584194,d=271733878,e=-1009589776;for(var i=0;i<x.length;i+=16){var o=a,p=b,q=c,r=d,s=e;for(var j=0;j<80;j++){if(j<16){w[j]=x[i+j];}else{w[j]=_r(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);}var t=_s(_s(_r(a,5),_f(j,b,c,d)),_s(_s(e,w[j]),_k(j)));e=d;d=c;c=_r(b,30);b=a;a=t;}a=_s(a,o);b=_s(b,p);c=_s(c,q);d=_s(d,r);e=_s(e,s);}return[a,b,c,d,e];}function _b(s){var b=[],m=(1<<_z)-1;for(var i=0;i<s.length*_z;i+=_z){b[i>>5]|=(s.charCodeAt(i/8)&m)<<(32-_z-i%32);}return b;}function _h(k,d){var b=_b(k);if(b.length>16){b=_c(b,k.length*_z);}var p=[16],o=[16];for(var i=0;i<16;i++){p[i]=b[i]^0x36363636;o[i]=b[i]^0x5C5C5C5C;}var h=_c(p.concat(_b(d)),512+d.length*_z);return _c(o.concat(h),512+160);}function _n(b){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s='';for(var i=0;i<b.length*4;i+=3){var r=(((b[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((b[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((b[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>b.length*32){s+=_p;}else{s+=t.charAt((r>>6*(3-j))&0x3F);}}}return s;}function _x(k,d){return _n(_h(k,d));}return _x(k,d);
        }
	},
	
	/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
		is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	*/
	swfobject: function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}(),
	dom: {
		el: function(id){
			return document.getElementById(id);
		},
		getValue: function(id){
			return this.el(id).value;
		},
		setStyle: function(id, style){
			this.el(id).style = style;
		},
		display: function(id, display){
			this.el(id).style.display = display;
		},
		addClass: function(id, name){
			var cls = this.el(id).className;
			if(!cls)
				this.el(id).className = name;
			else if(cls.indexOf(name) < 0)
				this.el(id).className = cls + " " + name;
		},
		removeClass: function(id, name){
			var cls = this.el(id).className;
			if(cls && (cls.indexOf(name) >= 0))
				this.el(id).className = this.trim(cls.replace(name, ""));
		},
		trim: function( text ) {
			return (text || "").replace( /^\s+|\s+$/g, "" );
		},
		getCookie: function(name){
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = this.trim(cookies[i]);
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						return decodeURIComponent(cookie.substring(name.length + 1));
					}
				}
			}
		},
		setCookie: function(name, value){
			document.cookie = [name, '=', encodeURIComponent(value)].join('');
		},
		onLoad: function(i) {var u =navigator.userAgent;var e=/*@cc_on!@*/false; var st=setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}else if((/mozilla/i.test(u)&&!/(compati)/.test(u)) || (/opera/i.test(u))){document.addEventListener("DOMContentLoaded",i,false); } else if(e){(function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}}
	},
	
	screen: {
		home: 1,
		food_diary: 2,
		exercise_diary: 4,
		diet_calendar: 8,
		weight_tracker: 16,
		food_search_input: 32,
		food_search_results: 64,
		food_get: 128,
		user_info: 256
	},

	navFeatures: {
		all: 31,
		home: 1,
		food_diary: 2,
		exercise_diary: 4,
		diet_calendar: 8,
		weight_tracker: 16
	},
	
	screenUrl: {},
	
	setDefaultCanvasUrl: function(url){
		this.setCanvasUrl('default', url);
	},
	
	setCanvasUrl: function(pg, url){
		this.screenUrl[pg] = url;	
	},
	
	renderTemplate: true,

	//START HTML element substitution support:

	values: [],
	
	//Internal use. Find all html element IDs at the key 'v':
	getRefs: function(v){
		var refs = this.values[v];
		if(refs == null){
			refs = [];
			this.values[v] = refs;
		}
		return refs;
	},
	
	//Can be used to render a placeholder in the document for a particular id.
	holderRefCounter: 0,
	writeHolder: function(v){
		document.write('<span id="fatsecret_output_' + this.holderRefCounter + '"></span>');
		this.addRef(v, 'fatsecret_output_' + this.holderRefCounter++);
	},
	
	//Store a reference to a HTML element id.
	addRef: function(v, elementID){
		var refs = this.getRefs(v);
		refs[refs.length] = elementID;
	},
	
	//Find all HTML elements at the key 'v', insert into their innerHTML 'val'.
	updateRefs: function(v, val){
		var refs = this.values[v];
		if(refs == null) return;
		for(var i = 0; i < refs.length; i++){
			var el = document.getElementById(refs[i]);
			if(el == null)
				continue;
			el.innerHTML = val;
			this.executeScripts(el);
		}
	},
	
	//END HTML element substitution support:

	//DEBUG SUPPORT
	log: function(type, msg){
		if(this.variables.consoleId == undefined)
			return;
		var console = document.getElementById(this.variables.consoleId);
		var div = document.createElement('DIV');
		div.innerHTML = '<b>' + type + ':</b> ' + msg;
		console.insertBefore(div, console.hasChildNodes() ? console.childNodes[0] : null);
	},

	//Here's the magical "Replace" function, keeps getting called to 
	//replace a div, usually the 'canvas' div, but sometimes other divs

	functionToRun: null,

	container: "fatsecret_container",
	
	setContainer: function(container){
		this.container = container;
	},

	replaceCanvas: function(pg, data, showLoading){
		var scr = this.screenUrl[pg] ? this.screenUrl[pg] : this.screenUrl["default"];
		if(scr){
			if(location.href.indexOf(scr) < 0){
				var dataCoded = '';
				for(var x in data)
					dataCoded = dataCoded + '&' + x + '=' + escape(data[x]);

				this.dom.setCookie('fatsecret_delayedReplace', 'fatsecret_container=' + pg + dataCoded);
				window.location.href = scr + '?fatsecret_delay=true';
				return;
			}
		}

		this.vars = {};
		this.replace("fatsecret_container", pg, data, showLoading);

	},
	
	setCanvas: function(pg, data, showLoading){
		if(window.location.href.indexOf('fatsecret_delay') < 0){
			this.replace("fatsecret_container", pg, data, showLoading);
		}
	},

	delayedReplace : function(){
		var data = [];
		var pg = 'home';
		
		var params = this.dom.getCookie('fatsecret_delayedReplace').split('&');
		this.dom.setCookie('fatsecret_delayedReplace', ' ');
		for(var i=0; i<params.length; i++){
			var param = params[i].split('=');
			if(param[0] == 'fatsecret_container')
				pg = param[1];
			else
				data[param[0]] = param[1];
		}

		this.replace("fatsecret_container", pg, data);
	},

	replace: function(section, pg, data, showLoading){	

		if(showLoading == null || showLoading){
			if(this.onStartRequest != null)
				this.onStartRequest();
		}

		var url = this.variables.rootUrl+pg;	
		try{  
			if(section == "fatsecret_container"){
				section = this.container;
				if(fatsecret.variables.autoTemplate)
					this.values = [];
			}
			//fatsecret.functionToRun is now set: 
			this.functionToRun = new fatsecret.responseReplace(section);
			data = this.setData(data);
			
			//Get our hidden div for executing scripts:
			for(var x in data)
				url = url + '&' + x + '=' + escape(data[x]);

			this.executeUrl(url);
		}
		catch(e){			
			alert(e);
		}           
	},
	
	makeAjaxCall: function(pg, data){
		var url = this.variables.rootUrl+pg;
		try{
			data = this.setData(data);

			//Get our hidden div for executing scripts:
			for(var x in data)
				url = url + '&' + x + '=' + escape(data[x]);

			this.executeUrl(url);
		}
		catch(e){			
			alert(e);
		}      
	},

	executeUrl : function(url){
		//Create and insert a new SCRIPT element with the new url as the SRC of our new element
		var scriptEl = document.createElement('SCRIPT'); 
		scriptEl.language = 'JavaScript';
		scriptEl.id = this.variables.splitter + '_script';

		//Sign url
		if(this.dom.getCookie('fatsecret_session_key'))
			scriptEl.src = this.auth.sign(url, this.dom.getCookie('fatsecret_session_key')); 
		else
			scriptEl.src = url;

		this.log('fatsecret.replace', scriptEl.src);
		
		var head = document.getElementsByTagName("HEAD")[0];
		var lastScript = document.getElementById(this.variables.splitter + '_script');
		
		if(lastScript){
			head.removeChild(lastScript);
		}
		
		head.appendChild(scriptEl);
	},

	responseReplace: function(_divid){
		this.divid = _divid;
		this.doReplace =  function(resp, ht){
			var el = document.getElementById(this.divid);
		
			//The response can get split into sections which allows us to re-organise how we lay out the page
			var splits = resp.split(fatsecret.variables.splitter);
			for(var i = 0; i < splits.length; i++){
				var qual = splits[i].indexOf(':');
				if(qual < 0 || (qual > splits[i].indexOf('\n')) || qual > 20){
					//Not a named element. Stick it in the main div.
					if(!el)
						continue;
					if(fatsecret.variables.autoTemplate || this.divid != fatsecret.container)
						el.innerHTML = splits[i];
					fatsecret.executeScripts(el);
				}
				else if(qual > 0){
					if(splits[i].substring(0, qual) == "footer"){
						var footer = document.getElementById('fatsecret_footer');
						if(!footer){
							var f = document.createElement('div');
							el.appendChild(f);
							f.innerHTML = splits[i].substring(qual+1);
							fatsecret.executeScripts(f);
						}
					}
					else{
						fatsecret.updateRefs(splits[i].substring(0, qual), splits[i].substring(qual+1));
					}
				}
			}			
			if(fatsecret.onEndRequest != null)
				fatsecret.onEndRequest();
			if(this.divid == fatsecret.container && (fatsecret.onTabChanged != null))
				fatsecret.onTabChanged(ht);
		}
	},
	
	firstLoad: function(){
		fatsecret.dom.onLoad(function(){
			if(window.location.href.indexOf('fatsecret_delay') > -1)
				fatsecret.delayedReplace();
			else if(fatsecret.variables.autoLoad)
				fatsecret.setCanvas('home');
		});
	},
	
	svrDt: null,

	setData: function(data){
		if(data == null)
			data = {};
		data.key = this.variables.key;
		data.uDate = (new Date()).getTime();
		data.nonce = this.getNonce(10);
		if(navigator.userAgent.indexOf("Opera") != -1 || window.opera)
			data.referral_url = window.location.href;
		data.sep = this.variables.splitter;
		if(data.dt == null && this.svrDt != null)
			data.dt = this.svrDt;
		data.v_an = this.variables.navOptions;
		if(this.variables.autoTemplate)
			data.v_at = this.variables.autoTemplate;
		return data;
	},
	
	executeScripts: function(el){
		var d = el.getElementsByTagName("script");
		var t = d.length;
		for (var x = 0; x < t; x++){
			var newScript = document.createElement('SCRIPT');
			newScript.type = "text/javascript";
			newScript.text = d[x].text;
			el.appendChild (newScript);
		}
	},
	
    getNonce: function(length){
		var nonceChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (length == null)
            length=5;
        var result = "";
        var cLength = nonceChars.length;
        for (var i=0; i<length; i++){
            var rnum = Math.floor(Math.random() * cLength);
            result += nonceChars.substring(rnum,rnum+1);
        }
        return result;
    }
};
fatsecret_temp.variables = fatsecret.variables;
fatsecret = fatsecret_temp;

if(fatsecret.variables.showLoading){
	function fatsecret_setLoading(show){
		fatsecret.dom.el("fatsecret_loading").className = "fatsecret_loading_" + (show ? "" : "in") + "visible";
	}
	fatsecret.onStartRequest = function(){ 
		fatsecret_setLoading(true); 
	}
	fatsecret.onEndRequest = function(){ 
		fatsecret_setLoading(false); 
	}
}

if(fatsecret.variables.navOptions > 0){
	fatsecret.onTabChanged = function(ht){
		var nav = fatsecret.dom.el("fatsecret_nav");
		if(!nav)
			return;
		var lis = nav.getElementsByTagName("td");
		for(var i = 0; i < lis.length; i++){
			fatsecret.dom[lis[i].id == ("fatsecret_nav_" + ht) ? "addClass" : "removeClass"](lis[i].id, "fatsecret_nav_highlight");
		}
	}
}

fatsecret.firstLoad();
