<?php get_header(); ?>

<div class="wrapper">
	<div class="title">
		<h1>autor: <?php echo get_the_author(); ?></h1>
	</div>

	<?php get_template_part('template/list-post'); ?>

	<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts) { ?>
		<div class="navigation">
			<?php $link = 'author/'.strtolower(get_the_author()).'/'.'page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/'; ?>
			<a href="<?php echo $link.($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="more-item" data-vars-event-action="<?php echo $link; ?>">+ frases do autor "<?php echo get_the_author(); ?>", <span>clique aqui!</span></a>
		</div>
	<?php } ?>
</div>

<?php get_footer(); ?>