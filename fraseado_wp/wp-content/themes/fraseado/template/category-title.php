<?php $term = get_category($cat); ?>
<?php $hasposts = get_category($cat)->category_parent && get_category($cat)->category_count; ?>
<div class="title">
	<div class="w">
		<h1>
			<a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="cat-title" data-vars-a="<?php echo $term->slug; ?>">
				<?php echo $term->name; ?>
				<?php if(is_single()) { ?>
					<span><?php echo $post->post_title; ?></span>
				<?php } ?>
			</a>
		</h1>

		<?php if(!is_single()) { ?>
			<p><?php echo $term->description; ?></p>
		<?php } ?>

		<?php if($hasposts || is_single()) { ?>
		<a class="story" href="<?php echo get_category_link($term->term_id); ?>?amp&stories" data-vars-c="cat-story" data-vars-a="<?php echo $term->slug; ?>">ver em stories</a>
		<?php } ?>
	</div>
</div>