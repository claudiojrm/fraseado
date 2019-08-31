<section class="veja-tambem">
	<div class="wrapper">
		<ul>
			<?php $i = 0; ?>
			<?php while(have_posts()) : the_post(); ?>
				<li>
					<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="post" data-vars-event-action="<?php echo $post->post_name; ?>">
						<div class="placeholder">
							<?php 
								if($GLOBALS['AMP']) {
									$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' );
							?>
								<amp-img src="<?php echo $image[0]; ?>" width="200" height="160" layout="responsive"></amp-img>

							<?php 
								} else {
									the_post_thumbnail('medium'); 
								}
							?>
						</div>

						<div class="thumbnail-text">
							<?php the_excerpt(); ?>
						</div>
					</a> 
				</li>
				
				<?php if(!get_query_var('single') && $i == 3) { ?>
					<li class="banner full">
						<?php if($GLOBALS['AMP']) { ?>
							<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="7078240632" data-auto-format="rspv" data-full-width>
								<div overflow></div>
							</amp-ad>
						<?php } else { ?>
							<div class="adsgoogle endpost"></div>
						<?php } ?>
					</li>
				<?php } ?>
			<?php $i++;	?>
			<?php endwhile;	?>
		</ul>
	</div>
</section>