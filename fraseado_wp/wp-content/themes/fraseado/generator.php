<?php /* Template Name: Generator */ ?>
<?php get_header(); ?>
<?php 
	if(have_posts()) { 
		the_post(); 
?>
<div class="title">
	<h1><?php the_title(); ?></h1>
</div>
<div class="w">

	<article <?php post_class(' template-generator post template-post'); ?>>		
		<div class="post-article">
			<div>
				<div class="entry-content">
					<?php the_content(); ?>
				</div>

				<div class="share">
					<a rel="noreferrer" title="Compartilhar no Whatsapp" href="whatsapp://send?text=<?php echo get_the_excerpt(); ?> <?php echo get_the_permalink().'?utm_source=whatsapp%26utm_medium=referral%26utm_campaign=share'; ?>" data-vars-c="site-share-post-wts" data-vars-a="<?php echo $post->post_name; ?>" class="icon-wts"></a>
					<a rel="noreferrer" title="Compartilhar no Facebook" href="//facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink().'?utm_source=facebook%26utm_medium=referral%26utm_campaign=share'; ?>" class="icon-fb" data-vars-c="site-share-post-fb" data-vars-a="<?php echo $post->post_name; ?>" target="_blank"></a>
					<a rel="noreferrer" title="Compartilhar no Twitter" href="https://twitter.com/intent/tweet?text=<?php echo get_the_excerpt(); ?>&url=<?php echo get_the_permalink().'?utm_source=twitter%26utm_medium=referral%26utm_campaign=share'; ?>&via=fraseado_" data-vars-c="site-share-post-tw" data-vars-a="<?php echo $post->post_name; ?>" target="_blank" class="icon-tw"></a>
				</div>

				<form method="post" class="generator">	
					<div class="full">
						<label for="field-text">Texto da frase:</label>
						<textarea id="field-text" name="field-text" placeholder="Digite uma frase"></textarea>
					</div>
					<div class="full">
						<label for="field-text-name">Nome da fonte:</label> 
						<select id="field-text-name" name="field-text-name">
							<option value="arial">arial</option>
							<option value="georgia" selected>georgia</option>
							<option value="tahoma">tahoma</option>
							<option value="times new roman">times new roman</option>
							<option value="trebuchet ms">trebuchet</option>
							<option value="verdana">verdana</option>
						</select>
					</div>
					<div>
						<label for="field-text-size">Tamanho da fonte:</label> 
						<input type="range" id="field-text-size" name="field-text-size" max="100" min="12" value="16">
					</div>

					<div>
						<label for="field-opacity">Opacidade:</label> 
						<input type="range" name="field-opacity" id="field-opacity" max="1" min="0" value="0.7" step="0.1">
					</div>

					<div>
						<label for="field-bgcolor"><a href="https://www.google.com.br/search?q=colorpicker" target="_blank">Cor de fundo:</a></label> 
						<input type="color" name="field-bgcolor" id="field-bgcolor" value="#000000">
					</div>

					<div>
						<label for="field-color"><a href="https://www.google.com.br/search?q=colorpicker" target="_blank">Cor do texto:</a></label> 
						<input type="color" name="field-color" id="field-color" value="#FFFFFF">
					</div>

					<div>
						<label>Alinhamento:</label>
						<div>
							<label><input type="radio" name="field-align" value="left"> Esquerda</label>
							<label><input type="radio" name="field-align" value="center" checked> Centro</label>
							<label><input type="radio" name="field-align" value="right"> Direita</label>
						</div>
					</div>
					
					<div>
						<label>Posicionamento:</label>
						<div>
							<label><input type="radio" name="field-pos" value="top"> Em cima</label>
							<label><input type="radio" name="field-pos" value="center" checked> Centro</label>
							<label><input type="radio" name="field-pos" value="bottom"> Embaixo</label>
						</div>
					</div>
					<div class="full">
						<label for="field-image">Selecione a imagem:</label>
						<input type="file" name="field-image" id="field-image">
					</div>
					<div>
						<label for="field-blur">Desfoque:</label>
						<input type="range" id="field-blur" name="field-blur" max="8" min="0" value="0">
					</div>
					<div>
						<label for="field-rotate">Rotacionar imagem:</label>
						<input type="range" id="field-rotate" name="field-rotate" max="270" min="0" value="0" step="90">
					</div>
				</form>
				<div class="button download">
					<a href="#" data-vars-c="generator-download" data-vars-a="minha-imagem"><span>Clique aqui</span> para salvar a imagem!</a>
				</div>
			</div>
			<div class="template-post-info">
				<amp-ad width="300" height="600" type="adsense" data-ad-client="ca-pub-0364553986220758" data-ad-slot="1074951221"></amp-ad>
			</div>
		</div>
	</article>
</div>
<?php } ?>
<link href="<?php echo get_template_directory_uri(); ?>/css/generator.css?v7" rel="stylesheet">
<script src="<?php echo get_template_directory_uri(); ?>/js/generator.js?v7"></script>
<?php get_footer(); ?>