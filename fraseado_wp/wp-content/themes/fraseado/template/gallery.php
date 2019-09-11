<section class="veja-tambem gallery">
	<div class="wrapper-info">
		<div class="category-info wrapper">
			<div class="category-info-description">
				<h2>Galeria de imagens</h2>
			</div>
		</div>
	</div>

	<div class="wrapper">
		<ul>
			<?php 
				$featured = get_option('destaques_home', array())[0]['post_category'];

				$posts = query_posts(array('posts_per_page' => $qnt, 'order' => 'DESC', 'orderby' => 'rand', 'cat' => $featured, 'category__not_in' => $cat, 'post__not_in' => array($post->ID)));
			
				while(have_posts()) : the_post();
					if(has_post_thumbnail()) {
					?>
						<li>
							<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="gallery-post" data-vars-event-action="<?php echo $post->post_name; ?>">
								<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); ?>
								<amp-img src="<?php echo $image[0]; ?>" width="200" height="160" layout="responsive" alt="<?php echo $post->post_title; ?>"></amp-img>
							</a> 
						</li>
				<?php } ?>
			<?php endwhile; ?>
			<?php wp_reset_query(); ?>
		</ul>
	</div>
</section>
<div class="banner">
	<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '8680126423' : '3414613206'; ?>" data-auto-format="rspv" data-full-width>
		<div overflow></div>
	</amp-ad>
</div>
