<?php $image = has_post_thumbnail(); ?>
		
<article <?php post_class(' template-post'); ?>>
	<div class="post-article">
		<div>
			<div class="entry-content">
				<?php the_content(); ?>
			</div>
			
			<?php if($image) { ?>
				<div class="post-image">
					<div class="share">
						<a href="#" class="icon-readspeaker" data-vars-event-category="share-post-readspeaker" data-vars-event-action="<?php echo $post->post_name; ?>" >ouvir</a>
						<a href="whatsapp://send?text=<?php echo get_the_excerpt(); ?> <?php echo get_the_permalink().'?utm_source=whatsapp%26utm_medium=referral%26utm_campaign=share'; ?>" data-vars-event-category="share-post-wts" data-vars-event-action="<?php echo $post->post_name; ?>" class="icon-wts"></a>
						<a href="//facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink().'?utm_source=facebook%26utm_medium=referral%26utm_campaign=share'; ?>" class="icon-fb" data-vars-event-category="share-post-fb" data-vars-event-action="<?php echo $post->post_name; ?>" target="_blank"></a>
						<a href="https://br.pinterest.com/pin/create/button/?url=<?php echo get_the_permalink().'?utm_source=pinterest%26utm_medium=referral%26utm_campaign=share'; ?>&description=<?php echo get_the_excerpt(); ?>&media=<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" data-vars-event-category="share-post-pin" data-vars-event-action="<?php echo $post->post_name; ?>" target="_blank" class="icon-pin"></a>
						<a href="https://twitter.com/intent/tweet?text=<?php echo get_the_excerpt(); ?>&url=<?php echo get_the_permalink().'?utm_source=twitter%26utm_medium=referral%26utm_campaign=share'; ?>&via=fraseado_" data-vars-event-category="share-post-tw" data-vars-event-action="<?php echo $post->post_name; ?>" target="_blank" class="icon-tw"></a>
					</div>

					<div class="placeholder">
						<?php if($GLOBALS['AMP']) { ?>
							<?php $imagem = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); ?>
							<amp-img src="<?php echo $imagem[0]; ?>" width="500" height="400" layout="responsive" alt="<?php echo get_the_excerpt(); ?>"></amp-img>
						<?php } else { ?>
							<?php the_post_thumbnail('full'); ?>
						<?php } ?>
					</div>
				</div>
			<?php } ?>		
		</div>
		<div class="template-post-info">
			<div class="banner pub">
				<div class="adpost">
					<amp-fx-flying-carpet height="400">
						<amp-ad width="300" height="600" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '8680126423' : '1074951221'; ?>"></amp-ad>
					</amp-fx-flying-carpet>
				</div>

				<div class="adsgoogle adssinglepost"></div>
			</div>
		</div>
	</div>
</article>
