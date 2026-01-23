<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome     = strip_tags(trim($_POST["nome"]));
    $empresa  = strip_tags(trim($_POST["empresa"]));
    $telefone = strip_tags(trim($_POST["telefone"]));
    $mensagem = strip_tags(trim($_POST["mensagem"]));

    // Email que vai receber
    $para = "contato@turnone.com.br";

    // Assunto
    $assunto = "Novo Contato - Site Turn One";

    // Corpo do email
    $corpo = "
    Nome: $nome \n
    Empresa: $empresa \n
    Telefone: $telefone \n
    Mensagem: \n
    $mensagem
    ";

    // Cabeçalhos
    $headers = "From: site@turnone.com.br\r\n";
    $headers .= "Reply-To: $para\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Envio
    if (mail($para, $assunto, $corpo, $headers)) {
        header("Location: obrigado.html");
        exit();
    } else {
        echo "Erro ao enviar mensagem.";
    }
}
