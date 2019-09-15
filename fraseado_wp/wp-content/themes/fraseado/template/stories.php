<?php
	$id = get_term_meta($cat, 'wpfifc_featured_image', true);	
	$imagem = wp_get_attachment_image_src($id, 'full');
	$term = get_category($cat);	
?>
<amp-story standalone title="AMP Stories - <?php echo $term->name; ?>" publisher="AMP Project" publisher-logo-src="<?php echo get_bloginfo('template_url'); ?>/images/logo-share.png" poster-portrait-src="<?php echo $imagem[0]; ?>">
	<amp-story-page id="page-1" style="background: url(<?php echo $imagem[0]; ?>) center/cover;">
		<amp-story-grid-layer template="fill" class="bg"></amp-story-grid-layer>
		<amp-story-grid-layer template="vertical" class="cover">
			<div animate-in="fade-in">
				<div class="layer">
					<h1><?php echo $term->name; ?></h1>
					<p><?php echo $term->description; ?></p>
				</div>
			</div>
		</amp-story-grid-layer>
	</amp-story-page>

	<?php 
		$i = 2;
	
		while(have_posts()) : the_post();
			$full = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full' );				
			$vertical = $full[2] > $full[1];
		?>
		<amp-story-page id="page-<?php echo $i; ?>" <?php echo $vertical ? '' : 'style="background: url('.$imagem[0].') center"'; ?>>
			<amp-story-grid-layer template="fill" class="bg"></amp-story-grid-layer>
			<amp-story-grid-layer template="<?php echo $vertical ? 'fill' : 'vertical';?>" class="posts <?php echo $vertical ? 'vertical' : '';?>">
				<div animate-in="fade-in">
					<div class="layer">
						<?php 
							if($vertical) {
						?>
							<amp-img width="<?php echo $full[1]; ?>" height="<?php echo $full[2]; ?>" src="<?php echo $full[0]; ?>" layout="responsive" alt="<?php the_title(); ?>"></amp-img>
						<?php 
							} else {
								the_content(); 
							}
						?>
						<div class="download">
							<?php $thumbnail = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'thumbnail' ); ?>
							<a href="<?php echo $full[0]; ?>" target="_blank" data-vars-c="story-download" data-vars-a="<?php echo $post->post_name; ?>" data-tooltip-icon="<?php echo $thumbnail[0]; ?>">baixar imagem</a>
						</div>
					</div>
				</div>
			</amp-story-grid-layer>
			<amp-story-cta-layer>
				<div class="cta-layer">
					<div class="logo">
						<a href="<?php echo home_url('/'); ?>" data-vars-c="logo">Frases e mensagens de amor para você compartilhar - Fraseado</a>
					</div>
				</div>
			</amp-story-cta-layer>				
		</amp-story-page>
	<?php $i++;	?>
	<?php endwhile;	?>

	<?php include(locate_template('template/analytics.php')); ?>
</amp-story>