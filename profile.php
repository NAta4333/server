<?php
// ѕолучить токен из заголовка/POST
// Ќайти пользовател€ по токену, вернуть данные
header('Content-Type: application/json');
echo json_encode([
  'username'=>'Demo',
  'email'=>'demo@mail.com',
  'hwid'=>'HWID123',
  'discord'=>'Demo#1234',
  'telegram'=>'@demo'
]);
