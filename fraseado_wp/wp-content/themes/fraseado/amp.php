<?php if(have_posts()) the_post(); ?>
<!doctype html>
<html amp lang="pt-br">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<?php 
		$title = wp_title( '|', false, 'right' );
		if (is_single()) { 
			$description = get_the_excerpt();
			$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'large');
			$canonical = get_the_permalink();
			$categories = wp_get_post_categories(get_the_id(), array('orderby' => 'id'));
			$infocat = get_category($categories[0]);
			$title = "$infocat->name: $title";
			$description = "$description $infocat->description";
		} else if(is_category()) { 
			$infocat = get_category($cat);
			$description = $infocat->description; 
			$canonical = get_term_link($infocat); 
			$image = wp_get_attachment_image_src(get_term_meta($cat, 'wpfifc_featured_image', true), 'large');
		} 

		$description = empty($description) ? get_bloginfo('description') : $description;		
		$image = empty($image) ? get_bloginfo('template_url').'/images/logo-share.png' : $image;
	?>	
	<title><?php echo $title; ?></title>
	<meta name="description" content="<?php echo str_replace('"', "'", $description); ?>">
	<link rel="image_src" href="<?php echo is_array($image) ? $image[0] : $image; ?>">

	<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">	
	<meta property="fb:pages" content="296924883845956">
	<meta name="p:domain_verify" content="b8b2ea0a33ab565ed7b88aecd81382f7"/>
	<meta name="msvalidate.01" content="8D41387FFE3302C6A706E8DFFE063290" />

	<?php if(!empty($canonical)) { ?>
		<link rel="canonical" href="<?php echo $canonical; ?>">
	<?php } ?>

	<style amp-custom>
		body, div, p, h1, h2, h3, article, header, section, ul, li, ol, figure {
			padding: 0;
			margin: 0;
		}

		ul, li, ol {
			list-style: none;
		}

		a {
			text-decoration: none;
			color: inherit;
		}
		
		article h1 {
			color: #D33569;
			font-size: 16px;
			font-weight: 300;
			text-transform: lowercase;
			text-align: center;
		}

		.share,
		article p,
		article h1 {
			margin-bottom: 10px;
		}
	
		.banner,
		article amp-img {
			margin: 0 10px 10px;
		}

		article h1 a {
			padding: 10px;
		}
	
		article .separator {
			margin-bottom: 0;
		}

		.template-post h1 {
			font-size: 18px;
		}

		article p {
			text-align: center;
			line-height: 1.4;
			color: #888;
			padding: 0 10px;
			font-size: 16px;
		}

		article p a {
			color: #D33569;
		}

		
		.read-more {
			text-align: center;
			margin: 5px 0 10px;
		}

		.read-more .read-image {
			display: inline-block;
			padding: 5px 10px;
			font-size: 13px;
			border-radius: 15px;
			border: 1px solid #D33569;
			background: #D33569;
			color: #fff;
		}

		.separator {
			font-size: 16px;
			margin-bottom: 5px;
			text-transform: lowercase;
			font-weight: normal;
			color: #D33569;
		}

		.separator:before {
			content: '';
			background-color: #f0f0f0;
			display: block;
			height: 1px;
		}

		.separator span,
		.separator a {
			border-top: 1px solid;
			margin-top: -1px;
			display: inline-block;
			line-height: 1.2;
			padding-top: 12px;
			padding-right: 5px;
		}

		.banner {
			text-align: center;
		}
		
		.share {
			position: sticky;
			top: 0;
			float: right;
			margin: 0 10px 0 5px;
			width: 45px;
		}

		.share a {
			background: url(https://fraseado.com.br/wp-content/themes/fraseado/images/icons.png?v1) no-repeat;
			display: inline-block;
			vertical-align: middle;
			height: 45px;
			width: 45px;
			margin-bottom: 1px;
		}

		.share a:last-child {
			margin-bottom: 0;
		}

		.share .icon-fb {
			background-color: #4E71A8;
			background-position: 18px -89px;
		}

		.share .icon-tw {
			background-color: #1CB7EB;
			background-position: 15px -138px;
		}

		.share .icon-wts {
			background-color: #52C539;
			background-position: 13px -187px;
		}

		.share .icon-pin {
			background-color: #cb1f26;
			background-position: 12px -418px;
		}

		.category-info h1 {
			font-size: 16px;
			color: #D33569;
			line-height: 1.2;
			margin-bottom: 5px;
		}

		.category-info p {
			font-size: 14px;
			color: #888;
			line-height: 1.4;
		}
	</style>

	<style amp-custom>
		<?php include_once('css/style.php'); ?>
		.logo {
			padding: 10px;
		}

		.logo a {
			margin: 0 auto;
		}
	</style>

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
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>	
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
	<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
</head>
<body <?php body_class(); ?>>
	<amp-analytics type="googleanalytics" id="analytics1">
		<script type="application/json">
			{
				"vars": {
					"account": "UA-55713936-1"
				},
				"triggers": {
					"trackPageview" : {
						"on": "visible",
						"request": "pageview"
				    },
					"trackEvent": {
						"selector": "a",
						"on": "click",
						"request": "event",
						"vars": {
							"eventCategory": "${category}",
							"eventAction" : "${action}"
						}
					}
				}
			}
		</script>
	</amp-analytics>

	<div class="main">
		<header class="header">
			<div class="logo">
				<a href="<?php echo home_url('/'); ?>" data-vars-c="amp amp-logo" data-vars-a="click">Frases e mensagens de amor para você compartilhar - Fraseado</a>
			</div>
			<nav class="menu">
				<?php $menu = wp_nav_menu('container_class=&menu_class=wrapper-menu&menu_id=&depth=1&theme_location=primary&echo=0'); ?>
				<?php echo preg_replace('#href="(.*)\/([a-z0-9-]+)\/"#', 'href="$1/$2/?amp" data-vars-c="amp amp-menu-item" data-vars-a="$2"', $menu); ?>
			</nav>
		</header>
	
		<?php 
			if(is_single()) {
				// informações da categoria principal 
				$category = get_category(wp_get_post_categories($post->ID, array('orderby' => 'id'))[0]);

				// id da categoria
				$cat = $category->term_id;
			}

			// id da imagem da categoria
			$id = get_term_meta($cat, 'wpfifc_featured_image', true);

			// imagem da categoria
			$imagem = wp_get_attachment_image_src($id, 'thumbnail');

			// informações da categoria
			$term = get_category($cat);	
		?>
		<div class="title">
			<h1>	
				<a href="<?php echo get_category_link($term->term_id); ?>?amp" data-vars-c="amp amp-category-title" data-vars-a="<?php echo $term->slug; ?>">
					<?php echo $term->name; ?>
				</a>
			</h1>
		</div>
		
		<div>
			<?php 	
				// numero da paginação
				$number = is_single() ? 1 : 16;
				$params = array_merge(
					$wp_query->query,
					array(
						'posts_per_page' => 1,				
						'offset' => get_query_var('paged') ? ($number * get_query_var('paged') - $number) : 0,
						'single' => true,
						'infocat' => $infocat
					)
				);

				$p = query_posts($params);
				
				if(!count($p)) {
					unset($params['offset']);
					$p = query_posts($params);
				}
				?>
				
				<?php if(!is_single()) { ?><div class="veja-tambem"><ul><?php } ?>
				<?php
				get_template_part('loop-amp'); 
				wp_reset_query();
				$link = '';

				if($number > 1) {
					// params de busca
					$params = array_merge(
						$params, 
						array(
							'posts_per_page' => $number - 1,					
							'offset' => get_query_var('paged') ? ($number * get_query_var('paged') - $number + 1) : 1,
							'single' => false
						)
					);

					$ps = query_posts($params);
					
					if(!count($ps)) {
						unset($params['offset']);
						$params['posts_per_page'] = get_option('posts_per_page');
						query_posts($params);

						// link que será redirecionado
						$link = get_category_link($cat);						
					}

					$category = get_category_by_slug(array_reverse(explode('/', $params['category_name']))[0]);
					get_template_part('loop-amp'); 
					wp_reset_query();
				}

				if(($number * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts || is_single() && $category->category_count > $number)) {
					// link que será redirecionado
					$link = get_category_link($cat).'page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/';
				}

				// link que será redirecionado
				if(is_single()) {
					$link = get_category_link($infocat->term_id);
				}
			?>
			<?php if(!is_single()) { ?>
					</ul>
				</div>
				<!-- GFP - 5º post (AMP - 336x280) -->
				<div class="banner">
					<div>
						<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="8540525621" data-auto-format="rspv" data-full-width>
							<div overflow></div>
						</amp-ad>
					</div>	
				</div>
			<?php } ?>

		</div>
		<?php if(!empty($link)) { ?>
			<div class="navigation">
				<a href="<?php echo $link; ?>?amp" data-vars-c="amp amp-more-item" data-vars-a="<?php echo trim(str_replace(site_url(), '', $link), '/'); ?>">+ <?php echo $infocat->name; ?>, <b>clique aqui!</b></a>
			</div>
		<?php } ?>

		<footer class="footer">
			<p>2014-<?php echo date('Y') == 2014 ? 2015 : date('Y'); ?> © fraseado.com.br</p>		
		</footer>
	</div>
</body>
</html>