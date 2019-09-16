<div class="veja-tambem links">
    <div class="w">
        <div class="wrapper-info">
            <div class="info">
                <h2>Categorias em destaque</h2>
                <p>Aqui você encontra os assuntos em destaque do dia: frases de amor, frases de fé, mensagens bíblicas, datas comemorativas, e navega pelos temas mais bonitos.</p>
            </div>
        </div>
        <div class="tags">
            <?php 
                $featured = get_option('destaques_home', array());

                foreach($featured as $i => $feature) {
                    $order = $feature['post_category'];
                    shuffle($order);
                    foreach ($order as $x => $cat) {
                        $term = get_category($cat);	
            ?>
                    <a href="<?php echo get_category_link($term->term_id).($GLOBALS['AMP'] ? '?amp' : ''); ?>" data-vars-a="<?php echo $term->term_id; ?>"><?php echo $term->name; ?></a>
            <?php }} ?>
        </div>
    </div>
</div>