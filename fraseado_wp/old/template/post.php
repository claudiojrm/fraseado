<?php $image = has_post_thumbnail(); ?>
		
<article <?php post_class(' template-post'); ?>>
	<div class="post-article">
		<div>
			<?php if($image) { ?>
				<div class="post-image">
					<div class="share">
						<a href="whatsapp://send?text=<?php echo get_the_excerpt(); ?> <?php echo get_the_permalink().'?utm_source=whatsapp%26utm_medium=referral%26utm_campaign=share'; ?>" data-event-category="site-share-post-wts" data-event-action="<?php echo $post->post_name; ?>" class="icon-wts"></a>
						<a href="//facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink().'?utm_source=facebook%26utm_medium=referral%26utm_campaign=share'; ?>" class="icon-fb" data-event-category="site-share-post-fb" data-event-action="<?php echo $post->post_name; ?>" target="_blank"></a>
						<a href="https://br.pinterest.com/pin/create/button/?url=<?php echo get_the_permalink().'?utm_source=pinterest%26utm_medium=referral%26utm_campaign=share'; ?>&description=<?php echo get_the_excerpt(); ?>&media=<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" data-event-category="site-share-post-pin" data-event-action="<?php echo $post->post_name; ?>" target="_blank" class="icon-pin"></a>
						<a href="https://twitter.com/intent/tweet?text=<?php echo get_the_excerpt(); ?>&url=<?php echo get_the_permalink().'?utm_source=twitter%26utm_medium=referral%26utm_campaign=share'; ?>&via=fraseado_" data-event-category="site-share-post-tw" data-event-action="<?php echo $post->post_name; ?>" target="_blank" class="icon-tw"></a>
					</div>

					<div class="placeholder">
						<?php the_post_thumbnail('full'); ?>
					</div>
				</div>
			<?php } ?>
			
			<div class="entry-content">
				<?php the_content(); ?>
			</div>
		</div>
		<div class="template-post-info">
			<div class="banner pub">
				<div class="adsgoogle adssinglepost"></div>
				<div class="adsgoogle adspost"></div>
			</div>
		</div>
	</div>
</article>
