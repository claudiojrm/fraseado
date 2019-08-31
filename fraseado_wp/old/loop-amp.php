<?php 
$query = new WP_Query();
$query->query($wp_query->query);

if($query->have_posts()) {
	$i = 0;
	$x = 0;
	$single = get_query_var('single') && is_single();
	while($query->have_posts()) : $query->the_post();
	$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' );

	if($single) {
?>
	<div class="wrapper-post <?php echo $single ? 'template-post' : 'template-list'; ?>">
		<article class="slide">
			<h1 class="separator"><a href="<?php the_permalink(); ?>?amp" data-vars-event-category="amp amp-title-post" data-vars-event-action="<?php echo $post->post_name; ?>"><?php the_title(); ?></a></h1>
			
			<div>
				<div class="share">
					<a data-vars-event-category="amp amp-share-wts" data-vars-event-action="<?php echo $post->post_name; ?>" href="whatsapp://send?text=<?php echo get_the_excerpt(); ?> <?php echo get_the_permalink().'?utm_source=whatsapp%26utm_medium=referral%26utm_campaign=share'; ?>" class="icon-wts"></a>
					<a data-vars-event-category="amp amp-share-fb" data-vars-event-action="<?php echo $post->post_name; ?>" href="//facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink().'?utm_source=facebook%26utm_medium=referral%26utm_campaign=share'; ?>" class="icon-fb" target="_blank"></a>
					<a data-vars-event-category="amp amp-share-tw" data-vars-event-action="<?php echo $post->post_name; ?>" href="//twitter.com/intent/tweet?text=<?php echo get_the_excerpt(); ?>&url=<?php echo get_the_permalink().'?utm_source=twitter%26utm_medium=referral%26utm_campaign=share'; ?>&via=fraseado_" target="_blank" class="icon-tw"></a>
					<a data-vars-event-category="amp amp-share-pin" data-vars-event-action="<?php echo $post->post_name; ?>" href="//br.pinterest.com/pin/create/button/?url=<?php echo get_the_permalink().'?utm_source=pinterest%26utm_medium=referral%26utm_campaign=share'; ?>&description=<?php echo get_the_excerpt(); ?>&media=<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>" target="_blank" class="icon-pin"></a>
				</div>

				<?php if(!empty($image)) { ?>
					<a href="<?php the_permalink(); ?>?amp" data-vars-event-category="amp amp-image-post" data-vars-event-action="<?php echo $post->post_name; ?>">
						<amp-img tabindex="0" src="<?php echo $image[0]; ?>" width="500" height="400" layout="responsive" alt="<?php echo get_the_excerpt(); ?>"></amp-img>
					</a>
				<?php } ?>
			</div>
			
			<?php if(!empty($image)) { ?>
				<p><?php echo get_the_content(); ?></p>
			<?php } else { ?>
				<p><a href="<?php the_permalink(); ?>?amp" data-vars-event-category="amp amp-description-post" data-vars-event-action="<?php echo $post->post_name; ?>"><?php echo get_the_content(); ?></a></p>
			<?php } ?>
			<!-- GFP - 1º post (AMP - 336x280) -->
			<div class="banner">
				<div>	
					<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="8680126423" data-auto-format="rspv" data-full-width>
						<div overflow></div>
					</amp-ad>
				</div>	
			</div>
		</article>

		<?php 
			$params = array('posts_per_page' => 12, 'post__not_in' => array($post->ID), 'category__in' => get_query_var('infocat')->term_id, 'order' => 'ASC', 'orderby' => 'rand');

			$posts = query_posts($params);
			
			if(count($posts)) {
		?>	
			<div class="veja-tambem">
				<h2 class="separator">
					<span>Mais <?php echo strtolower(get_the_category()[0]->name); ?></span>
				</h2>
				
				<ul>
					<?php 
						while(have_posts()) : the_post();
							$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); 
							if(!empty($image)) {
							?>
								<li>
									<a href="<?php echo get_the_permalink(); ?>?amp" data-vars-event-category="amp amp-related" data-vars-event-action="<?php echo get_the_category()[0]->slug; ?>">
										<amp-img src="<?php echo $image[0]; ?>" width="200" height="160" layout="responsive"></amp-img>

										<div class="thumbnail-text">
											<div><?php the_excerpt(); ?></div>
										</div>
									</a> 
								</li>
						<?php } ?>
					<?php endwhile; ?>
					<?php wp_reset_query(); ?>
				</ul>
			</div>
		<?php } ?>
	</div>
<?php } else { ?>
	<li>
		<a href="<?php echo get_the_permalink(); ?>?amp" data-vars-event-category="amp amp-category" data-vars-event-action="<?php echo $post->post_name; ?>">
			<?php if(!empty($image)) { ?>
				<amp-img src="<?php echo $image[0]; ?>" width="200" height="160" layout="responsive" alt="<?php echo get_the_excerpt(); ?>"></amp-img>
			<?php } ?>

			<div class="thumbnail-text">
				<div><?php the_excerpt(); ?></div>
			</div>
		</a> 
	</li>
<?php } ?>
<?php $i++; $x++; endwhile; ?>
<?php } ?>