<?php if(!is_page()) { ?>
<div class="w banner">
	<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '7078240632' : '5505150824'; ?>" data-auto-format="rspv" data-full-width>
		<div overflow></div>
	</amp-ad>
</div>
<?php } ?>

<section class="veja-tambem gallery">
	<div class="wrapper-info w">
		<div class="info">
			<h2>Galeria de frases</h2>
			<p>Lindas frases que preparamos especialmente para você. Reflita, se divirta, se emocione, tenha fé. Compartilhe com todos os seus amigos e faça o dia de alguém mais feliz!</p>
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
							<a href="<?php echo get_the_permalink().($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-a="<?php echo $post->ID; ?>">
								<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium' ); ?>
								<amp-img src="<?php echo $image[0]; ?>" width="200" height="160" layout="responsive" alt="<?php echo $post->post_title; ?>"></amp-img>
								<p><?php echo preg_replace('#[Ff]rases (d[aeo])?#', '', get_the_category($post->ID)[0]->name); ?></p>
							</a> 
						</li>
				<?php } ?>
			<?php endwhile; ?>
			<?php wp_reset_query(); ?>
		</ul>
	</div>
</section>

<div class="w banner adflying">
	<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="<?php echo $GLOBALS['AMP'] ? '5726660028' : '8458617229'; ?>" data-auto-format="rspv" data-full-width>
		<div overflow></div>
	</amp-ad>
</div>