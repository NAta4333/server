<?php
// �������� ������ �� POST
$username = $_POST['username'] ?? '';
$password = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT);
$email = $_POST['email'] ?? '';
$hwid = $_POST['hwid'] ?? '';
$discord = $_POST['discord'] ?? '';
$telegram = $_POST['telegram'] ?? '';
// ��������� � �� (������)
// ... ��� ��� ...
echo json_encode(['success'=>true]);
