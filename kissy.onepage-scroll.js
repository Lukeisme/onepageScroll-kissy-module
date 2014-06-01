KISSY.add(function(S, Node){
	var defaults = {
		onepageSection : 'section'
	};

	function OnepageScroll(container, option){
		this.container = container;
		this.setting = S.merge(defaults, option);
		this.posTop = 0;
		this.curIndex = 0;
		this.len = S.all(this.container+" "+this.setting.onepageSection).length;
	}

	OnepageScroll.prototype.init = function() {
		S.one(this.container).addClass("onepageWrapper");
		S.all(this.container+" "+this.setting.onepageSection).addClass("singleSection");

		var self = this;
		S.one(document).on("mousewheel", function(event){
			event.preventDefault();
			if (event.deltaY < 0) {
				self.moveDown();
			}else if (event.deltaY > 0) {
				self.moveUp();
			};
		});
	};

	OnepageScroll.prototype.moveDown = function(){
		var el = S.one(this.container);
		// S.Anim(el, {
		// 	'transform' : 'translate3d(0,-100%,0)'
		// },
		// 1,
		// 'easeBoth');
		if (this.curIndex + 1 < this.len) {
			this.curIndex += 1;
			el.css({transform:'translate3d(0,'+ this.curIndex*(-100) +'%,0)'});
		}else{
			return;
		}
	};

	OnepageScroll.prototype.moveUp = function(){
		var el = S.one(this.container);
		
		if (this.curIndex - 1 >= 0) {
			this.curIndex -= 1;
			el.css({transform:'translate3d(0,'+ this.curIndex*(-100) +'%,0)'});
		}else{
			return;
		}
	};

	return OnepageScroll;
}, {requires : ["node"]});