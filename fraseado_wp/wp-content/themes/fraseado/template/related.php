<section class="veja-tambem">
	<?php include(locate_template('template/category-info.php')); ?>
	<div class="wrapper">
		<ul>
			<?php 
				$posts = query_posts(array('posts_per_page' => $qnt ? $qnt : 3, 'order' => 'ASC', 'category__in' => $cat, 'post__not_in' => array($post->ID)));
			
				while(have_posts()) : the_post();
					if(has_post_thumbnail()) {
					?>
						<li>
							<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="related-post" data-vars-a="<?php echo $post->post_name; ?>">
								<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); ?>
								<amp-img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" layout="responsive" alt="<?php echo $post->post_title; ?>"></amp-img>

								<div class="thumbnail-text">
									<p><?php the_excerpt(); ?></p>
								</div>
							</a> 
						</li>
				<?php } ?>
			<?php endwhile; ?>
			<?php wp_reset_query(); ?>
		</ul>
	</div>
</section>
