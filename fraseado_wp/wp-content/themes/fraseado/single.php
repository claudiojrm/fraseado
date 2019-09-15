<?php get_header(); ?>

<?php
	if(have_posts()) {
		the_post();
	}

	// informações da categoria principal 
	$category = get_category(wp_get_post_categories($post->ID, array('orderby' => 'id'))[0]);
	
	// id da categoria
	$cat = $category->term_id;

	// nome da categoria
	include(locate_template('template/category-title.php')); 
?>
<div class="wrapper">
	<?php get_template_part('template/post'); ?>
</div>

<?php 
	include(locate_template('template/gallery.php')); 
	
	$qnt = 12;
	include(locate_template('template/related.php')); 
?>

<?php get_footer(); ?>