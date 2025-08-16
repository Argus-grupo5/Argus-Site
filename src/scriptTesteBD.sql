create database Banco_Teste;
use Banco_Teste;

create table usuarios(
id int primary key auto_increment,
nome varchar(256),
-- Maximo de caracteres que um email pode ter pelo google
email varchar(256),
senha char(8)
);

insert into usuarios (nome, email, senha) 
values
('t', 't', 'senha123');

select * from usuarios;

/* Fiz este script para testar cadastro */