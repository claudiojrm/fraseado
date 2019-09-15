<div class="veja-tambem w links">
    <div class="wrapper-info">
		<div class="info">
			<div>
				<h2>Categorias em destaque</h2>
				<p>Aqui você encontra os assuntos em destaque do dia: frases de amor, frases de fé, mensagens bíblicas, datas comemorativas, e navega pelos temas mais bonitos.</p>
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
                <a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-c="links" data-vars-a="<?php echo $term->slug; ?>">
                    <?php echo $term->name; ?>
                </a>
            </li>
        <?php }} ?>
    </ul>
</div>