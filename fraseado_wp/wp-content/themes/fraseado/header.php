<?php 
	if($GLOBALS['AMP'] && is_page()) {
		wp_redirect(get_the_permalink());
		die();
	}
?>
<!doctype html>
<html <?php echo $GLOBALS['AMP'] ? 'amp' : ''; ?> lang="pt-br">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">

		<?php 
			$title = wp_title( '|', false, 'right' );
			if (is_single()) { 
				setup_postdata($post);
				$description = get_the_excerpt();
				$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'large');
				$canonical = get_the_permalink();
				$categories = wp_get_post_categories(get_the_id(), array('orderby' => 'id'));
				$infocat = get_category($categories[0]);
				$title = "$infocat->name: $title";
				$description = "$description $infocat->description";

				wp_reset_postdata();
			} else if(is_category()) { 
				$description = get_category($cat)->description; 
				$canonical = get_term_link(get_category($cat)); 
				$image = wp_get_attachment_image_src(get_term_meta($cat, 'wpfifc_featured_image', true), 'large');
			} else if(is_page()) {
				$description = get_the_excerpt();
				$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'large');
				$canonical = get_the_permalink();
			} else if(is_404() || is_home()) {
				$canonical = home_url('/');
			} else {
				$canonical = get_pagenum_link();
			}

			$description = empty($description) ? get_bloginfo('description') : $description;		
			$image = empty($image) ? get_bloginfo('template_url').'/images/logo-share.png' : $image;
		?>	
		<title><?php echo $title; ?></title>
		<meta name="description" content="<?php echo str_replace('"', "'", $description); ?>">
		<link rel="image_src" href="<?php echo is_array($image) ? $image[0] : $image; ?>">
		<?php if(!empty($canonical)) { ?>
			<link rel="canonical" href="<?php echo preg_replace('/[\?&](#038;)?amp/', '', $canonical); ?>">
			<?php if(!is_page() && !$GLOBALS['AMP']) { ?>
				<link rel="amphtml" href="<?php echo $canonical.(strrpos($canonical, "?") ? '&' : '?'); ?>amp">
			<?php } ?>
		<?php } ?>
		<?php if(!is_home() && !is_search()) { 
			global $paged;
		?>
			<?php if(get_previous_posts_link()) { ?>
				<link rel="prev" href="<?php echo get_pagenum_link($paged - 1); ?>">
			<?php } ?> 
			<?php if(get_next_posts_link()) { ?>
				<link rel="next" href="<?php echo get_pagenum_link($paged + 1); ?>">
			<?php } ?>
		<?php } ?>
				
		<?php if(!$GLOBALS['AMP']) { ?>
			<base href="<?php echo home_url('/'); ?>">	
		<?php } ?>
		
		<link rel="shortcut icon" href="<?php echo get_bloginfo('template_url'); ?>/images/favicon.ico">
		<link rel="dns-prefetch" href="//cdn.ampproject.org">
		<link rel="dns-prefetch" href="//www.google-analytics.com">
		<link rel="dns-prefetch" href="//adservice.google.com">
		<link rel="dns-prefetch" href="//pagead2.googlesyndication.com">
		<link rel="dns-prefetch" href="//tpc.googlesyndication.com">

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width">
		<meta name="p:domain_verify" content="b8b2ea0a33ab565ed7b88aecd81382f7">
		<meta name="msvalidate.01" content="8D41387FFE3302C6A706E8DFFE063290" >	
	    <meta property="fb:pages" content="296924883845956">
	    <meta property="fb:pages" content="299527070076503">

		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>	
		<style <?php echo $GLOBALS['AMP'] ? ' amp-custom' : ''?>><?php include_once('css/style.php'); ?></style>
		<script async src="https://cdn.ampproject.org/v0.js"></script>
		<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
		<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
		<script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>
		<script async custom-element="amp-fx-flying-carpet" src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"></script>
		
		<?php if($GLOBALS['AMP']) { ?>
			<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
		<?php } else { ?>
			<link rel="dns-prefetch" href="//cdn.onesignal.com">
			<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
			<script>
				var OneSignal = window.OneSignal || [];
				OneSignal.push(function() {
					OneSignal.init({
						appId: '60b16392-d195-42ca-9376-9d6cd5766d8f',
						welcomeNotification : {
							title: 'Bem-vindo ao Fraseado!',
							message: 'Obrigado pela inscrição.'
						}
					});

					OneSignal.showNativePrompt();
				});
			</script>
		<?php } ?>
			
		<?php if(!empty($image) && is_array($image)) { ?>
		<script type="application/ld+json">
			{
				"@context": "http://schema.org",
				"@type": "NewsArticle",
				"mainEntityOfPage": "<?php echo get_the_permalink(); ?>",
				"headline": "<?php echo get_the_title(); ?>",
				"datePublished": "<?php echo get_the_time('c'); ?>",
				"dateModified": "<?php echo get_the_time('c'); ?>",
				"description": "<?php echo get_the_excerpt(); ?>",
				"author": {
					"@type": "Person",
					"name": "Fraseado"
				},
				"publisher": {
					"@type": "Organization",
					"name": "Fraseado",
					"logo": {
						"@type": "ImageObject",
						"url": "<?php echo get_bloginfo('template_url'); ?>/images/logo.png",
						"width": 119,
						"height": 23
					}
				},
				"image": {
					"@type": "ImageObject",
					"url": "<?php echo $image[0]; ?>",
					"height": <?php echo $image[2]; ?>,
					"width": <?php echo $image[1]; ?>
				}
			}
	    </script>
	    <?php } ?>
	</head>

	<body <?php body_class(); ?>>
		<div class="main">
			<amp-sticky-ad layout="nodisplay">
				<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '2760362308' : '3414613206'; ?>" data-auto-format="rspv" data-full-width>
					<div overflow></div>
				</amp-ad>
			</amp-sticky-ad>
			
			<header class="header">
				<div class="wrapper-form">
					<div class="logo">
						<a href="<?php echo home_url('/').($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="logo">Frases e mensagens de amor para você compartilhar - Fraseado</a>
					</div>

					<?php get_search_form(true); ?>
				</div>

				<nav class="menu">
					<?php 
						$menu = wp_nav_menu('container_class=&menu_class=wrapper-menu&menu_id=&depth=1&theme_location=primary&echo=0'); 
						echo preg_replace('#href="(.*)\/([a-z0-9-]+)\/"#', 'href="$1/$2/'.($GLOBALS['AMP'] ? '?amp' : '').'" data-vars-event-category="menu-item" data-vars-event-action="$2"', $menu);
					?>
				</nav>
			</header>
