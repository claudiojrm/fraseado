<section class="veja-tambem">
	<div class="wrapper">
		<ul>
			<?php while(have_posts()) : the_post(); ?>
				<li>
					<a href="<?php echo get_the_permalink(); ?>" data-event-category="site-post" data-event-action="<?php echo $post->post_name; ?>">
						<div class="placeholder">
							<?php the_post_thumbnail('medium'); ?>
						</div>

						<div class="thumbnail-text">
							<?php the_excerpt(); ?>
						</div>
					</a> 
				</li>
			<?php endwhile;	?>
		</ul>
		<?php if(!get_query_var('single')) { ?>
			<div class="banner">
				<div class="adsgoogle endpost"></div>
			</div>
		<?php } ?>
	</div>
</section>