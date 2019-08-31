<?php include_once('header.php'); ?>
<?php $recipe = $recipes[empty($_GET['recipe']) ? 0 : $_GET['recipe']]; ?>	
	<article class="container post thumbnail clearfix">
		<h1 class="h2 separator">
			<span><?php echo $recipe->name; ?></span>
		</h1>
		
		<div class="row post-info">
			<figure class="col-sm-8 col-md-5">
				<img src="<?php echo $recipe->image; ?>" alt="crédito" width="100%">
			</figure>

			<div class="col-sm-4 col-md-3">
				<ul>
					<li>
						<b>Avaliação receita:</b>
						<span class="rating">
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
						</span>
					</li>
					<li>
						<b>Tempo de preparo:</b> 
						<span>
							<i class="glyphicon glyphicon-time"></i> <?php echo $recipe->time; ?>
						</span>
					</li>
					<li>
						<b>Calorias:</b> 
						<span><i class="glyphicon glyphicon-tint"></i> 100 kcal</span>
					</li>
					<li>
						<b>Rendimento:</b>
						<span>
							<i class="glyphicon glyphicon-cutlery"></i> 10 porções
						</span>
					</li>
				</ul>
			</div>
	
			<div class="col-sm-12 col-md-4 banner">
				<div class="adsgoogle b300x250" data-show="w|m" data-name="Fraseado - 300x250 (1)" data-ad-slot="9903072827" data-ad-size="300x250"></div>
			</div>
		</div>

		<section class="post-tbl">
			<h2>Ingredientes</h2>

			<h3>Massa</h3>
			<ul>
				<li><span>1 e ½ xícara (chá) de farinha de trigo</span></li>
				<li><span>1 xícara (chá) de leite</span></li>
				<li><span>2 ovos</span></li>
				<li><span>4 colheres (sopa) de óleo</span></li>
				<li><span>Sal a gosto</span></li>
			</ul>

			<h3>Recheio</h3>
			<ul>
				<li><span>1 e ½ xícara (chá) de farinha de trigo</span></li>
				<li><span>1 xícara (chá) de leite</span></li>
				<li><span>2 ovos</span></li>
				<li><span>4 colheres (sopa) de óleo</span></li>
				<li><span>Sal a gosto</span></li>
			</ul>
		</section>
		
		<section class="post-tbl">
			<h2>Modo de preparo</h2>
	
			<h3>Massa</h3>
			<ol>
				<li><span>Coloque no liquidificador: os ovos, o leite o e óleo, bata durante alguns minutos, acrescentando aos poucos a farinha de trigo</span></li>
				<li><span>Após colocar toda a farinha de trigo coloque sal a seu gosto</span></li>
				<li><span>A massa deve ficar pastosa não muito grossa</span></li>
				<li><span>Com um papel toalha espalhe óleo por toda a frigideira</span></li>
				<li><span>Se tiver uma frigideira antiaderente melhor</span></li>
				<li><span>Pegue uma concha (essas conchas de servir feijão) ela vai servir como medida</span></li>
				<li><span>Cada concha vai equivaler a uma panqueca</span></li>
				<li><span>Despeje no meio da frigideira e vá girando, espalhando a massa de uma forma uniforme por todo o fundo da frigideira</span></li>
			</ol>

			<h3>Recheio</h3>
			<ol>
				<li><span>Coloque no liquidificador: os ovos, o leite o e óleo, bata durante alguns minutos, acrescentando aos poucos a farinha de trigo</span></li>
				<li><span>Após colocar toda a farinha de trigo coloque sal a seu gosto</span></li>
				<li><span>A massa deve ficar pastosa não muito grossa</span></li>
				<li><span>Com um papel toalha espalhe óleo por toda a frigideira</span></li>
				<li><span>Se tiver uma frigideira antiaderente melhor</span></li>
				<li><span>Pegue uma concha (essas conchas de servir feijão) ela vai servir como medida</span></li>
				<li><span>Cada concha vai equivaler a uma panqueca</span></li>
				<li><span>Despeje no meio da frigideira e vá girando, espalhando a massa de uma forma uniforme por todo o fundo da frigideira</span></li>
			</ol>
		</section>

	</article>

	<div class="container">
		<section class="thumbnail">
			<h2 class="separator">
				<span>comidas e bebidas</span>
				<small>(6 receitas)</small>
			</h2>

			<ul class="clearfix row">
				<?php foreach(array_slice($recipes, 4, 10) as $x=>$recipe) { ?>
				<li class="col-xs-12 col-sm-6 col-md-4">
					<a href="post.php?recipe=<?php echo $x; ?>" class="row">
						<figure class="col-sm-6">
							<img src="<?php echo $recipe->image; ?>" alt="crédito" width="100%">

							<figcaption class="tag">por <?php echo $recipe->author; ?></figcaption>
						</figure>
						
						<div class="thumbnail-text">
							<h3><?php echo $recipe->name; ?></h3>
							
							<div class="rating">
								<i class="glyphicon glyphicon-star"></i> 
								<i class="glyphicon glyphicon-star"></i> 
								<i class="glyphicon glyphicon-star"></i> 
								<i class="glyphicon glyphicon-star"></i> 
								<i class="glyphicon glyphicon-star"></i> 
							</div>

							<time>
								<i class="glyphicon glyphicon-time"></i> <?php echo $recipe->time; ?>
							</time>
						</div>
					</a>
				</li>
				<?php } ?>
			</ul>

			<a href="categoria.php" class="more">ver todos <i class="glyphicon glyphicon-menu-right"></i></a>
		</section>
	</div>
	
	<?php $recipe = $recipes[$_GET['recipe']+1]; ?>
	<article class="container post thumbnail clearfix">
		<h1 class="h2 separator">
			<span><?php echo $recipe->name; ?></span>
		</h1>
		
		<div class="row post-info">
			<figure class="col-sm-8 col-md-5">
				<img src="<?php echo $recipe->image; ?>" alt="crédito" width="100%">
			</figure>

			<div class="col-sm-4 col-md-3">
				<ul>
					<li>
						<b>Avaliação receita:</b>
						<span class="rating">
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
							<i class="glyphicon glyphicon-star"></i> 
						</span>
					</li>
					<li>
						<b>Tempo de preparo:</b> 
						<span>
							<i class="glyphicon glyphicon-time"></i> <?php echo $recipe->time; ?>
						</span>
					</li>
					<li>
						<b>Calorias:</b> 
						<span><i class="glyphicon glyphicon-tint"></i> 100 kcal</span>
					</li>
					<li>
						<b>Rendimento:</b>
						<span>
							<i class="glyphicon glyphicon-cutlery"></i> 10 porções
						</span>
					</li>
				</ul>
			</div>

			<div class="col-sm-12 col-md-4 banner">
				<div class="adsgoogle b300x250" data-show="w|m" data-name="Fraseado - 300x250 (1)" data-ad-slot="9903072827" data-ad-size="300x250"></div>
			</div>
		</div>

		<section class="post-tbl">
			<h2>Ingredientes</h2>

			<h3>Massa</h3>
			<ul>
				<li><span>1 e ½ xícara (chá) de farinha de trigo</span></li>
				<li><span>1 xícara (chá) de leite</span></li>
				<li><span>2 ovos</span></li>
				<li><span>4 colheres (sopa) de óleo</span></li>
				<li><span>Sal a gosto</span></li>
			</ul>

			<h3>Recheio</h3>
			<ul>
				<li><span>1 e ½ xícara (chá) de farinha de trigo</span></li>
				<li><span>1 xícara (chá) de leite</span></li>
				<li><span>2 ovos</span></li>
				<li><span>4 colheres (sopa) de óleo</span></li>
				<li><span>Sal a gosto</span></li>
			</ul>
		</section>
		
		<section class="post-tbl">
			<h2>Modo de preparo</h2>

			<h3>Massa</h3>
			<ol>
				<li><span>Coloque no liquidificador: os ovos, o leite o e óleo, bata durante alguns minutos, acrescentando aos poucos a farinha de trigo</span></li>
				<li><span>Após colocar toda a farinha de trigo coloque sal a seu gosto</span></li>
				<li><span>A massa deve ficar pastosa não muito grossa</span></li>
				<li><span>Com um papel toalha espalhe óleo por toda a frigideira</span></li>
				<li><span>Se tiver uma frigideira antiaderente melhor</span></li>
				<li><span>Pegue uma concha (essas conchas de servir feijão) ela vai servir como medida</span></li>
				<li><span>Cada concha vai equivaler a uma panqueca</span></li>
				<li><span>Despeje no meio da frigideira e vá girando, espalhando a massa de uma forma uniforme por todo o fundo da frigideira</span></li>
			</ol>

			<h3>Recheio</h3>
			<ol>
				<li><span>Coloque no liquidificador: os ovos, o leite o e óleo, bata durante alguns minutos, acrescentando aos poucos a farinha de trigo</span></li>
				<li><span>Após colocar toda a farinha de trigo coloque sal a seu gosto</span></li>
				<li><span>A massa deve ficar pastosa não muito grossa</span></li>
				<li><span>Com um papel toalha espalhe óleo por toda a frigideira</span></li>
				<li><span>Se tiver uma frigideira antiaderente melhor</span></li>
				<li><span>Pegue uma concha (essas conchas de servir feijão) ela vai servir como medida</span></li>
				<li><span>Cada concha vai equivaler a uma panqueca</span></li>
				<li><span>Despeje no meio da frigideira e vá girando, espalhando a massa de uma forma uniforme por todo o fundo da frigideira</span></li>
			</ol>
		</section>

	</article>
<?php include_once('footer.php'); ?>