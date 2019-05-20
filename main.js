
document.body.innerHTML = '<div class="wrapper"><div class="search-input-wrapper"><input type="search" name="video" value="" placeholder="Search..." autofocus></div><div class="wrap"><div id="gallery" class="gallery gallery1"><div class="slider"><div class="stage"></div><div class="control"><ul class="dots-ctrl"></ul></div></div></div></div>';
let wrapperBlocks = document.querySelector('.wrapper'); 
document.querySelector('.search-input-wrapper input').addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        let valueSearchInput = this.value;
        let stage = document.querySelector('.stage');
        stage.innerHTML = "";
        getSearchItems(valueSearchInput);
    }
});
function createViewVideoBlock(result,titleResult,imgPreView, descriptionVideo, channelTitle, publishedAt){
    let stage = document.querySelector('.stage');
    let videoBlock = document.createElement('div');
    stage.appendChild(videoBlock);
    videoBlock.setAttribute('class', 'videoBlock');
    videoBlock.innerHTML = `<h1><a href="https://www.youtube.com/watch?v=${result}" target="_blank">${titleResult}</a></h1><img src=" ${imgPreView} " ></img><p class = "channetTittle"> ${channelTitle}</p><p class="publishedAt"> ${publishedAt}</p><p class="descriptionVideo"> ${descriptionVideo}</p>`;
}			
function getSearchItems(value){
    let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDja5r2yeIX0HsiZdeqqphiylCzxGGpxho&type=video&part=snippet&maxResults=15&q= ${value}`;
    let fetched = fetch(url);
    fetched.then((resp, rej) => {
          return resp.json();
    }) .then ((resp) =>{  
        let result, titleResult, imgPreView, descriptionVideo, channelTitle, publishedAt, viewCount ;
        resultArray = [];
        resp.items.forEach(function(value) {
            result = value.id.videoId;
            resultArray.push(value.id.videoId);
            titleResult = value.snippet.title;
            imgPreView = value.snippet.thumbnails.default.url;
            descriptionVideo = value.snippet.description;
            channelTitle = value.snippet.channelTitle;
            publishedAt = value.snippet.publishedAt; 
            publishedAt = publishedAt.substring(0, 10);
            createViewVideoBlock(result,titleResult,imgPreView, descriptionVideo, channelTitle, publishedAt);
}); 


                 let stage = document.querySelector('.stage');
                 let videoBlock = document.createElement('div');
                 stage.appendChild(videoBlock);
                 videoBlock.setAttribute('class', 'videoBlock'); 
       
	var Gallery = function(id, setup) {
		this.defaults = {
			margin:			10,		
			visibleItems: 	1,		
			border:			0,		
			responsive:		false,	
			autoScroll:		false,	
			interval: 		3000,	
			nav:			true,	
			dots:			false,	
			keyControl: 	false,	
			animated:		false,	
			baseTransition:	0.1,	
			delayTimer:		250,
			limit:			30		
		};

		this.id = id;
		this.setup = setup;
		this.gallery = document.getElementById(this.id);
		this.slider = this.gallery.querySelector('.slider');
		this.stage = this.gallery.querySelector('.stage');
		this.items = this.gallery.querySelectorAll('.stage > div');
		this.count = this.items.length;
		this.current = 0;		
		this.next = 0;		
		this.pressed = false;	
		this.start = 0;			
		this.shift = 0;			
		this.init();
	};
	window.Gallery = Gallery;
	var fn = Gallery.prototype;
	fn.resize = function() {
		clearTimeout(this.resizeTimer);
		this.resizeTimer = setTimeout(function() {
			this.init();
			this.current = (this.current <= this.max) ? this.current : this.max;
			var x = this.coordinates[this.current];
			this.scroll.apply(this, [x, this.options.baseTransition]);
		}.bind(this), this.options.delayTimer);
		return;
	};

	fn.init = function() {
		this.options = extend({}, this.defaults, this.setup);
		this.setSizeCarousel();
		this.setCoordinates();
		this.initControl();
		if (!this.events) {
			this.registerEvents();
		}
	};
	fn.setSizeCarousel = function() {
		this.widthSlider = this.slider.offsetWidth;
		if (this.options.responsive) {
			this.setAdaptiveOptions();
		}
		this.max = this.count - this.options.visibleItems;
		var width = (this.widthSlider - this.options.margin * (this.options.visibleItems - 1)) / this.options.visibleItems;
		this.width = width + this.options.margin;
		this.widths = this.width * this.count;
		this.stage.style.width = this.widths + 'px';
		[].forEach.call(this.items, function(el) {
			el.style.cssText = 'width:' + width + 'px; margin-right:' + this.options.margin + 'px;';
		}.bind(this));
		this.gallery.style.visibility = 'visible';
	};

	fn.setAdaptiveOptions = function() {
		var points	= [], 
			point, 
			width	= document.documentElement.clientWidth;
		for (var key in this.options.adaptive) {
			points.push(key);
		}
		for (var i = 0, j = points.length; i < j; i++) {
			var a = points[i],
				b = (points[i + 1] !== undefined) ? points[i + 1] : points[i];

			if (width <= points[0]) {
				point = points[0];
			} else if (width >= a && width < b) {
				point = a;
			} else if (width >= points[points.length - 1]) {
				point = points[points.length - 1];
			}
		}
		var setting = this.options.adaptive[point];
		for (var key in setting) {
			this.options[key] = setting[key];
		}
		return;
	};
	fn.setCoordinates = function() {
		var point = 0;
		this.coordinates = [];
		while(this.coordinates.length < this.count) {
			this.coordinates.push(point);
			point -= this.width;
		}
		return;
	};

	
	fn.initControl = function() {
		this.navCtrl = this.gallery.querySelector('.nav-ctrl');
		this.dotsCtrl = this.gallery.querySelector('.dots-ctrl');

		if (this.options.dots === true) {
			this.creatDotsCtrl();
			this.dotsCtrl.style.display = 'inline-block';
		} else {
			this.dotsCtrl.removeAttribute('style');
		}
	}; 

	fn.creatDotsCtrl = function() {
		this.spots = [];
		this.dotsCtrl.innerHTML = '';

		var i = 0,
			point = 0,
			li = document.createElement('li'),
			span = document.createElement('span'),
			clone;

		li.appendChild(span);
		while (i < this.count) {
			clone = li.cloneNode(true);
			this.dotsCtrl.appendChild(clone);
			this.spots.push(clone);
			i += this.options.visibleItems;
			point = (i <= this.max) ? point - this.width * this.options.visibleItems : -this.width * this.max;
		}
		this.setDotsStyle();
	};

	fn.setDotsStyle = function() {
		this.spots.forEach(function(item, i, spots) {
			item.classList.remove('active');
		});
		var index = (this.next < this.max) ? Math.trunc(this.next / this.options.visibleItems) : this.spots.length - 1;
		this.spots[index].classList.add('active');
		return;
	};

	fn.registerEvents = function() {
		window.addEventListener('resize', this.resize.bind(this));
		if (this.options.autoScroll) {
			setInterval(this.autoScroll.bind(this), this.options.interval);
		}
		this.dotsCtrl.addEventListener('click', this.dotsControl.bind(this));
		if (this.options.keyControl) {
			window.addEventListener('keydown', this.keyControl.bind(this));
		}
		this.gallery.querySelector('.slider').addEventListener('wheel', this.wheelControl.bind(this));
		this.stage.addEventListener('mousedown', this.tap.bind(this));
		this.stage.addEventListener('mousemove', this.drag.bind(this));
		this.stage.addEventListener('mouseup', this.release.bind(this));
		this.stage.addEventListener('mouseout', this.release.bind(this));
		this.stage.addEventListener('touchstart', this.tap.bind(this));
		this.stage.addEventListener('touchmove', this.drag.bind(this));
		this.stage.addEventListener('touchend', this.release.bind(this));
		this.events = true;
	};

	fn.autoScroll = function(e) {
		var x = this.getNextCoordinates.call(this, 1);
		this.scroll.apply(this, [x, this.options.baseTransition]);
		return;
	};

	fn.dotsControl = function(e) {
		if (e.target.tagName != 'SPAN' || e.target.parentNode.classList.contains('active')) return;
		var index = this.spots.indexOf(e.target.parentNode);
		if (index == -1) return false;
		this.next = index * this.options.visibleItems;
		this.next = (this.next <= this.max) ? this.next : this.max;
		var x = this.coordinates[this.next];
		var delta = Math.abs(this.current - this.next),
			transition	= this.options.baseTransition + delta * 0.07;
		this.scroll(x, transition);
	};

	fn.keyControl = function(e) {
		var left = 37,	
			right = 39;	
		if (e.which !== right && e.which !== left) return;
		var direction = (e.which === right) ? 1 : -1,
			x = this.getNextCoordinates(direction);
		this.scroll(x, this.options.baseTransition);
	};

	fn.wheelControl = function(e) {
		e.preventDefault();
		var direction = (e.deltaY > 0) ? 1 : -1;
		var x = this.getNextCoordinates(direction);
		this.scroll(x, this.options.baseTransition);
	};

	fn.tap = function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (event.which && event.which != 1) return;
		this.start = xpos(e);
		this.pressed = true;
		return;
	};

	fn.drag = function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.pressed === false) return;
		this.shift = this.start - xpos(e);
		if (Math.abs(this.shift) < 3) return;
		var	remaining = this.widths - this.width * this.options.visibleItems,
			delta = this.coordinates[this.current] - this.shift;
		if (delta > this.options.limit || Math.abs(delta) - remaining > this.options.limit) return;
		this.scroll(delta, 0);
	};

	fn.release = function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.pressed === false) return;
		var direction = (Math.abs(this.shift) > this.width / 2) ? Math.round(this.shift / this.width) : '';
		var	x = this.getNextCoordinates(direction);
		this.scroll(x, this.options.baseTransition);
		this.pressed = false;
	};

	fn.getNextCoordinates = function(direction) {
		if (typeof(direction) !== 'number') return this.coordinates[this.current];
		if (this.options.autoScroll && this.current >= this.count - this.options.visibleItems) {
			this.next = 0;
		} else {
			if (this.current == 0 && direction == -1 || 
				(this.current >= this.max) && direction == 1) {
				return;
			}
			this.next += direction;
		}
		// возвращаем координату след. элемента - координату, до которой
		// необходимо продвинуть галерею
		return this.coordinates[this.next];
	};

	fn.scroll = function(x, transition) {
		if (typeof(x) !== 'number') return;
		this.stage.style.cssText =	'width:' + this.widths + 'px; ' +
									'height:' + this.items[0].offsetHeight + 'px; ' +
									'transform:translateX(' + x + 'px); ' +
									'transition:' + transition + 's';
		this.current = (this.next < this.max) ? this.next : this.max;
		if (this.options.dots) this.setDotsStyle();
		return;
	};
	function extend(out) {
		out = out || {};
		for (var i = 1; i < arguments.length; i++) {
			if (!arguments[i])
				continue;
			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key))
					out[key] = arguments[i][key];
			}
		}
		return out;
	};

	function xpos(e) {
		if (e.targetTouches && (e.targetTouches.length >= 1)) {
			return e.targetTouches[0].clientX;
		}
		return e.clientX;
	};

var gallery1 = new Gallery('gallery', {
				dots: true,
				keyControl: true,
				responsive: true,
				adaptive: {
					320: {
						visibleItems: 1,
						margin: 5,
						dots: false
					},
					560: {
						visibleItems: 2,
						margin: 5,
						dots: false
					},
					768: {
						visibleItems: 3,
					},
					1024: {
						visibleItems: 4
					}
				}
			});
return resultArray;
    }).then ((resultArray) =>{
    	for (let i = 0; i<resultArray.length; i++) {
    			let url = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDja5r2yeIX0HsiZdeqqphiylCzxGGpxho&id=${resultArray[i]}&part=snippet,statistics`;
    			let fetched = fetch(url);
    			fetched.then((response, reject) => {
          			return response.json();
    			}) .then ((response) =>{
    				    let videoBlocks = document.querySelectorAll('.videoBlock');
    					let viewCountP = document.createElement('p');
    					let lastElementChild = videoBlocks[i].lastElementChild;
    				    videoBlocks[i].insertBefore(viewCountP, lastElementChild);
       				    viewCount = response.items[0].statistics.viewCount;
       				    viewCountP.innerHTML = `<img class="icon" src="img/assets/icon-viewCount.png" alt ="viewCount"> ${viewCount}`; 
    				
    				
       			})
			}

		



    })
}






