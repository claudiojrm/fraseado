<section class="veja-tambem">
	<?php get_query_var('home') && include(locate_template('template/category-info.php')); ?>
	<div class="w">
		<ul>
			<?php 
			$i = 0; 
			while(have_posts()) : the_post(); 
				$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' );
				$rand = !get_query_var('home') && rand(0, 1) % ($i+1) == 0;
			?>
				<li class="<?php echo ($rand || !$image) ? 'sem-imagem' : ''; ?>">
					<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="post" data-vars-a="<?php echo $post->ID; ?>">
						<?php if(!$rand && $image) { ?>
							<amp-img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" layout="responsive" alt="<?php echo $post->post_title; ?>"></amp-img>
						<?php }; ?>
						
						<?php if($rand || !$image) { ?>						
							<h2><?php the_title(); ?></h2>
						<?php } ?>
						
						<?php the_excerpt(); ?>
					</a> 
				</li>
			<?php $i++;	?>
			<?php endwhile;	?>
		</ul>
	</div>
</section>