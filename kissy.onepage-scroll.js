KISSY.add(function(S, Node){
	var defaults = {
		onepageSection : 'section',//section's tag name
		pageNav : true,//use page  navigation or not
		minTime:500 //min time between two scroll
	};

	function OnepageScroll(container, option){
		this.container = container;
		this.setting = S.merge(defaults, option);
		// this.posTop = 230;//page-nav margin top
		this.curIndex = 0;
		this.len = S.all(this.container+" "+this.setting.onepageSection).length;
	}

	OnepageScroll.prototype.init = function() {
		S.one(this.container).addClass("onepageWrapper");
		S.all(this.container+" "+this.setting.onepageSection).addClass("singleSection");

		if (this.setting.pageNav) this.initPageNav();

		var down = S.throttle(OnepageScroll.prototype.moveDown, this.setting.minTime, this);
			up = S.throttle(OnepageScroll.prototype.moveUp, this.setting.minTime, this);
		S.one(document).on("mousewheel swip", function(event){
			event.halt();
			if (event.deltaY < 0) {
				down();
			}else if (event.deltaY > 0) {
				up();
			};
		});
	};

	OnepageScroll.prototype.initPageNav = function() {
		var listStr = "<ul class = 'page-nav'>";
		for (var i = 0 , len = this.len ; i < len; i++) {
			listStr += "<li class = 'nav-item'><a><span class = 'dot'></span></a></li>"
		};
		listStr += "</ul>";
		console.log(listStr);
		var nav = S.Node(listStr);
		// nav.css('margin-top', this.posTop);
		S.one("body").prepend(nav);
		S.Node(S.all(".dot")[this.curIndex]).addClass("active");
	};

	OnepageScroll.prototype.moveDown = function(){
		var el = S.one(this.container);
		// S.Anim(el, {
		// 	'transform' : 'translate3d(0,-100%,0)'
		// },
		// 1,
		// 'easeBoth');
		if (this.curIndex + 1 < this.len) {
			S.Node(S.all(".dot")[this.curIndex]).removeClass("active");
			this.curIndex += 1;
			el.css("transform", 'translate3d(0,'+ this.curIndex*(-100) +'%,0)');
			S.Node(S.all(".dot")[this.curIndex]).addClass("active");
		}else{
			return;
		}
	};

	OnepageScroll.prototype.moveUp = function(){
		var el = S.one(this.container);
		
		if (this.curIndex - 1 >= 0) {
			S.Node(S.all(".dot")[this.curIndex]).removeClass("active");
			this.curIndex -= 1;
			el.css("transform", 'translate3d(0,'+ this.curIndex*(-100) +'%,0)');
			S.Node(S.all(".dot")[this.curIndex]).addClass("active");
		}else{
			return;
		}
	};

	return OnepageScroll;
}, {requires : ["node"]});