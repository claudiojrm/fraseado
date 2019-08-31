(function() {
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