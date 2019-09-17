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
		<title><?php echo wp_title( '|', false, 'right' ); ?></title>
		<?php wp_head(); ?>

		<?php if(!$GLOBALS['AMP'] && (!is_page() && !is_search())) { ?>
		<link rel="amphtml" href="<?php echo home_url(add_query_arg(array(), $wp->request)); ?>/?amp">
		<?php } ?>
		
		<link rel="shortcut icon" href="<?php echo get_bloginfo('template_url'); ?>/images/favicon.ico">
		
		<meta name="theme-color" content="#c7202f">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width">
		<meta name="p:domain_verify" content="b8b2ea0a33ab565ed7b88aecd81382f7">
		<meta name="msvalidate.01" content="8D41387FFE3302C6A706E8DFFE063290">	
	    <meta property="fb:pages" content="296924883845956">
	    <meta property="fb:pages" content="299527070076503">

		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>	
		<?php if($GLOBALS['AMP']) { ?>
			<style amp-custom><?php include_once('css/style.php'); ?></style>
		<?php } else { ?>
			<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/style<?php echo $_SERVER['HTTP_HOST'] == 'localhost' || isset($_GET['debug']) ? '.beauty' : ''; ?>.css<?php echo H5BP_cache_buster(); ?>">
		<?php } ?>
		<script async src="https://cdn.ampproject.org/v0.js"></script>
		<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>		
		<?php if($GLOBALS['STORIES']) { ?>
		<script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
		<?php } else { ?>
		<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
		<script async custom-element="amp-fx-flying-carpet" src="https://cdn.ampproject.org/v0/amp-fx-flying-carpet-0.1.js"></script>
		<?php } ?>
		<?php if(is_home()) { ?>
		<script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>
		<?php } ?>

		<?php if($GLOBALS['AMP']) { ?>
			<script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
		<?php } else { ?>
			<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
		<?php } ?>			
	</head>

	<body <?php body_class(); ?>>
		<?php if(!$GLOBALS['STORIES']) { ?>
		<div class="main">
			<header class="header">
				<div class="wrapper-form">
					<div class="logo">
						<a href="<?php echo home_url('/').($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="logo">Fraseado</a>
					</div>

					<?php get_search_form(true); ?>
				</div>

				<nav class="menu">
					<?php 
						$menu = wp_nav_menu('container_class=m&menu_class=wrapper-menu&menu_id=m&depth=1&theme_location=primary&echo=0'); 
						echo preg_replace('#href="(.*)\/([a-z0-9-]+)\/"#', 'href="$1/$2/'.($GLOBALS['AMP'] ? '?amp' : '').'" data-vars-a="$2"', $menu);
					?>
				</nav>
			</header>
	<?php } ?>