<?php 
	// informações da categoria
	$term = get_category($cat);	
?>
<div class="wrapper-info wrapper">
	<div class="category-info">
		<a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="category-info" data-vars-a="<?php echo $term->slug; ?>">
			<div class="category-info-description">
				<h2><?php echo $term->name; ?></h2>
				<p><?php echo $term->description; ?></p>
			</div>
		</a>
	</div>
</div>