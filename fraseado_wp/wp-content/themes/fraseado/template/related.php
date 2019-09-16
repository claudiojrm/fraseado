<section class="veja-tambem related">
	<?php include(locate_template('template/category-info.php')); ?>
	<div class="w">
		<ul>
			<?php 
				$posts = query_posts(array('posts_per_page' => $qnt ? $qnt : 3, 'order' => 'ASC', 'category__in' => $cat, 'post__not_in' => array($post->ID)));
				$i = 0;
				while(have_posts()) : the_post();
					$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' );
					$rand = rand(0, 12) % ($i+1) == 0;
				?>
					<li class="<?php echo ($rand || !$image) ? 'sem-imagem' : ''; ?>">
						<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-a="<?php echo $post->ID; ?>">
							<?php if(!$rand && $image) { ?>
								<amp-img src="<?php echo $image[0]; ?>" width="<?php echo $image[1]; ?>" height="<?php echo $image[2]; ?>" layout="responsive" alt="<?php echo $post->post_title; ?>"></amp-img>
							<?php }; ?>
							
							<?php if($rand || !$image) { ?>						
								<h2><?php the_title(); ?></h2>
							<?php } ?>

							<?php the_excerpt(); ?>
						</a> 
					</li>
			<?php $i++; ?>
			<?php endwhile; ?>
			<?php wp_reset_query(); ?>
		</ul>
	</div>
</section>
