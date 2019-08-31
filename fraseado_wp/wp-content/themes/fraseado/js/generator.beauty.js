if(document.querySelector('.generator')) {
	// evento para gerar a informação do canvas
	[].forEach.call(document.querySelector('.generator').querySelectorAll('input:not([type="text"]), select'), function(item) {
		item.addEventListener('change', generator);
	});

	// evento para gerar a informação do canvas
	[].forEach.call(document.querySelector('.generator').querySelectorAll('input[type="text"], textarea'), function(item) {
		item.addEventListener('blur', generator);
	});

	// cria as informações da imagem
	document.querySelector('[name="field-image"]').addEventListener('change', function(e) {
		// estância a classe que gerencia o upload da imagem
		var reader = new FileReader();
		
		// quando a imagem for carregada dispara um evento
		reader.onload = function(event) {
			// cria a imagem no DOM
			var img = new Image();
			img.src = event.target.result;
			img.className = 'canvas-image';
			document.body.appendChild(img);
			
			// gera as informações do canvas
			generator();
		};

		// gera o carregamento da imagem com base nas informações do campo file
		reader.readAsDataURL(e.target.files[0]);
	}, false);

	// proporção do canvas
	var proportion = 1.333;

	function generator() {
		// dispara um evento para cada alteração dos campos
		if(this.name) {
			typeof ga != 'undefined' && ga('send', 'event', 'generator-option-' + this.name, this.value || 'click');
		}

		// seta o elemento canvas
		var canvas = document.querySelector('canvas');

		// senão existir o canvas criar o elemento
		if(!canvas) {
			// criando o elemento canvas
			canvas = document.createElement('canvas');
			canvas.id = 'canvas';
			canvas.width = window.innerWidth;
			canvas.height = canvas.width / proportion;

			// evento para gerar as imagens
			canvas.addEventListener('click', generator);

			// adiciona o canvas no dom 
			document.querySelector('.generator').parentNode.insertBefore(canvas, document.querySelector('.generator').nextSibling);
		}

		// pegando o context do canvas para as interações
		var ctx = document.querySelector('canvas').getContext('2d');

		// verifica se existe alguma imagem para ser adicionada
		var image = document.querySelector('.canvas-image:last-of-type');
		
		if(image) {
			image.style.display = 'block';
			
			var rotate = (document.querySelector('[name="field-rotate"]').value / 90) % 2 == 0;
			canvas.width = rotate ? image.offsetWidth : image.offsetHeight;
			canvas.height = rotate ? image.offsetHeight : image.offsetWidth;
		}

		// remove as configurações do canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if(image) {
			// cria a imagem dentro do canvas 
			ctx.filter = 'blur(' + document.querySelector('[name="field-blur"]').value + 'px)';

			// coordinates			
			var x = canvas.width / 2;
			var y = canvas.height / 2;

			// rotaciona a imagem
			ctx.translate(x, y);
			ctx.rotate(document.querySelector('[name="field-rotate"]').value * Math.PI / 180);
			ctx.drawImage(image, -image.offsetWidth / 2, -image.offsetHeight / 2, image.offsetWidth, image.offsetHeight);	

			// reseta as informações para o estado inicial
			image.style.display = 'none';
			ctx.rotate(document.querySelector('[name="field-rotate"]').value * -Math.PI / 180);
			ctx.translate(-x, -y);
			ctx.filter = "blur(0)";
		}

		// cria uma layer sobre a imagem
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = document.querySelector('[name="field-opacity"]').value;
		ctx.fillStyle = document.querySelector('[name="field-bgcolor"]').value || '#000000';
		ctx.fill();
		
		// volta a opacidade ao estado original
		ctx.globalAlpha = 1;

		// tamanho da fonte
		var size = parseInt(document.querySelector('[name="field-text-size"]').value);

		// alinhamento
		var alignx = document.querySelector('[name="field-align"]:checked').value;
		var aligny = document.querySelector('[name="field-pos"]:checked').value;
		
		// define o alinhamento do texto
		ctx.textAlign = alignx;

		// valor do texto
		var lines = document.querySelector('textarea').value.split('\n');

		// define a posição do texto em relação ao canvas
		var padding = 20;
		var sizelines = (lines.length * size * proportion);

		alignx = alignx == 'center' ? canvas.width / 2 : (alignx == 'right' ? canvas.width - padding : padding);
		aligny = aligny == 'center' ? (canvas.height / 2 - sizelines / 2) : (aligny == 'bottom' ? canvas.height - proportion - 10 - padding - sizelines : padding);

		// define o tamanho da fonte e a fonte que será utilizada
		ctx.textBaseline = 'hanging';
		ctx.font = size * (proportion - 0.2) + 'px ' + document.querySelector('[name="field-text-name"]').value;
		ctx.fillStyle = document.querySelector('[name="field-color"]').value || '#FFFFFF';

		// escreve a informação do texto no canvas conforme o posicionamento
		for(var i = 0; i < lines.length; i++) {
			ctx.fillText(lines[i], alignx, aligny);
			aligny += size * proportion;
		}

		// assinatura
		ctx.textBaseline = 'bottom';
		ctx.font = (window.innerWidth < 769 ? 14 : 30) + 'px arial';
		ctx.textAlign = 'center';
		ctx.fillText('gerado por fraseado.com.br', canvas.width / 2, canvas.height - 10);

		// define as informações para download da imagem e exibe o botão
		var link = document.querySelector('.download a');
		link.href = canvas.toDataURL('image/jpeg', 60);
		link.download = 'minha-imagem';
		link.target = '_blank';
		link.setAttribute('data-vars-event-action', document.querySelector('textarea').value);
		link.parentNode.style.display = 'block';
	}
}
