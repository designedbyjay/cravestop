
var fatsecret = {
	variables: {

		rootUrl: 'http://platform.fatsecret.com/js/Default.aspx?pg=',

		splitter: 'fs_a3315bb6fc9b4771b89f77e6059d0cf1',
		key: '05db11a0bba740389461cfbd45571f97',
		appTitle: 'My Diet',
		navOptions: 31,

		autoLoad: true,
		autoTemplate: true
	},

	setCookie: function(name, value){
		var date = new Date();
		date.setTime(date.getTime()+(10*365*24*60*60*1000));
		document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString() + ';path=/';
	},

	doWrite: function(url, isCss){
		var h = isCss ? '<link type="text/css" rel="stylesheet"' : '<script type="text/javascript"';
		h += (isCss ? ' href' : ' src') + '="' + url;
		h += isCss ? '"/>' : '"></script>';
		document.write(h);
	},

	start: function(){
		this.doWrite('/css/all.css', true);
			this.doWrite('/css/blue.css', true);
		this.doWrite('/js/final.js');





	}
};
fatsecret.start();


	document.write('<div class="fatsecret_container" id="fatsecret_container"></div>');
