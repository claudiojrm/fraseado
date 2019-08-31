<?php include_once('header.php'); ?>
	<div class="container">
		<div class="clearfix row">
			<section class="thumbnail col-sm-12">
				<h2 class="separator">
					<span>destaques</span>
				</h2>

				<ul class="clearfix row">
					<?php foreach($recipes as $x=>$recipe) { ?>
					<?php if($x > 2) break; ?>
					<li class="col-xs-12 col-sm-4">
						<a href="post.php?recipe=<?php echo $x; ?>">
							<figure>
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

							<div class="share">
								<a href="#"></a>
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
			<section class="thumbnail ranking col-sm-12">
				<h2 class="separator">
					<span>+ vistas da semana</span>
				</h2>

				<ul class="clearfix row">
					<?php 
						$_recipes = $recipes;
						shuffle($recipes);
						foreach($recipes as $x=>$recipe) { 
					?>
					<li class="col-xs-12 col-sm-<?php echo $x < 2 ? '6' : '3'; ?> col-md-<?php echo $x < 4 ? '3' : '2'; ?>">
						<a href="post.php?recipe=<?php echo $x; ?>">
							<figure>
								<img src="<?php echo $recipe->image; ?>" alt="crédito" width="100%">

								<figcaption class="tag"><?php echo $x+1; ?>º</figcaption>
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
			</section>
		</div>
	</div>
	
	<div class="banner">
		<div class="adsgoogle b728x90" data-show="w" data-ad-name="Fraseado - 728x90 (1)" data-ad-slot="1182274421" data-ad-size="728x90"></div>
		<div class="adsgoogle b320x100" data-show="m" data-ad-name="Fraseado - 320x100 (1)" data-ad-slot="7089207222" data-ad-size="320x100"></div>				
	</div>


	<div class="container">
		<section class="thumbnail">
			<h2 class="separator">
				<span>comidas e bebidas</span>
				<small>(6 receitas)</small>
			</h2>

			<ul class="clearfix row">
				<?php $recipes = $_recipes; ?>
				<?php foreach(array_slice($recipes, 0, 6) as $x=>$recipe) { ?>
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
<?php include_once('footer.php'); ?>