<?php 
	// id da imagem da categoria
	$id = get_term_meta($cat, 'wpfifc_featured_image', true);

	// imagem da categoria
	$imagem = wp_get_attachment_image_src($id, 'thumbnail');

	// informações da categoria
	$term = get_category($cat);	
?>
<div class="wrapper-info">
	<div class="category-info wrapper">
		<a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="category-info" data-vars-event-action="<?php echo $term->slug; ?>">
			<?php if(!empty($imagem)) { ?>
				<div class="placeholder category-info-img">					
					<?php 
						if($GLOBALS['AMP']) {
					?>
						<amp-img src="<?php echo $imagem[0]; ?>" width="80" height="60" layout="responsive" alt="<?php echo $term->description; ?>" title="<?php echo $term->description; ?>"></amp-img>

					<?php } else { ?>
						<img src="<?php echo get_bloginfo('template_url'); ?>/images/1x1.jpg" width="<?php echo $imagem[1]; ?>" alt="<?php echo $term->description; ?>" title="<?php echo $term->description; ?>" class="lazy" data-preload="<?php echo $imagem[0]; ?>">
					<?php } ?>
				</div>
			<?php } ?>

			<div class="category-info-description">
				<h2><?php echo $term->name; ?></h2>
			</div>
		</a>
	</div>
</div>