<?php get_header(); ?>

<div class="title">
	<h1>autor: <?php echo get_the_author(); ?></h1>
</div>

<div class="w">
	<?php get_template_part('template/list-post'); ?>

	<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts) { ?>
		<div class="navigation">
			<?php $link = 'author/'.strtolower(get_the_author()).'/'.'page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/'; ?>
			<a href="<?php echo $link.($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="more" data-vars-a="<?php echo $link; ?>">+ frases do autor "<?php echo get_the_author(); ?>"</a>
		</div>
	<?php } ?>
</div>

<?php get_footer(); ?>