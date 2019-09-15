<?php get_header(); ?>

<div class="title">
	<h1>busca: <?php echo get_search_query(); ?></h1>
</div>

<div class="w">
	<?php get_template_part('template/list-post'); ?>

	<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts) { ?>
		<div class="navigation">
			<?php $link = '/page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/?s='.get_query_var('s'); ?>
			<a href="<?php echo $link.($GLOBALS['AMP'] ? '&amp' : ''); ?>" data-vars-c="more-item" data-vars-a="<?php echo $link; ?>">+ frases para "<?php echo get_search_query(); ?>", <span>clique aqui!</span></a>
		</div>
	<?php } ?>
</div>

<?php get_footer(); ?>