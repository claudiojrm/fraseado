<?php get_header(); ?>

<?php 
$hasposts = get_category($cat)->category_parent && get_category($cat)->category_count;
if($hasposts) { 
?>
	<?php include(locate_template('template/category-info.php')); ?>
	<div class="wrapper">
		<?php get_template_part('template/list-post'); ?>

		<?php if(get_option('posts_per_page') * (get_query_var('paged') ? get_query_var('paged') : 1) < get_category($cat)->category_count) { ?>
		<div class="navigation">
			<?php $link = get_category_link($cat).('page/'. (get_query_var('paged') ? get_query_var('paged')+1 : 2)); ?>
			<a href="<?php echo $link; ?>" data-event-category="site-more-item" data-event-action="<?php echo trim(str_replace(site_url(), '', $link), '/'); ?>">+ <?php echo get_category($cat)->name; ?>, <span>clique aqui!</span></a>
		</div>
		<?php } ?>
	</div>
<?php } else { ?>
	<?php include(locate_template('template/category-info.php')); ?>
	<div class="wrapper">
		<?php get_template_part('template/list-subcategory'); ?>		
	</div>
<?php } ?>

<?php get_footer(); ?>