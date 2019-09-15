<section class="veja-tambem gallery">
	<div class="wrapper-info w">
		<div class="info">
			<div>
				<h2>Galeria de frases</h2>
				<p>Lindas frases que preparamos especialmente para você. Reflita, se divirta, se emocione, tenha fé. Compartilhe com todos os seus amigos e faça o dia de alguém mais feliz!</p>
			</div>
		</div>
	</div>

	<div class="w">
		<ul>
			<?php 
				$featured = get_option('destaques_home', array())[0]['post_category'];

				$posts = query_posts(array('posts_per_page' => 12, 'order' => 'DESC', 'orderby' => 'rand', 'cat' => $featured, 'category__not_in' => $cat, 'post__not_in' => array($post->ID)));
			
				while(have_posts()) : the_post();
					if(has_post_thumbnail()) {
					?>
						<li>
							<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="gallery" data-vars-a="<?php echo $post->post_name; ?>">
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