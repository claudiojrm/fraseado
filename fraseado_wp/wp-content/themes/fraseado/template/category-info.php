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
				<amp-img class="category-info-img" src="<?php echo $imagem[0]; ?>" width="80" height="60" layout="responsive" alt="<?php echo $term->description; ?>" title="<?php echo $term->description; ?>"></amp-img>
			<?php } ?>

			<div class="category-info-description">
				<h2><?php echo $term->name; ?></h2>
			</div>
		</a>
	</div>
</div>