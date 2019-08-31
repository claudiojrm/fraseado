<?php get_header(); ?>

<div class="wrapper">
	<h2 class="page-title">Veja resultados para o autor: <b><?php echo get_the_author(); ?></b></b></h2>

	<?php get_template_part('template/list-post'); ?>

	<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts) { ?>
		<div class="navigation">
			<?php $link = 'author/'.strtolower(get_the_author()).'/'.'page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/'; ?>
			<a href="<?php echo $link; ?>" data-event-category="site-more-item" data-event-action="<?php echo $link; ?>">+ frases do autor "<?php echo get_the_author(); ?>", <span>clique aqui!</span></a>
		</div>
	<?php } ?>
</div>

<?php get_footer(); ?>