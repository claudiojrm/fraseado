<?php 
	// id da imagem da categoria
	$id = get_term_meta($cat, 'wpfifc_featured_image', true);

	// imagem da categoria
	$imagem = wp_get_attachment_image_src($id, 'thumbnail');

	// informações da categoria
	$term = get_category($cat);	
?>
<div class="wrapper-info">
	<div class="category-info">
		<a href="<?php echo get_category_link($term->term_id); ?>" data-event-category="site-category-info" data-event-action="<?php echo $term->slug; ?>">
			<?php if(!empty($imagem)) { ?>
				<div class="placeholder category-info-img">
					<img src="https://fraseado.com.br/wp-content/themes/fraseado/images/1x1.jpg" width="<?php echo $imagem[1]; ?>" alt="<?php echo $term->description; ?>" title="<?php echo $term->description; ?>" class="lazy" data-preload="<?php echo $imagem[0]; ?>">
				</div>
			<?php } ?>

			<div class="category-info-description">
				<h1><?php echo $term->name; ?></h1>
				<p><?php echo $term->description; ?></p>
			</div>
		</a>
	</div>
</div>