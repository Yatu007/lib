create database if not exists lib
default character set utf8
collate utf8_general_ci;

use lib;

create table admin(
	id int primary key auto_increment,
	uname varchar(30) unique key not null,
	passwd char(32) not null
);

create table news(
	id int primary key auto_increment,
	isAvailable tinyint(1) default 1 not null,
	title varchar(100) not null,
	content text not null,
	count int default 0,
	time timestamp default current_timestamp
);

create table type(
	id int primary key auto_increment,
	isAvailable tinyint(1) default 1 not null,
	name varchar(50) not null,
	time timestamp default current_timestamp
);

create table publisher(
	id int primary key auto_increment,
	isAvailable tinyint(1) default 1 not null,
	name varchar(50) not null,
	time timestamp default current_timestamp
);

create table book(
	id int primary key auto_increment,
	isAvailable tinyint(1) default 1 not null,
	title varchar(50) not null,
	cover varchar(30) not null default 'default.jpg',
	author varchar(50) not null,
	isbn char(17) not null,
	publisher_id int default null,
	type_id int default null,
	pubdate varchar(10) default '未知',
	description varchar(200) default '无',
	price float default 0,
	count int default 0,
	time timestamp default current_timestamp,
	foreign key(type_id) references type(id),
	foreign key(publisher_id) references publisher(id)
);

create table search(
	id int primary key auto_increment,
	keyword varchar(200) not null,
	time timestamp default current_timestamp
);

create table request(
	id int primary key auto_increment,
	ip varchar(15) not null,
	user_agent varchar(200) not null,
	method varchar(5) not null,
	uri varchar(500) not null,
	time timestamp default current_timestamp
);

create table login(
	id int primary key auto_increment,
	uid int,
	ip varchar(15) not null,
	time timestamp default current_timestamp,
	foreign key(uid) references admin(id)
);
