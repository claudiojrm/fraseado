<?php (is_single() || is_category()) && isset($_GET['amp']) && die(get_template_part('amp')); ?>
<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
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
			} else {
				$canonical = home_url('/');
			}

			$description = empty($description) ? get_bloginfo('description') : $description;		
			$image = empty($image) ? get_bloginfo('template_url').'/images/logo-share.png' : $image;
		?>	
		<title><?php echo $title; ?></title>
		<meta name="description" content="<?php echo str_replace('"', "'", $description); ?>">
		<link rel="image_src" href="<?php echo is_array($image) ? $image[0] : $image; ?>">
		<?php if(!empty($canonical)) { ?>
			<link rel="canonical" href="<?php echo $canonical; ?>">
			<?php if(is_single() || is_category()) { ?>
				<link rel="amphtml" href="<?php echo $canonical; ?>?amp">
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
	
		<base href="<?php echo home_url('/'); ?>">	
		<link rel="shortcut icon" href="<?php echo get_bloginfo('template_url'); ?>/images/favicon.ico">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width">
		<meta name="p:domain_verify" content="b8b2ea0a33ab565ed7b88aecd81382f7">
		<meta name="msvalidate.01" content="8D41387FFE3302C6A706E8DFFE063290" >
	
	    <meta property="fb:pages" content="296924883845956">
	    <meta property="fb:pages" content="299527070076503">

		<link rel="stylesheet" href="<?php echo get_bloginfo('template_url'); ?>/css/style.css<?php echo H5BP_cache_buster(); ?>">
				
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
			<header class="header">
				<div class="banner">
					<div class="adsgoogle adstop"></div>
				</div>

				<div class="wrapper-form">
					<div class="logo">
						<a href="<?php echo home_url('/'); ?>" data-event-category="site-logo">Frases e mensagens de amor para você compartilhar - Fraseado</a>
					</div>
					<?php get_search_form(true); ?>
				</div>

				<nav class="menu">
					<?php wp_nav_menu('container_class=&menu_class=wrapper-menu&menu_id=&depth=1&theme_location=primary'); ?>
				</nav>
			</header>
