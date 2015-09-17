create database if not exists lib
default character set utf8
collate utf8_general_ci;

use lib;

create table user(
	id int primary key auto_increment,
	isAvailable tinyint(1) not null default 1,
	uname varchar(30) unique key not null,
	passwd char(32) not null,
	sex tinyint(1) not null default 0,
	tel char(11) default null,
	email varchar(50) default null

);

create table admin(
	id int primary key auto_increment,
	uname varchar(30) unique key not null,
	passwd char(32) not null

);

create table news(
	id int primary key auto_increment,
	title varchar(100) not null,
	content text not null,
	time timestamp default current_timestamp,
	count int default 0

);

create table book(
	id int primary key auto_increment,
	title varchar(50) not null,
	author varchar(50) not null,
	isbn char(17) not null,
	coden varchar(20) not null,
	publisher varchar(50) default '未知',
	pubdate varchar(10) default '未知',
	description varchar(500) default '无',
	resource varchar(100) default null

);

create table search(
	id int primary key auto_increment,
	user_id int default null,
	type enum('title','author','isbn','coden','publisher') default 'title',
	keyword varchar(100) not null,
	time timestamp default current_timestamp,
	foreign key(user_id) references user(id)

);

create table click(
	id int primary key auto_increment,
	user_id int default null,
	book_id int default null,
	time timestamp default current_timestamp,
	foreign key(user_id) references user(id),
	foreign key(book_id) references book(id)

);

create table favorite(
	id int primary key auto_increment,
	isAvailable tinyint(1) default 1 not null,
	user_id int default null,
	book_id int default null,
	time timestamp default current_timestamp,
	foreign key(user_id) references user(id),
	foreign key(book_id) references book(id)

);

create table comment(
	id int primary key auto_increment,
	isAvailable tinyint(1) default 0 not null,
	user_id int default null,
	book_id int default null,
	content varchar(500) not null,
	rank tinyint(1) default 5 not null,
	time timestamp default current_timestamp,
	foreign key(user_id) references user(id),
	foreign key(book_id) references book(id)

);

create table request(
	id int primary key auto_increment,
	user_id int default null,
	ip varchar(15) not null,
	user_agent varchar(200) not null,
	method varchar(5) not null,
	url varchar(500) not null,
	time timestamp default current_timestamp,
	foreign key(user_id) references user(id)

);

create table login(
	id int primary key auto_increment,
	uname varchar(30) not null,
	ip varchar(15) not null,
	time timestamp default current_timestamp

);
