create database Banco_Teste;
use Banco_Teste;

create table usuarios(
id int primary key auto_increment,
nome varchar(70),
email varchar(70),
senha char(8)
);

insert into usuarios (nome, email, senha) 
values
('t', 't', 'senha123');

select * from usuarios;

/* Fiz este script para testar cadastro */