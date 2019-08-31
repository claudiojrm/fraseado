<section class="veja-tambem">
	<div class="wrapper">
		<h3 class="entry-title">
			<?php $category = get_category($cat); ?>
			<span>Mais <?php echo strtolower($category->name); ?></span>
		</h3>
		<ul>
			<?php 
				$posts = query_posts(array('posts_per_page' => $qnt ? $qnt : 3, 'order' => 'ASC', 'category__in' => $cat, 'post__not_in' => array($post->ID)));
			
				while(have_posts()) : the_post();
					if(has_post_thumbnail()) {
					?>
						<li>
							<a href="<?php echo get_the_permalink(); ?>" data-event-category="site-related-post" data-event-action="<?php echo $post->post_name; ?>">
								<div class="placeholder">
									<?php the_post_thumbnail('medium'); ?>
								</div>

								<div class="thumbnail-text">
									<?php the_excerpt(); ?>
								</div>
							</a> 
						</li>
				<?php } ?>
			<?php endwhile; ?>
			<?php wp_reset_query(); ?>
		</ul>
	</div>
</section>
