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

	<?php $i = 2; ?>
	
	<?php while(have_posts()) : the_post(); ?>
		<?php if($i == 3 || $i % 9 == 0) { ?>
		<amp-story-page id="page-ad-<?php echo $i; ?>" style="background: url(<?php echo $imagem[0]; ?>) center;">
			<amp-story-grid-layer template="fill" class="bg"></amp-story-grid-layer>
			<amp-story-grid-layer template="vertical" class="posts">
				<div class="ad">
					<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="5665182079" data-auto-format="rspv" data-full-width>
						<div overflow></div>
					</amp-ad>
				</div>
			</amp-story-grid-layer>
		</amp-story-page>
		<?php } ?>
		<amp-story-page id="page-<?php echo $i; ?>" style="background: url(<?php echo $imagem[0]; ?>) center;">
			<amp-story-grid-layer template="fill" class="bg"></amp-story-grid-layer>
			<amp-story-grid-layer template="vertical" class="posts">
				<div animate-in="fade-in">
					<div class="layer">
						<?php the_content(); ?>
					</div>
				</div>
			</amp-story-grid-layer>
			<amp-story-cta-layer animate-in="fade-in">
				<div class="cta-layer">
					<div class="share">
						<a rel="noreferrer" title="Compartilhar no Whatsapp" href="whatsapp://send?text=<?php echo get_the_excerpt(); ?> <?php echo get_the_permalink().'?utm_source=whatsapp%26utm_medium=referral%26utm_campaign=share'; ?>" data-vars-event-category="share-story-wts" data-vars-event-action="<?php echo $post->post_name; ?>" class="icon-wts"></a>
						<a rel="noreferrer" title="Compartilhar no Facebook" href="//facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink().'?utm_source=facebook%26utm_medium=referral%26utm_campaign=share'; ?>" class="icon-fb" data-vars-event-category="share-story-fb" data-vars-event-action="<?php echo $post->post_name; ?>" target="_blank"></a>
						<a rel="noreferrer" title="Compartilhar no Pinterest" href="https://br.pinterest.com/pin/create/button/?url=<?php echo get_the_permalink().'?utm_source=pinterest%26utm_medium=referral%26utm_campaign=share'; ?>&description=<?php echo get_the_excerpt(); ?>&media=<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" data-vars-event-category="share-story-pin" data-vars-event-action="<?php echo $post->post_name; ?>" target="_blank" class="icon-pin"></a>
						<a rel="noreferrer" title="Compartilhar no Twitter" href="https://twitter.com/intent/tweet?text=<?php echo get_the_excerpt(); ?>&url=<?php echo get_the_permalink().'?utm_source=twitter%26utm_medium=referral%26utm_campaign=share'; ?>&via=fraseado_" data-vars-event-category="share-story-tw" data-vars-event-action="<?php echo $post->post_name; ?>" target="_blank" class="icon-tw"></a>
					</div>
					<div class="logo">
						<a href="<?php echo home_url('/'); ?>" data-vars-event-category="logo">Frases e mensagens de amor para você compartilhar - Fraseado</a>
					</div>
				</div>
			</amp-story-cta-layer>				
		</amp-story-page>
	<?php $i++;	?>
	<?php endwhile;	?>

	<?php include(locate_template('template/analytics.php')); ?>
</amp-story>