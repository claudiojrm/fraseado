!function(t,e){function n(t){return t&&e.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)?new XDomainRequest:e.XMLHttpRequest?new XMLHttpRequest:void 0}function o(t,e,n){t[e]=t[e]||n}var r=["responseType","withCredentials","timeout","onprogress"];t.ajax=function(t,a){function s(t,e){return function(){c||(a(void 0===f.status?t:f.status,0===f.status?"Error":f.response||f.responseText||e,f),c=!0)}}var u=t.headers||{},i=t.body,d=t.method||(i?"POST":"GET"),c=!1,f=n(t.cors);f.open(d,t.url,!0);var l=f.onload=s(200);f.onreadystatechange=function(){4===f.readyState&&l()},f.onerror=s(null,"Error"),f.ontimeout=s(null,"Timeout"),f.onabort=s(null,"Abort"),i&&(o(u,"X-Requested-With","XMLHttpRequest"),e.FormData&&i instanceof e.FormData||o(u,"Content-Type","application/x-www-form-urlencoded"));for(var p,m=0,v=r.length;v>m;m++)p=r[m],void 0!==t[p]&&(f[p]=t[p]);for(var p in u)f.setRequestHeader(p,u[p]);return f.send(i),f},e.nanoajax=t}({},function(){return this}());

