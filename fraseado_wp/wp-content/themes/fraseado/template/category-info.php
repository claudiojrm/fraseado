<?php 
	// informações da categoria
	$term = get_category($cat);	
?>
<div class="wrapper-info w">
	<div class="info">
		<a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="cat" data-vars-a="<?php echo $term->slug; ?>">
			<div>
				<h2><?php echo $term->name; ?></h2>
				<p><?php echo $term->description; ?></p>
			</div>
		</a>
	</div>
</div>