<?php get_header(); ?>

<div class="title">
	<h1>Fraseado</h1>
	<p>Encontre frases de amor, motivação, deus e muito mais. Compartilhe lindas imagens, a qualquer momento do dia, com mensagens feitas para você.</p>
</div>

<?php 
	// categorias destacadas
	$featured = get_option('destaques_home', array());

	foreach($featured as $i => $feature) {
		$order = $feature['post_category'];
		foreach ($order as $x => $cat) {
	?>
		<?php
			// informações da categoria
			include(locate_template('template/category-info.php'));
		?>
	
		<div class="wrapper">
			<?php
				// posts da categoria
				$posts = query_posts(
					array(
						'posts_per_page' => 4,
						'category__in' => array($cat),
						'orderby' => 'rand',
						'single' => true
					)
				);

				// list de posts da categoria
				if(count($posts)) {
					get_template_part('template/list-post');
				} else {
					$number = 3;
					include(locate_template('template/list-subcategory.php'));
				}

				wp_reset_query();
			?>
		</div>
	<?php } ?>
<?php } ?>
<?php get_footer(); ?>