<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $nome = $_POST['nome'];
  $empresa = $_POST['empresa'];
  $telefone = $_POST['telefone'];
  $mensagem = $_POST['mensagem'];

  $mail = new PHPMailer(true);

  try {

    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;

    $mail->Username = 'comercial@turnone.com.br'; // email da empresa
    $mail->Password = 'SENHA_DO_EMAIL';         // senha

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Remetente
    $mail->setFrom('comercial@turnone.com.br', 'Turn One');

    // Destino
    $mail->addAddress('comercial@turnone.com.br');

    // Responder para o cliente
    $mail->addReplyTo($_POST['email'] ?? '', $nome);

    // Conteúdo
    $mail->isHTML(true);
    $mail->Subject = 'Novo contato pelo site';

    $mail->Body = "

    <h2>Novo Lead - Turn One</h2>

    <p><strong>Nome:</strong> $nome</p>
    <p><strong>Empresa:</strong> $empresa</p>
    <p><strong>Telefone:</strong> $telefone</p>

    <p><strong>Mensagem:</strong><br>$mensagem</p>

    ";

    $mail->AltBody = "
Nome: $nome
Empresa: $empresa
Telefone: $telefone

Mensagem:
$mensagem
    ";

    $mail->send();

    echo "ok";

  } catch (Exception $e) {

    echo "Erro: {$mail->ErrorInfo}";

  }
}
