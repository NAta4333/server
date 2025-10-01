<?php
// Получить данные из POST
$username = $_POST['username'] ?? '';
$password = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);
$email = $_POST['email'] ?? '';
$hwid = $_POST['hwid'] ?? '';
$discord = $_POST['discord'] ?? '';
$telegram = $_POST['telegram'] ?? '';
// Сохранить в БД (пример)
// ... ваш код ...
echo json_encode(['success'=>true]);
