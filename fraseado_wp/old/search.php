<?php get_header(); ?>

<div class="wrapper">
	<h2 class="page-title">Veja resultados para: <b><?php echo get_search_query(); ?></b></b></h2>

	<?php get_template_part('template/list-post'); ?>

	<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts) { ?>
		<div class="navigation">
			<?php $link = 'page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/?s='.get_query_var('s'); ?>
			<a href="<?php echo $link; ?>" data-event-category="site-more-item" data-event-action="<?php echo $link; ?>">+ frases para "<?php echo get_search_query(); ?>", <span>clique aqui!</span></a>
		</div>
	<?php } ?>
</div>

<?php get_footer(); ?>