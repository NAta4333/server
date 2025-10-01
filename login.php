<?php
// Получить данные из POST
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
// Проверить в БД, сравнить password_verify
// ... ваш код ...
echo json_encode(['success'=>true, 'token'=>'demoToken']);
