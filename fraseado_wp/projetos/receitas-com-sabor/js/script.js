(function() {
	fn = function() {
		return {
			init : function() {
				// $('.icon-menu, .icon-close').on('touchstart', function(e) {
				// 	e.stopPropagation();

				// 	$('body')[$(e.target).hasClass('icon-menu') ? 'addClass' : 'removeClass']('noscroll');
				// });

				this.banner.init();
			},
			banner: {
				init: function() {
					var mobile = $(window).width() <= 751;

					$('.adsgoogle:not(.loaded)').each(function() {
						var attrs = this.attributes,
							ins = document.createElement('ins'),
							show = this.getAttribute('data-show');

						this.className += ' loaded';

						if(show && show.match(/m/) && mobile || show && show.match(/w/) && !mobile) {
							for(var x = 0; x < attrs.length; x++) {
								if(!attrs[x].name.match(/-ad-/)) 
									continue;

								if(attrs[x].name == 'data-ad-size') {
									var size = attrs[x].value.split('x');
									
									ins.style.width = size[0]+'px';
									ins.style.height = size[1]+'px';
								} else {
									ins.setAttribute(attrs[x].name, attrs[x].value);
								}
							}
							
							ins.setAttribute('data-ad-client', 'ca-pub-0364553986220758');
							ins.className = 'adsbygoogle';
							ins.style.display = 'inline-block';

							$(this).append(ins);

							(adsbygoogle = window.adsbygoogle || []).push({});
						} else {
							$(this).remove();
						}
					});
				}
			}
		}
	}();
	
	$(function() {
		fn.init();
	});
})();