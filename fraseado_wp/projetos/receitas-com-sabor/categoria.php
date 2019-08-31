<?php include_once('header.php'); ?>

	<div class="container">
		<section class="thumbnail">
			<h2 class="separator">
				<span>Categoria</span>
			</h2>

			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quis, fugit voluptates libero eveniet! Eaque, tenetur reprehenderit facere sed odio distinctio nemo. Mollitia tenetur dolorem, ut! Nisi sapiente dolores, nihil quas accusamus recusandae, perspiciatis nemo quam excepturi doloribus reprehenderit nesciunt assumenda neque vero qui deserunt rerum. Optio, veritatis officiis ab!</p>

			<ul class="clearfix row">
				<?php 
					foreach(array_merge($recipes, $recipes, $recipes, $recipes) as $x=>$recipe) { 
						if($x == 2 || $x == 10) {
				?>
					<li class="col-xs-12 col-sm-4 banner banner300x250">
						<div><img src="http://dummyimage.com/300x250" alt="banner" height="250"></div>
					</li>
				<?php
						}
				?>
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
					</a>
				</li>
				<?php } ?>
			</ul>
		</section>
	</div>
<?php include_once('footer.php'); ?>