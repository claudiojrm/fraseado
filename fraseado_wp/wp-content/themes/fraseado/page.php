<?php get_header(); ?>

<?php 
	if(have_posts()) { 
		the_post(); 
?>
<div class="title">
	<h1><?php the_title(); ?></h1>
</div>
<div class="wrapper">
	<article <?php post_class(' template-post template-page'); ?>>	
		<div class="entry-content">
			<?php echo get_the_content(); ?>
		</div>

		<div class="banner pub">
			<div class="adsgoogle endpost"></div>
		</div>
	</article>
</div>
<?php } ?>
<?php get_footer(); ?>