/* ==|=======================================================
   Author: Claudio Jr. Melo da Silva <claudiojrm@gmail.com> e Miriam Dias dos Santos <mds.miriam@gmail.com>
   ========================================================================== */

/* Object.keys */
if (!Object.keys) { Object.keys = (function () { 'use strict'; var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'), dontEnums = [ 'toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor' ], dontEnumsLength = dontEnums.length; return function (obj) { if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) { throw new TypeError('Object.keys called on non-object'); } var result = [], prop, i; for (prop in obj) { if (hasOwnProperty.call(obj, prop)) { result.push(prop); } } if (hasDontEnumBug) { for (i = 0; i < dontEnumsLength; i++) { if (hasOwnProperty.call(obj, dontEnums[i])) { result.push(dontEnums[i]); } } } return result; }; }()); }

Array.prototype.max = function() { return Math.max.apply(null, this); };

/* rand */
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// change hash
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(3(){4(\'d\'p 2){4(2.e){2.8=3(a,b){2.e(\'7\',a,b)};2.9=3(a){2.q(\'7\',a)};g}o 4(2.h){2.8=3(a){2.h(\'d\',a)};2.9=3(a){2.r(\'d\',a)};g}}5 c=[],6=f.l;2.8=3(a,b){4(s a===\'3\')c[b?\'z\':\'n\'](a)};2.9=3(a){j(5 i=c.k-1;i>=0;i--)4(c[i]===a)c.t(i,1)};u(3(){5 a=f.l;4(6!==a){5 b=6;6=a;j(5 i=0;i<c.k;i++){c[i].v(2,{\'w\':\'7\',\'x\':a,\'y\':b})}}},m)})();',36,36,'||window|function|if|var|oldHref|hashchange|addHashChange|removeHashChange||||onhashchange|addEventListener|location|return|attachEvent||for|length|href|100|push|else|in|removeEventListener|detachEvent|typeof|splice|setInterval|call|type|newURL|oldURL|unshift'.split('|'),0,{}));

$( function () {
	Modulo = function() {
		return {
			dados : {},
			lang : 'pt-br',
			getAllDados : function( dados ) {
				var k, j, m, l, i = 0, ext, item, item1,
					objs = { nome : 'pnome', classe : 'pclasse', slug : 'pslug', img : 'pimg' }, 
					submenu = dados.submenu,
					infosubmenu = [],
					conteudo = dados.conteudo,
					infoconteudo = [];

				for( k in conteudo ) {
					for( j in conteudo[k].itens ) {
						item = conteudo[k].itens[j];
						ext = $.extend( {}, item );						
						for( m in objs ) {
							ext[ objs[m] ] = ( m == 'slug' ? k : conteudo[k][m] ) || '';
						}

						ext.id = i++;
						ext.destaque = item.destaque || '';
						ext.banner = item.banner || '';
						ext.chart = item.chart || '';						
						ext.sinopse = item.sinopse || (item.descricao && item.descricao.length ? item.descricao[0].replace(/(<([^>]+)>)/ig, ' ').substr(0, item.titulo.length > 20 ? 110 : 140)+'...' : '');						
						ext.busca = item.titulo+' '+(ext.sinopse || '');

						item.descricoes = '';
						for( l in item.descricao ) {
							item.descricoes += ' '+item.descricao[l];
						}
						
						ext.busca += item.descricoes;

						ext.tpl = item.tpl || 1;
						ext.slug = j;				
						
						infoconteudo.push( ext );
					}
				}

				for( k in dados.submenu ) {
					item = dados.submenu[k];
					item.slug = k;

					for( j in item.itens ) {
						item1 = item.itens[j].item1;				

						for( m in item1 ) {							
							infosubmenu.push( item1[m] );

							for( n in item1[m].item2 ) {
								item1[m].item2[n].categoria = item1[m].nome;								
								infosubmenu.push( item1[m].item2[n] );
							}
						}
					}
					
					infosubmenu.push( item );
				}
				
				dados.conteudo = db( infoconteudo ).apply( function() {
					var self = this;					
					self.catchapeu = '';
					self.cattitulo = self.pnome;
					self.catsubtitulo = '';
					self.catslug = self.pslug;
					self.catimg = self.pimg;
					self.hasimg = self.img || false;
					self.classe = ( self.classe || '' )+' '+( self.pclasse || '' );
					
					db( infosubmenu ).find( { slug : { eq: self.slug.split( '/' )[0] } } ).each( function() {						
						objs = { categoria: 'catchapeu', nome: 'cattitulo', subtitulo: 'catsubtitulo', classe : 'catclasse', slug : 'catslug', img : 'catimg' };
						for( m in objs ) {
							self[ objs[m] ] = this[m] || '';
						}
						
						self['hasimg'] = self.slug == this.slug ? self['catimg'] : false;
						self.classe += !self.classe.match( self.catclasse ) ? ( ' '+self.catclasse ) : '';

						return false;
					} );
					
					return self;
				} );
				
				return dados;
			},			
			init : function() {
				var that = this;

				/* ajax conteudo */
				that.lang = Modulo.getLang.call(this, location.hash);				
				
				$.getJSON( 'json/'+that.lang+'/dados.js?v17', function( dados ) { 
					that.dados = that.getAllDados( dados );
				});

				/* loading done */
				Pace.once( 'done', that.done );

				$('.header').on( 'click', '.lang', that.changeLang ).on( { 'focus' : that.search.focus, 'blur' : that.search.blur }, '[type=text]' ).on( 'submit', 'form', that.search.submit );

				$('.main').addClass(that.lang);
				
				$(window).on( 'resize', function() {
					$('[data-style]').removeAttr( 'style' );

					that.scrolling();
					that.sidebar();
				} );
			},
			scrolling : function() {
				if( $('.tpl-3 .vscroll').length ) {
					var larg = $(window).width()-$('.itens').width()-parseInt( $('article').offset().left )-42,
						h = [];

					$('.tpl-3 .vscroll').width( larg ).find( '.cols' ).css( 'min-height', 'inherit' ).each( function() {
						h.push( $(this).height() );
					} ).css( 'min-height', Math.max.apply(null, h) );
				}
			},
			search : {
				submit : function( e ) {
					e.preventDefault();

					$('a[rel]:first').trigger( 'click', { search : $(this).find( '[type=text]' ).val() } );
				},
				focus : function() {
					if( this.value == this.getAttribute( 'title' ) ) this.value = '';
				},
				blur : function() {
					if( this.value === '' && this.value != this.getAttribute( 'title' ) ) this.value = this.getAttribute( 'title' );
				}
			},
			getLang: function(hash) {
				if(!hash && this.innerHTML) {
					var text = this.innerHTML.toLowerCase();
					
					return (
						text.indexOf('español') != -1 ? 'es' : (
						text.indexOf('português') != -1 ? 'pt-br' : 'en-us'
					));
				} else {
					return location.hash.substring(3).split('/')[0] || 'pt-br';
				}

			},
			changeLang : function( e ) {
				e.preventDefault();

				Modulo.lang = Modulo.getLang.call(this);
				location.hash = '!/'+Modulo.lang+'/';
				location.reload();
			},			
			loaded : {},
			done : function() {
				var that = Modulo;
								
				$('[id*=tpl]').each( function() {
					Tempo.prepare( this.id, { escape: false } ).render( that.dados[ this.id.replace(/tpl-/,'') ] );
				} );
				
				document.title = that.dados.header.nome;
				$('.header [type=text]').val( that.dados.header.search ).attr( 'title', that.dados.header.search );

				that.animate.init();

				$('body').on('click', '.print', function(e) {					
					e.preventDefault();
					window.print();
				})
				.on( 'click', 'a[rel]', function( e, data ) {
					e.preventDefault();
			
					var slf = $(this);

					var overwrite = [
						'glossario', 
						'glossary',
						'glosario',
						'nossos-valores-traduzidos-em-acoes', 
						'our-values-turned-into-actions', 
						'nuestros-valores-traducidos-en-acciones',
						'crencas-razao-de-ser-e-valores', 
						'beliefs-reason-for-being-and-values',
						'creencias-razon-de-ser-y-valores'
					];

					if(overwrite.indexOf(slf.attr('rel')) != -1) {
						slf.attr({'href': 'conteudo.html', 'rel': slf.attr('rel')+'/index'});
					}

					var url = slf.attr( 'href' ),
						hash = slf.attr( 'rel' );

					if(slf.parents('.banner').length || slf.parents('li').hasClass('on') && hash == location.href.split('/').reverse()[0] )
						return;

					if( !slf.hasClass( 'click' ) || ( data && data.search ) ) {
						$('a[rel]').removeClass( 'click' );

						var page = $('[data-load]'),
							cat = hash.split('/')[0],
							loader = function() {
								page.load( url+'?v1', function() {
									$(window).scrollTop(0);
									$('.menu li').removeClass( function() {
										var dado = that.dados.submenu[$(this).children().attr( 'rel' ).replace('/index', '')];										
										$(this).removeClass( 'on' ).children().removeClass( dado && dado.classe ? dado.classe : '' );
									} );

									if( that.dados.submenu[cat] ) {
										$('.menu li').filter( '.h'+that.dados.submenu[cat].classe ).children().addClass( that.dados.submenu[cat].classe ).parent().addClass( 'on' );
									}								
									
									if( $('#tpl-conteudo').length ) {
										var filter = that.dados.conteudo.clone();

										$('.nenhum').remove();

										if( url === 'home.html' ) {
											if( data && data.search ) {
												hash = '?s='+data.search;
												location.hash = '!/'+that.lang+'/'+hash;
												data.search = unescape(data.search);
												
												var regexp = new RegExp( $.trim(data.search), 'gi' );

												filter = { 'itens' : filter.find( { busca : { match : regexp } } ).apply( function() {
													this.newclasse = this.classe;
													this.newdestaque = this.newdestaque || this.destaque;
													this.destaque = '';

													return this;
												} ) };

												$('.grafico, .destaque').hide();

												if( !filter.itens.all().length ) {
													var notfound = {
														'pt-br' : 'Não encontramos nada com o termo ',
														'en-us' : 'We could not find anything that matches ',
														'es'	: 'No se encontró nada que coincida con '
													};

													$('#tpl-conteudo').append( $('<li />').html( '<a>'+ notfound[that.lang] + '"'+data.search+'"</a>' ).addClass( 'nenhum' ) );
												}
											}else{
												filter = { 'itens' : filter.find({ home : { eq : true } }).apply( function() { 													
													if( this.banner ) {
														this.hasimg = true; 
														this.catimg = this.banner; 
													}
													else if( this.destaque > 0 ) 
														this.catimg = this.destaque; 

													return this; 
												} ).apply( function() {
													this.destaque = this.newdestaque || this.destaque;
													this.newclasse = this.destaque ? 'lg first'+(this.classe.match(/lido/) ? ' lido' : '') : this.classe;
													
													return this;
												} ).sort( { 'destaque' : 'desc', 'pos' : 'asc', 'chart' : 'desc', 'id' : 'asc' } ) };
											}
										}else{
											filter = { 'itens' : filter.find( { pslug : { eq : cat } } ) };

											if( url === 'conteudo.html' ) {
												var pg = hash.split('/').splice( 1, hash.length ),
													xpto;
												
												if( !( that.dados.submenu[cat] && that.dados.submenu[cat].itens ) ) {
													pg.push( cat );
													pg.reverse();
													xpto = pg[1];
												}

												pagina = pg.join('/');
												pagina = pagina.charAt( pagina.length-1 ) === '/' ? pagina.substr(0, pagina.length-1) : pagina;
																								
												filter.itens.find( { catslug : { match : pg[0] } } );
												
												var info = filter.itens.clone().find( { slug : { eq : xpto || pagina } } ).all();

												if( info.length ) {	
													var sidebar = Modulo.dados.sidebar,
														reg = new RegExp('('+that.lang+').*'),
														link = location.href.replace(reg, '$1/'+hash);

													sidebar.texto = sidebar.texto.replace(/(.*)(http.*%20%0A)(.*)/, '$1'+location.href+'%20%0A$3');

													info[0].sidebar = sidebar;

													Tempo.prepare( 'tpl-complementar', { escape: false } ).render( info );													
													Tempo.prepare( 'tpl-info', { escape: false } ).render( info );
													
													if( $('[data-table]').length ) {
														$.get('conteudo/'+that.lang+'/'+$('[data-table]').data('table'), function(data) {
															$(data).filter('div').each(function(i){
																$('.tbl').eq(i).empty().append($(this).addClass('f-source'));
															});
														});
													}

													//filter.itens.find( { slug : { not : xpto || pagina } } );
													filter.itens.apply(function(){
														this.classe = this.classe.replace(/ reading/, '')+(this.slug == xpto || this.slug == pagina ? ' reading '+(this.classe.match(/lido$/) ? '' : 'lido') : '');

														return this;
													});

													var 
														// retorna o elemento conforme a navegação
														page = function(obj) {
															return $('.reading')[obj.hasClass('ant') ? 'prev' : 'next']().find('a[rel]:first');
														},
														// altera página
														nav = function() {
															page($(this)).trigger('click', { reading: true } );
														},
														markup = function() {
															var self = $(this);
															setTimeout(function(){
																var titulo = page(self).find('h3').html();
																titulo ? self.attr('title', titulo).html(titulo.substr(0, 35)+(titulo.length > 35 ? '...' : ''))	 : self.remove();
															}, 0);
														};

													// cria markup da páginação
													var ant = $('<a />').addClass('ant').on('click', nav).html(markup),
														prox = $('<a />').addClass('prox').on('click', nav).html(markup);

													$('.paginav').append(ant).append(prox);
												}else{
													filter.itens.limit(0);
												}

											}else if( url === 'categoria.html' ) {
												if( that.dados.submenu[hash].itens ) {
													Tempo.prepare( 'tpl-nav', { escape: false } ).render( that.dados.submenu[hash] );
												}else{
													$('#tpl-nav').remove();
													$('.content').removeClass( 'hasnav' );
												}
											}
										}										
										if( url !== 'home.html' || data && data.search) {
											filter.itens.find({ banner: { eq : '' } } );
										}

										filter.itens = filter.itens.all();

										if( !filter.itens.length && !( data && data.search ) ) {
											if( info && info.length ) {
												$('#tpl-conteudo').remove();
											}else{												
												$('a[rel]:first').trigger( 'click' );
												return;
											}
										}else{
											Tempo.prepare( 'tpl-conteudo', { escape: false } ).render( filter );
										}
									}else{
										$('#tpl-conteudo').remove();
									}
									
									if( !( data && data.search && !data.ready ) ) {
										that.animate.make( false, that.animate.showitens );
									}else{
										that.animate.showitens();
									}

									slf.addClass( 'click' );

									location.hash = '!/'+that.lang+'/'+hash;
								} );
							};

						if(e.isTrigger && !(data && data.reading)) {
							loader();
						}else{
							page.fadeOut( function() {
								page.empty().show();

								that.animate.make( true, function() {
									Pace.restart();
									Pace.once( 'done', loader );
								} );
							});
						}
					}else{
						location.hash = '!/'+that.lang+'/';
						location.reload();
					}			
				} );
				
				that.changeHash();

				addHashChange(function(e){
					var newURL = e.newURL || location.href;

					if(newURL.split('#!/').length < 2)
						location.reload();

					var	url = newURL.split('#!/')[1].split('/');
					
					if(url[0] != that.lang)
						location.reload();
					else if (url.slice(1).join('/') != $('a[rel].click').attr('rel')) 
						that.changeHash();

					// atualiza analytics
					//ga('send', 'event', 'Nova página', 'action', { 'page': location.hash });
				});
			},
			changeHash : function(e) {
				var sbstr = location.hash.replace(/[^/]+\/[^/]+\//, '');
				
				if( sbstr.split('/').length > 1 ) 
					$('.header').append( $('<a/>').attr( { 'href': 'conteudo.html', 'rel' : sbstr } ) );

				var hash = $('a[rel$="'+sbstr+'"]:first'),
					search = location.hash.match( /\?s=(.*)/ );

				if( search ) {
					$('.header [type=text]').val( unescape(search[1]) );
					$('a[rel]:first').trigger( 'click', { search : search[1], ready : true } );					
				}else{
					hash.length ? hash.trigger( 'click' ) : $('a[rel]:first').trigger( 'click' );
				}
			},
			animate : {
				time : 400,
				init : function() {				
					$('body').on( 'click', '[data-filter]', this.filter.init );
				},
				filter : {
					init : function( e ) {
						e.preventDefault();

						var html = $(this).next( 'ul' ).html();
				
						if( html && $.trim( html ) !== '' ) {
							$(this).parent().toggleClass( 'open' );
							Modulo.sidebar();
						}else{
							if( $('.itens li:animated').length ) return;

							var slf = $(this), filter = !slf.hasClass( 'on' ) ? slf.data( 'filter' ) : '';
							
							if( !$('.itens').children( filter ).length ) return;

							$('.itens li').show();
							$('.submenu [data-filter].on').removeClass( function() {
								$(this).removeClass( 'on' ).removeClass( $(this).data( 'filter' ).replace( '.', '' ) );
							} );
							
							if ( filter ) {
								slf.addClass( 'on '+ filter.replace('.', '') );
								$('.itens li').not( filter ).hide();
							}

							Modulo.animate.showitens( filter );
						}
					}
				},
				showitens : function( filter ) {
					if( $('.itens li:animated').length ) return;

					var filter = filter || '';
					
					$('.itens').show().children(filter).each( function(i) {
						var slf = $(this), 
							cln = slf.clone().appendTo( slf.parent() ).addClass( 'clone' ),
							rlt = $(this).parent().hasClass( 'right' ),
							w = $(window).width()+999;

						slf.css( 'visibility', 'hidden' );

						cln.css( { position: 'fixed', left: ( rlt ? w : -w ), top: -( $(window).scrollTop()-slf.offset().top ) + 'px', width: slf.width() } )
							.animate( { left: '-='+ ( ( rlt ? w : -w ) - slf.offset().left ) }, rand( 1000, 1500 ), function() { 
								cln.remove(); 
								slf.css('visibility', 'visible');

								if( !$('.itens li:animated').length ) {
									var vscroll = $('.tpl-3 .vscroll'),
										hscroll = $('.hscroll');

									if( vscroll.length ) {
										Modulo.scrolling();
										vscroll.mCustomScrollbar( 'destroy' );
										vscroll.mCustomScrollbar( { scrollButtons: { enable: true }, horizontalScroll: true, theme: 'dark-thick' } );
									}

									if( hscroll.length )  {
										hscroll.mCustomScrollbar( 'destroy' );
										hscroll.mCustomScrollbar( { theme: 'dark-thick' } );
									}
								}
							} );
					} ).end().filter( '.hscroll:not(.auto-scrolling-on)' ).on( 'mousemove', function( e ) { 						
						if( $(document).height() < $(this).height() || $('.itens li:animated').length ) 
							return;						
						
						var self = $(this),
							pos = e.pageY-self.offset().top;

						if( ( pos < 100 || $('.main').height()-pos < 100 ) )
							self.addClass( 'auto-scrolling-on' ).mCustomScrollbar( 'scrollTo', pos < 100 ? 'top' : 'bottom', { scrollInertia : 4000, scrollEasing: 'easeInOutQuad' } );
						else
							$(this).removeClass( 'auto-scrolling-on' ).mCustomScrollbar( 'stop' );
						
					}).on( 'mouseleave', function() {
						if(!$('.itens li:animated').length )
							$(this).removeClass( 'auto-scrolling-on' ).mCustomScrollbar( 'stop' );
					} );
				}, 
				make : function( hide, fnc ) {
					var that = this,
						objs = hide ? $($('[data-style]').get().reverse()) : $('[data-style]');

					objs.each( function( i ) {				
						var self = $(this), 
							style = JSON.parse( '{' + self.data( 'style' ).replace( /([a-z-]+):([0-9\.\%]+)/g, '"$1":"$2"' ) + '}' ),
							prop = Object.keys( style );
						
						self.removeClass( 'hidden' );

						if( self.hasClass( 'sidebar' ) ) {
							Modulo.sidebar();

							var classe;
							$('.submenu a').each( function( i ) {
								classe = $(this).attr( 'class' )+'-'+i;
								$(this).removeClass().addClass( classe ).attr( 'data-filter', classe.replace( 'h', '.' ) );
							} );
						}

						for( var x = 0, len = prop.length, item, prop1, side; x < len; x++ ) {
							css = ( $(window).width() > 1700 && self.data( 'style-big' ) ) ? self.data( 'style-big' ) : style[prop[x]]
							prop1 = JSON.parse( '{ "'+ prop[x] +'" : "'+css+'" }' ),
							size = ( ( prop[x].match(/left|right/g) ? true : false ) ? -self.innerWidth() : -self.height() ) - 100;
							
							if( !hide ) {
								self.show().css( prop[x], size );
							}else{
								prop1 = JSON.parse( '{ "'+ prop[x] +'" : "'+size+'" }' );
							}

							self.delay( that.time*i ).animate( prop1, that.time, function() {								
								if( fnc && objs.length-1 === i ) fnc();
							} );
						}
					} );
				}
			},
			sidebar : function() {
				$('main, .content').css( 'min-height', 'inherit' );
			
				var w1 = $(window).height(), w2 = $(document).height();
				$('main, .content').css( 'min-height', ( w1 < w2 ? w2 : w1 )-$('header').height() );
			}
		}
	}();

	Modulo.init();
} );