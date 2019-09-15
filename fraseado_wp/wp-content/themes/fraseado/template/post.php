<?php $image = has_post_thumbnail(); ?>
		
<article class="post">
	<div class="post-article">
		<div>
			<div class="entry-content">
				<?php the_content(); ?>
			</div>
			
			<?php if($image) { ?>
				<div class="post-image">
					<div class="share">
						<a rel="noreferrer" title="Ouvir texto da imagem" href="#" class="icon-readspeaker" data-vars-c="share-readspeaker" data-vars-a="<?php echo $post->post_name; ?>">ouvir</a>
						<a rel="noreferrer" title="Compartilhar no Whatsapp" href="whatsapp://send?text=<?php echo get_the_excerpt(); ?> <?php echo get_the_permalink().'?utm_source=whatsapp%26utm_medium=referral%26utm_campaign=share'; ?>" data-vars-c="share-wts" data-vars-a="<?php echo $post->post_name; ?>" class="icon-wts"></a>
						<a rel="noreferrer" title="Compartilhar no Facebook" href="//facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink().'?utm_source=facebook%26utm_medium=referral%26utm_campaign=share'; ?>" class="icon-fb" data-vars-c="share-fb" data-vars-a="<?php echo $post->post_name; ?>" target="_blank"></a>
						<a rel="noreferrer" title="Compartilhar no Pinterest" href="https://br.pinterest.com/pin/create/button/?url=<?php echo get_the_permalink().'?utm_source=pinterest%26utm_medium=referral%26utm_campaign=share'; ?>&description=<?php echo get_the_excerpt(); ?>&media=<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" data-vars-c="share-pin" data-vars-a="<?php echo $post->post_name; ?>" target="_blank" class="icon-pin"></a>
						<a rel="noreferrer" title="Compartilhar no Twitter" href="https://twitter.com/intent/tweet?text=<?php echo get_the_excerpt(); ?>&url=<?php echo get_the_permalink().'?utm_source=twitter%26utm_medium=referral%26utm_campaign=share'; ?>&via=fraseado_" data-vars-c="share-tw" data-vars-a="<?php echo $post->post_name; ?>" target="_blank" class="icon-tw"></a>
					</div>

					<?php 
						$medium = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); 
					
						$full = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full' );
					?>
					
					<amp-img 
						src="<?php echo $medium[0]; ?>" 
						srcset="<?php echo $medium[0]; ?> 360w, <?php echo $full[0]; ?> 1024w"
						sizes="(max-width: 768px) 360px, 595px"
						width="<?php echo $medium[1]; ?>" 
						height="<?php echo $medium[2]; ?>" 
						layout="responsive" 
						alt="<?php echo get_the_excerpt(); ?>">
					</amp-img>
				</div>
				<div class="download">
					<a href="<?php echo $full[0]; ?>" download data-vars-c="post-download" data-vars-a="<?php echo $post->post_name; ?>">baixar imagem</a>
				</div>
			<?php } ?>		
		</div>
		<div class="template-post-info">
			<div class="banner pub">
				<div class="adflying">
					<?php if($GLOBALS['AMP']) { ?>
						<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="8680126423" data-auto-format="rspv" data-full-width>
							<div overflow></div>
						</amp-ad>
					<?php } else { ?>
						<amp-fx-flying-carpet height="400">
							<amp-ad width="300" height="600" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="1074951221"></amp-ad>
						</amp-fx-flying-carpet>
					<?php } ?>
				</div>

				<div class="adstatic">
					<amp-ad width="300" height="600" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '8680126423' : '1074951221'; ?>"></amp-ad>
				</div>
			</div>
		</div>
	</div>
</article>
