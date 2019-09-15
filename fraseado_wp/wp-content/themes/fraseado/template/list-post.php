<section class="veja-tambem">
	<div class="wrapper">
		<ul>
			<?php $i = 0; ?>
			<?php while(have_posts()) : the_post(); ?>
				<li>
					<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="post" data-vars-a="<?php echo $post->post_name; ?>">
						<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); ?>
						<amp-img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" layout="responsive" alt="<?php echo $post->post_title; ?>"></amp-img>

						<div class="thumbnail-text">
							<p><?php the_excerpt(); ?></p>
						</div>
					</a> 
				</li>
			<?php $i++;	?>
			<?php endwhile;	?>
		</ul>
	</div>
</section>