<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset="UTF-8">
	<title>Receitas</title>
	<link rel="stylesheet" href="bootstrap.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<main>
		<header class="header">
			<div class="container">
				<h1 class="logo">
					<a href="#"><i class="glyphicon glyphicon-cutlery"></i> de.receitas</a>
				</h1>
			</div>
		</header>

		<div class="banner banner728x90">
			<div><img src="http://dummyimage.com/728x90" alt="banner" height="90"></div>
		</div>

		<div class="container">
			<div class="clearfix row">
				<section class="thumbnail ranking col-sm-12">
					<h2 class="separator">
						<span>+ vistas da semana</span>
					</h2>

					<ul class="clearfix row">
						<?php for($x = 1; $x < 10; $x++) { ?>
						<li class="col-xs-12 col-sm-<?php echo $x == 1 || $x == 2 || $x == 3 ? '4' : '4'; ?> col-md-<?php echo $x == 1 || $x == 2 || $x == 3 ? '4' : '2'; ?>">
							<a href="#">
								<figure>
									<img src="http://img.itdg.com.br/tdg/images/recipes/000/143/700/166417/166417_original.jpg?mode=crop&width=365&height=200" alt="crédito" width="100%">

									<figcaption class="tag"><?php echo $x; ?>º</figcaption>
								</figure>
								<div class="thumbnail-text">
									<h3>Bolo de aveia com granola</h3>
									
									<span class="rating">
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
									</span>

									<time>
										<i class="glyphicon glyphicon-time"></i> 45 minutos
									</time>
								</div>
							</a>
						</li>
						<?php } ?>
					</ul>
				</section>
			</div>
		</div>

		<div class="container">
			<div class="clearfix row">
				<section class="thumbnail col-sm-12">
					<h2 class="separator">
						<span>Categoria</span>
					</h2>

					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quis, fugit voluptates libero eveniet! Eaque, tenetur reprehenderit facere sed odio distinctio nemo. Mollitia tenetur dolorem, ut! Nisi sapiente dolores, nihil quas accusamus recusandae, perspiciatis nemo quam excepturi doloribus reprehenderit nesciunt assumenda neque vero qui deserunt rerum. Optio, veritatis officiis ab!</p>

					<ul class="clearfix row">
						<?php 
							for($x = 0; $x < 16; $x++) { 
								$featured = $x%8 == 0 || $x%8 == 1; 

								if($x%8 == 2) {
						?>
							<li class="col-xs-12 col-sm-4 banner banner300x250">
								<div><img src="http://dummyimage.com/300x250" alt="banner" height="250"></div>
							</li>
						<?php
								}
						?>
						<li class="col-xs-12 col-sm-4">
							<a href="#">
								<figure>
									<img src="http://img.itdg.com.br/tdg/images/recipes/000/143/700/166417/166417_original.jpg?mode=crop&width=365&height=200" alt="crédito" width="100%">

									<figcaption class="tag">por cláudio junior melo</figcaption>
								</figure>
								<div class="thumbnail-text">
									<h3>Bolo de aveia com granola</h3>
									
									<span class="rating">
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
										<i class="glyphicon glyphicon-star"></i> 
									</span>

									<time>
										<i class="glyphicon glyphicon-time"></i> 45 minutos
									</time>
								</div>
							</a>
						</li>
						<?php } ?>
					</ul>
				</section>
			</div>
		</div>

		<div class="container">
			<section class="thumbnail">
				<h2 class="separator">
					<span>doces e sobremesas</span>
					<small>(10 receitas)</small>
				</h2>

				<ul class="clearfix row">
					<?php for($x = 0; $x < 4; $x++) { ?>
					<li class="col-xs-12 col-sm-3">
						<a href="#">
							<figure>
								<img src="http://img.itdg.com.br/tdg/images/recipes/000/143/700/166417/166417_original.jpg?mode=crop&width=365&height=200" alt="crédito" width="100%">

								<figcaption class="tag">por Cláudio Júnior melo</figcaption>
							</figure>
							<div class="thumbnail-text">
								<h3>Bolo de aveia com granola</h3>
								
								<span class="rating">
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
								</span>

								<time>
									<i class="glyphicon glyphicon-time"></i> 45 minutos
								</time>
							</div>
						</a>
					</li>


					<?php } ?>
				</ul>

				<a href="#" class="more">ver todos <i class="glyphicon glyphicon-menu-right"></i></a>
			</section>
		</div>

		<div class="banner banner728x90">
			<div><img src="http://dummyimage.com/728x90" alt="banner" height="90"></div>
		</div>

		<div class="container">
			<section class="thumbnail">
				<h2 class="separator">
					<span>doces e sobremesas</span>
					<small>(10 receitas)</small>
				</h2>

				<ul class="clearfix row">
					<?php for($x = 0; $x < 8; $x++) { ?>
					<li class="col-xs-12 col-sm-3">
						<a href="#">
							<figure>
								<img src="http://img.itdg.com.br/tdg/images/recipes/000/143/700/166417/166417_original.jpg?mode=crop&width=365&height=200" alt="crédito" width="100%">

								<figcaption class="tag">por Cláudio Júnior melo</figcaption>
							</figure>
							<div class="thumbnail-text">
								<h3>Bolo de aveia com granola</h3>
								
								<span class="rating">
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
								</span>

								<time>
									<i class="glyphicon glyphicon-time"></i> 45 minutos
								</time>
							</div>
						</a>
					</li>
					<?php } ?>
				</ul>

				<a href="#" class="more">ver todos <i class="glyphicon glyphicon-menu-right"></i></a>
			</section>
		</div>


		<div class="container">
			<section class="thumbnail">
				<h2 class="separator">
					<span>doces e sobremesas</span>
					<small>(10 receitas)</small>
				</h2>

				<ul class="clearfix row">
					<?php for($x = 0; $x < 9; $x++) { ?>
					<li class="col-xs-12 col-sm-4 row">
						<a href="#">
							<figure class="col-sm-6">
								<img src="http://img.itdg.com.br/tdg/images/recipes/000/143/700/166417/166417_original.jpg?mode=crop&width=365&height=200" alt="crédito" width="100%">

								<figcaption class="tag">por Cláudio Júnior melo</figcaption>
							</figure>
							<div class="thumbnail-text">
								<h3>Bolo de aveia com granola</h3>
								
								<span class="rating">
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
									<i class="glyphicon glyphicon-star"></i> 
								</span>

								<time>
									<i class="glyphicon glyphicon-time"></i> 45 minutos
								</time>
							</div>
						</a>
					</li>
					<?php } ?>
				</ul>

				<a href="#" class="more">ver todos <i class="glyphicon glyphicon-menu-right"></i></a>
			</section>
		</div>

		<footer>
			<p>2014-2015 © de.receitas</p>
		</footer>
	</main>
</body>
</html>