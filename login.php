<?php
// �������� ������ �� POST
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
// ��������� � ��, �������� password_verify
// ... ��� ��� ...
echo json_encode(['success'=>true, 'token'=>'demoToken']);
