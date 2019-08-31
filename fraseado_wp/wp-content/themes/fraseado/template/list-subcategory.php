<div class="template-list">
	<div class="wrapper veja-tambem">
		<ul>
			<?php 
				$categories = array_values(get_categories("number=999&child_of={$cat}&orderby=count&order=DESC"));

				if($number) {
					shuffle($categories);
				}

				foreach ($categories as $i => $cats) {
					if($cat != $cats->category_parent) { 
						continue;
					}

					if($number && $i+1 > $number) {
						break;
					}
					
					// id da imagem da categoria
					$id = get_term_meta($cats->term_id, 'wpfifc_featured_image', true);

					// imagem da categoria
					$medium = wp_get_attachment_image_src($id, 'medium');
			?>
				<li>
					<a href="<?php echo get_category_link($cats->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-event-category="list-subcategory" data-vars-event-action="<?php echo $cats->slug; ?>">
						<?php if(!empty($medium)) { ?>
							<div class="placeholder">
								<?php if($GLOBALS['AMP']) { ?>
									<amp-img src="<?php echo $medium[0]; ?>" width="200" height="160" alt="<?php echo $cats->description; ?>" title="<?php echo $cats->description; ?>" layout="responsive"></amp-img>
								<?php } else { ?>
									<img src="<?php echo $medium[0]; ?>" width="<?php echo $medium[1]; ?>" height="<?php echo $medium[2]; ?>" alt="<?php echo $cats->description; ?>" class="lazy loaded" title="<?php echo $cats->description; ?>">
								<?php } ?>
							</div>
						<?php } ?>
						<div class="thumbnail-text">
							<h2><?php echo $cats->name; ?></h2>
							<p><?php echo $cats->description; ?>
						</div>
					</a>
				</li>
			<?php } ?>
		</ul>
	</div>
</div>