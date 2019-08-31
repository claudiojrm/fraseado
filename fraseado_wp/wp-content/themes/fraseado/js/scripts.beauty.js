(function() {
	// lazy load
	var lazy = {
		items : [],
		init: function() {
			lazy.items.forEach(function(item, i) {
				if(!item.classList.contains('loaded') && lazy.elementInViewport(item)) {
					lazy.loadImage(item);
				};
			});
		},
		loadImage: function(el) {
			var src = el.getAttribute('data-' + (window.innerWidth < 769 ? 'mobile' : 'original')) ? el.getAttribute('data-' + (window.innerWidth < 769 ? 'mobile' : 'original')) : el.getAttribute('data-preload');

			// flag que indica que a imagem foi carregada
			el.classList.add('loaded');

			if(src) {
				var img = new Image();
				img.src = src;

				img.onload = function() {
					el.src = src;
				};
			}
		},
		elementInViewport: function(el) {
			var rect = el.getBoundingClientRect();
			var ratio = el.classList.contains('lazy') ? 1 : 5;
			return (				
				rect.top >= window.innerHeight * -ratio && rect.top <= window.innerHeight * ratio
			);
		},
		update: function(trigger) {
			var query = [].slice.call(document.querySelectorAll('img.lazy:not(.loaded)'));
			
			lazy.items = query;

			if(trigger && lazy.items.length) {
				lazy.init();
			}
		}
	};

	// atualiza carregamento das imagens
	lazy.update(true);

	window.addEventListener('scroll', lazy.init);
	window.addEventListener('gesturechange', lazy.init);
	window.addEventListener('touchmove', lazy.init);

	// wts
	if(window.innerWidth > 768) {
		var wts = document.querySelector('.icon-wts');

		if(wts) {
			wts.href = wts.href.replace('whatsapp://', 'https://web.whatsapp.com/');
			wts.target = '_blank';
		}
	}

	// readspeaker
	if('speechSynthesis' in window) {
		var readspeaker = document.querySelector('.icon-readspeaker');

		if(readspeaker) {
			readspeaker.style.display = 'block';
		
			readspeaker.addEventListener('click', function(e) {
				e.preventDefault();

				var stop = function() {
					readspeaker.classList.remove('playing');
				};

				if(this.classList.contains('playing')) {
					return speechSynthesis.cancel();
				} else {
					readspeaker.classList.add('playing');
				}
				
				var speech = new SpeechSynthesisUtterance();
				speech.text = document.querySelector('.post-article .entry-content').innerText;
				speech.lang = 'pt-BR';
		
				speech.onerror = stop;
				speech.onend = stop;
				speechSynthesis.speak(speech);
			});
		}
	}
})();