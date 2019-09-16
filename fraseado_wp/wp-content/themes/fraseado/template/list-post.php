<section class="veja-tambem">
	<?php get_query_var('home') && include(locate_template('template/category-info.php')); ?>
	<div class="w">
		<ul>
			<?php $i = 0; ?>
			<?php while(have_posts()) : the_post(); ?>
				<li>
					<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="post" data-vars-a="<?php echo $post->ID; ?>">
						<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); ?>
						<amp-img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" layout="responsive" alt="<?php echo $post->post_title; ?>"></amp-img>
						<?php the_excerpt(); ?>
					</a> 
				</li>
			<?php $i++;	?>
			<?php endwhile;	?>
		</ul>
	</div>
</section>