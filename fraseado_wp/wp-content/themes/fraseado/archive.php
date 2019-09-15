<?php get_header(); ?>

<div class="wrapper">
	<div class="title">
		<h1>
			Frases de 
			<?php 
				if(is_day()) { 
					echo get_the_date();
				} elseif(is_month()) {
					echo get_the_date('F Y');	
				} elseif(is_year()) { 
					echo get_the_date('Y'); 
				} 
			?>
		</h1>
	</div>
	<?php get_template_part('template/list-post'); ?>

	<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < $wp_query->found_posts) { ?>
		<div class="navigation">
			<?php $link = implode('/', array_filter(array($wp_query->query['year'], $wp_query->query['monthnum'], $wp_query->query['day'], 'page/'.(get_query_var('paged') ? get_query_var('paged')+1 : 2).'/'))); ?>
			<a href="<?php echo $link.($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="more-item" data-vars-a="<?php echo $link; ?>">+ frases, <span>clique aqui!</span></a>
		</div>
	<?php } ?>
</div>

<?php get_footer(); ?>