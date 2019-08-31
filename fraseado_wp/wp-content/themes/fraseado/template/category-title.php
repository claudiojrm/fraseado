<?php $term = get_category($cat); ?>
<div class="title">
	<h1>
		<a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="category-title" data-vars-event-action="<?php echo $term->slug; ?>">
			<?php echo $term->name; ?>
		</a>
	</h1>
</div>