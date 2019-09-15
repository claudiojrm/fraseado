<div class="veja-tambem links">
    <div class="wrapper-info wrapper">
		<div class="category-info">
			<div class="category-info-description">
				<h2>Categorias em destaque</h2>
				<p>Aqui você encontra os assuntos em destaque do dia e navega pelos mais bonitos temas.</p>
			</div>
		</div>
	</div>
    <ul>
        <?php 
            $featured = get_option('destaques_home', array());

            foreach($featured as $i => $feature) {
                $order = $feature['post_category'];
                shuffle($order);
                foreach ($order as $x => $cat) {
                    $term = get_category($cat);	
        ?>
            <li>
                <a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="list-links" data-vars-a="<?php echo $term->slug; ?>">
                    <?php echo $term->name; ?>
                </a>
            </li>
        <?php }} ?>
    </ul>
</div>