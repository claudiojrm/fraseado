<section class="veja-tambem">
	<div class="wrapper">
		<ul>
			<?php $i = 0; ?>
			<?php while(have_posts()) : the_post(); ?>
				<li>
					<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="post" data-vars-event-action="<?php echo $post->post_name; ?>">
						<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); ?>
						<amp-img src="<?php echo $image[0]; ?>" width="200" height="160" layout="responsive"></amp-img>

						<div class="thumbnail-text">
							<?php the_excerpt(); ?>
						</div>
					</a> 
				</li>
				
				<?php if(!get_query_var('single') && $i == 7) { ?>
					<li class="banner full">
						<div class="adflying">
							<amp-fx-flying-carpet height="400">
								<amp-ad width="300" height="600" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '7078240632' : '5505150824'; ?>"></amp-ad>
							</amp-fx-flying-carpet>
						</div>

						<div class="adstatic">
							<amp-ad width="728" height="90" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="7121484820"></amp-ad>
						</div>
					</li>
				<?php } ?>
			<?php $i++;	?>
			<?php endwhile;	?>
		</ul>
	</div>
</section>