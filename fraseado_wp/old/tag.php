<?php get_header(); ?>

<div class="wrapper">
	<h2 class="page-title">Veja resultados para tag: <b><?php echo single_tag_title( '', false ); ?></b></h2>

	<?php get_template_part('template/list-post'); ?>

	<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts) { ?>
		<div class="navigation">
			<?php $link = 'tag/'.$tag.'/'.'page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/'; ?>
			<a href="<?php echo $link; ?>" data-event-category="site-more-item" data-event-action="<?php echo $link; ?>">+ frases da tag "<?php echo single_tag_title( '', false ); ?>", <span>clique aqui!</span></a>
		</div>
	<?php } ?>
</div>

<?php get_footer(); ?>