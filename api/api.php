<?php
header('Access-Control-Allow-Origin: *');
header("Acess-Control-Allow-Credencials: true");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, X-Requested-With, enctype, Content-Description");
header("Content-Type: application/json; charset=utf-8");

include "lib/DB.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['action'] == 'add') {

    $query = mysqli_query($mysqli, "INSERT INTO costumers SET
    name_customer = '$postjson[name_customer]',
    desc_customer = '$postjson[desc_customer]',
    address = '$postjson[address]',
    email = '$postjson[email]',
    phone = '$postjson[phone]',
    gender = '$postjson[gender]'
    ");

    $idcust = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success'=>true, 'customerid'=>$idcust));
    else $result = json_encode(array('success'=>false));
    echo $result;

} else if($postjson['action'] == 'getdata') {
    $data = array();
    $query = mysqli_query($mysqli, "select * from costumers ORDER BY id DESC LIMIT $postjson[start], $postjson[limit]");
    while($row = mysqli_fetch_array($query)) {
        $data[] = array(
            'id' => $row['id'],
            'name_customer' => $row['name_customer'],
            'desc_customer' => $row['desc_customer'],
            'address' => $row['address'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'gender' => $row['gender'],
            'created_at' => $row['created_at']
        );
    }
    if($query)$result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));
    echo $result;

} else if($postjson['action'] == 'update') {

    $query = mysqli_query($mysqli, "UPDATE `costumers` SET `name_customer` = 
    '$postjson[name_customer]', `desc_customer` = '$postjson[desc_customer]' 
    , `address` = '$postjson[address]',
    `email` = '$postjson[email]', 
    `phone` = '$postjson[phone]',
    `gender` = '$postjson[gender]'
    WHERE `costumers`.`id` = '$postjson[id]';");

    $idcust = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
    else $result = json_encode(array('success'=>false,  'result'=>'error'));

    echo $result;
}else if($postjson['action'] == 'delete') {

    $query = mysqli_query($mysqli, "DELETE FROM costumers WHERE `costumers`.`id` = '$postjson[id]';");

    $idcust = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
    else $result = json_encode(array('success'=>false,  'result'=>'error'));

    echo $result;
}else if($postjson['action'] == 'register') {

    $query = mysqli_query($mysqli, "INSERT INTO users SET
    username = '$postjson[username]',
    password = '$postjson[password]',
    email = '$postjson[email]',
    status = 1
    ");

    $idcust = mysqli_insert_id($mysqli);

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Alguma coisa não correu bem. Tente de novo.'));
    echo $result;
}else if($postjson['action'] == 'login') {

    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE username = '$postjson[username]' AND password = '$postjson[password]'");

    $check = mysqli_num_rows($query);

    if($check>0) {
        $data = mysqli_fetch_array($query);
        $datauser = array(
            'userId' => $data['userId'],
            'username' => $data['username'],
            'password' => $data['password'],
            'email' => $data['email'],
        );

        if($data['status'] == 1) {
            $result = json_encode(array('success'=>true, 'result'=>$datauser));
        } else {
            $result = json_encode(array('success'=>false, 'msg'=>'Conta inactiva'));
        }
    } else {
        $result = json_encode(array('success'=>false, 'msg'=>'Usuário não encontrado.'));
    }
    echo $result;
}