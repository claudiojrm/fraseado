<?php
// array dos dados
$dados['data'] = array();

// array de estados
$dados['states'] = array(
    'acre' => 'ac',
    'amapa' => 'ap',
    'amazonas' => 'am',
    'bahia' => 'ba',
    'ceara' => 'ce',
    'distrito-federal' => 'df',
    'espirito-santo' => 'es',
    'goias' => 'go',
    'maranhao' => 'ma',
    'mato-grosso' => 'mt',
    'mato-grosso-do-sul' => 'ms',
    'minas-gerais' => 'mg',
    'para' => 'pa',
    'paraiba' => 'pb',
    'parana' => 'pr',
    'pernambuco' => 'pe',
    'piaui' => 'pi',
    'rio-de-janeiro' => 'rj',
    'rio-grande-do-norte' => 'rn',
    'rio-grande-do-sul' => 'rs',
    'rondonia' => 'ro',
    'roraima' => 'rr',
    'santa-catarina' => 'sc',
    'sao-paulo' => 'sp',
    'sergipe' => 'se',
    'tocantins' => 'to'
);

// json open
$data = json_decode(file_get_contents('planilha.json'), true);

$x = 0;
foreach ($data as $item) {
    if($x > 100) {
        $item['title'] = $item['Denominacao'];
        $item['city'] = $item['Cidade'];
        $item['state'] = $item['UF'];
        $item['desc'] = ''.
                        $item['Endereco'].' - '.$item['Bairro'].' <br> '.
                        $item['city'].' - '.$item['state'].' - '.$item['CEP'].' <br>'.
                        'Fone: '.$item['Fone'].' <br>'.
                        $item['E-MailCONC'].' <br>'.
                        $item['Site'];
        
        $item['coord'] = getCoordinates($item['Endereco'].' '.$item['city'].' '.$item['Bairro'].' '.$item['state']);

        if(empty($item['coord'][0]) || empty($item['coord'][1])) {
            $item['coord'] = getCoordinates($item['city'].' '.$item['Bairro'].' '.$item['state']);
        }

        if(empty($item['coord'][0]) || empty($item['coord'][1])) {
            $item['coord'] = getCoordinates($item['city'].' '.$item['state']);
        }
        
        unset($item['RazaoSocial']);
        unset($item['Fone']);
        unset($item['E-MailDCBR']);
        unset($item['E-MailCONC']);
        unset($item['Site']);
        unset($item['Site_Guide']);
        unset($item['CEP']);
        unset($item['Endereco']);
        unset($item['Bairro']);
        unset($item['Vendas']);
        unset($item['Servicos']);
        unset($item['Pecas']);
        unset($item['Caminhoes']);
        unset($item['Onibus']);
        unset($item['Van_Concessionário_Pleno']);
        unset($item['Van_Centro_Especializado']);
        unset($item['Van_Center']);
        unset($item['Center_Bus']);
        unset($item['Axor_Center']);
        unset($item['Sprinter']);
        unset($item['Cidade']);
        unset($item['UF']);
        unset($item['Denominacao']);
        
        array_push($dados['data'], $item);
    }
    $x++;
}

// cria o arquivo com os dados
$file = fopen("mconcessionarios$x.json", "w");
fwrite($file, json_encode($dados));
fclose($file);

// pega a coordenadas
function getCoordinates($address){ 
    $address = str_replace(" ", "+", $address);
    $url = "http://maps.google.com/maps/api/geocode/json?sensor=false&address=$address";
    $response = file_get_contents($url);
    $json = json_decode($response, TRUE);
    return array($json['results'][0]['geometry']['location']['lat'], $json['results'][0]['geometry']['location']['lng']);
}
?>