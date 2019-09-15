<?php get_header(); ?>

<?php 
	if(have_posts()) { 
		the_post(); 
?>
<div class="title">
	<h1><?php the_title(); ?></h1>
</div>
<div class="w">
	<article <?php post_class(' template-post template-page'); ?>>	
		<div class="entry-content">
			<?php echo get_the_content(); ?>
		</div>

		<div class="banner pub w">
			<div class="adflying">
				<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="8458617229" data-auto-format="rspv" data-full-width>
					<div overflow></div>
				</amp-ad>
			</div>

			<div class="adstatic">
				<amp-ad width="728" height="90" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="7121484820"></amp-ad>
			</div>
		</div>
	</article>
</div>
<?php } ?>
<?php get_footer(); ?>