<?php get_header(); ?>

<?php 
	if(have_posts()) { 
		the_post(); 
?>
<div class="wrapper">
	<article <?php post_class(' template-post template-page'); ?>>	
		<div class="entry-content">
			<h1 class="page-title">
				<span><?php the_title(); ?></span>
			</h1>
			<?php echo get_the_content(); ?>
		</div>

		<div class="banner pub">
			<div class="adsgoogle adsfirstpost"></div>
		</div>
	</article>
</div>
<?php } ?>
<?php get_footer(); ?>