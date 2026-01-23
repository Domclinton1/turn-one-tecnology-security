<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $empresa = $_POST['empresa'];
  $telefone = $_POST['telefone'];
  $mensagem = $_POST['mensagem'];

  $mail = new PHPMailer(true);

  try {

    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;

    require 'config.php';

    $mail->Username = EMAIL_USER;
    $mail->Password = EMAIL_PASS;


    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('comercial@turnone.com.br', 'Turn One');
    $mail->addAddress('comercial@turnone.com.br');

    $mail->addReplyTo($email, $nome);

    $mail->isHTML(true);
    $mail->Subject = 'Novo Lead - Site';

    $mail->Body = "
      <h2>Novo Lead</h2>
      <p><b>Nome:</b> $nome</p>
      <p><b>Email:</b> $email</p>
      <p><b>Empresa:</b> $empresa</p>
      <p><b>Telefone:</b> $telefone</p>
      <p><b>Mensagem:</b><br>$mensagem</p>
    ";

    $mail->send();

   $mail->send();

// Redireciona para página de obrigado
header("Location: obrigado.html");
exit;


  } catch (Exception $e) {
    echo "Erro: " . $mail->ErrorInfo;
  }

}