(function() {
	// lazy load
	var lazy = {
		items : [],
		init: function() {
			lazy.items.forEach(function(item, i) {
				if(!item.classList.contains('loaded') && lazy.elementInViewport(item)) {
					(item.classList.contains('adsgoogle') ? banner.init : lazy.loadImage)(item);
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
			var query = [].slice.call(document.querySelectorAll('img.lazy:not(.loaded), .adsgoogle:not(.loaded)'));
			
			lazy.items = query;

			if(trigger && lazy.items.length) {
				lazy.init();
			}
		}
	};

	var events = function() {
		// dispara os eventos do ga
		[].forEach.call(document.querySelectorAll('[data-event-category]'), function(el) {
			el.addEventListener('click', function(e) {
				if(this.getAttribute('data-event-category') && typeof ga != 'undefined') {
					ga('send', 'event', 'site ' + this.getAttribute('data-event-category'), this.getAttribute('data-event-action') || 'click');
				}
			});
		});
	};

	var references = {
		'adsfirstpost' : [
			{'ad-slot' : ['2722821220', '8458617229'], 'name' : ['GFP - 1º banner (300x600)', 'GFP - 3º banner post (resp)'], 'show' : ['w', 'm'], 'ad-size' : ['300x600', 'auto'], 'ad-format' : ['', 'auto']}
		],
		'adspost' : [
			{'ad-slot' : '2412083622', 'name' : 'GFP - 4º banner post (resp)', 'show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'},
			{'ad-slot' : '5365550028', 'name' : 'GFP - 5º banner post (resp)', 'show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'},
			{'ad-slot' : '8319016422', 'name' : 'GFP - 6º banner post (resp)', 'show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'},
			{'ad-slot' : '2272482820', 'name' : 'GFP - 7º banner post (resp)', 'show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'},
			{'ad-slot' : '5225949220', 'name' : 'GFP - 8º banner post (resp)', 'show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'},
			{'ad-slot' : '8179415622', 'name' : 'GFP - 9º banner post (resp)', 'show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'},
			{'ad-slot' : '2132882026', 'name' : 'GFP - 10º banner post (resp)','show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'}
		],
		'adssinglepost' : [
			{'ad-slot' : ['2722821220', '1074951221'], 'name' : ['GFP - 1º banner (300x600)', 'GFP - 1º banner post (resp)'], 'show' : ['w', 'm'], 'ad-size' : ['300x600', 'auto'], 'ad-format' : ['', 'auto']}
		],
		'endpost' : [
			{'ad-slot' : ['7121484820', '5505150824'], 'name' : ['GFP - 1º banner topo (resp)', 'GFP - 2º banner post (resp)'], 'show' : ['w', 'm'], 'ad-size' : ['auto', 'auto'], 'ad-format' : ['auto', 'auto']}
		],
		'adstop' : [
			{'ad-slot' : '3414613206', 'name' : 'GFP - 2º banner topo (resp)', 'show' : 'm|w', 'ad-size' : 'auto', 'ad-format' : 'auto'}
		]
	};

	// função de carregamento de banner
	var banner = {
		init: function(o) {
			// verifica se o banner está visivel
			if(o.offsetParent !== null) {
				// referências de exibição do banner
				var refs;
				var adsloaded;

				// seleciona as referências de exibição do banner
				if(o.classList.contains('adspost')) {
					adsloaded = 'adspost';
				} else if(o.classList.contains('adsfirstpost')) {
					adsloaded = 'adsfirstpost';
				} else if(o.classList.contains('adssinglepost')) {
					adsloaded = 'adssinglepost';
				} else if(o.classList.contains('endpost')) {
					adsloaded = 'endpost';
				} else if(o.classList.contains('adstop')) {
					adsloaded = 'adstop';
				}

				refs = adsloaded;
				adsloaded = document.querySelectorAll('.' + adsloaded + '.loaded').length;
				
				refs = references[refs][adsloaded] || references[refs][adsloaded % references[refs].length];
				
				// seta o atributo conforme a referência
				for(ref in refs) {
					if(typeof refs[ref] == 'object') {
						refs[ref] = (window.innerWidth <= 769 && refs[ref].length > 0 ? refs[ref][1] : refs[ref][0]) || undefined;
					}

					refs[ref] && o.setAttribute('data-' + ref, refs[ref]);
				}

				// configuração para iniciar o banner
				var attrs = o.attributes;

				// breakpoint para exibir o banner
				if(o.getAttribute('data-show')) {
					var breakpoint = o.getAttribute('data-show').split('|').map(function(v) {
						return v == 'm' ? [0, 769] : (v == 'w' ? [769, 9999] : (v.indexOf('-') == -1 ? [0, parseInt(v)] : [v.split('-')[0], v.split('-')[1]]));
					}).forEach(function(br) {
						// verifica se o banner é para exibir no breakpoint
						if(window.innerWidth >= br[0] && window.innerWidth <= br[1] && !o.classList.contains('loaded')) {
							// elemento para iniciar o banner
							var ins = document.createElement('ins');

							// percorre cada atributo de configuração do banner
							[].forEach.call(attrs, function(a, i) {
								// remove os atributos que não são de configuração
								if(a.name.indexOf('-ad-') == -1) {
									return;
								}

								// tamanho do banner
								if(a.name == 'data-ad-size') {
									var size = a.value.split('x');
									
									if(size[0] == 'auto') {
										size[0] = o.offsetWidth;
									}

									// define a largura/altura do banner
									ins.style.width = size[0] + 'px';

									if(size[1]) { 
										ins.style.height = size[1] + 'px';
									}
								} else {
									ins.setAttribute(a.name, a.value);
								}
							});

							// atributos do adsense
							ins.setAttribute('data-ad-client', 'ca-pub-0364553986220758');
							ins.setAttribute('data-ad-region', 'fraseado');
							ins.className = 'adsbygoogle';
							ins.style.display = 'inline-block';

							// adiciona elemento do banner
							o.appendChild(ins);

							// push do banner do adsense
							(adsbygoogle = window.adsbygoogle || []).push({});
							
							// ads loaded
							o.classList.add('loaded');

							return false;
						}
					});
				}
			}
		}
	};

	// atualiza carregamento das imagens
	lazy.update(true);

	// exibe o conteúdo
	var enable = function(type) {
		// adiciona os eventos para o menu
		[].forEach.call(document.querySelectorAll('.menu a'), function(item) { 
			item.setAttribute('data-event-category', 'site-menu-item'); 
			item.setAttribute('data-event-action', item.href.split('/').filter(function(v) { if(v) { return v; }} ).pop()); 
		});

		// adiciona os eventos
		events.call(this);

		window.addEventListener('scroll', lazy.init);
		window.addEventListener('gesturechange', lazy.init);
		window.addEventListener('touchmove', lazy.init);
	};

	// habilita o scroll
	enable.call(this, 'load');

	// analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-55713936-1', 'auto'); ga('send', 'pageview');

	// adsense
	var script = document.createElement('script');
	script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
	script.async = true;
	document.body.appendChild(script);

	// adsense new formats
	(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-0364553986220758", enable_page_level_ads: true });
})();
