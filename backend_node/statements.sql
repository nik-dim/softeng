create table test.blog
(
  id      int auto_increment
    primary key,
  title   varchar(45)  null,
  content varchar(255) null
);

create table test.product
(
  id          bigint(100) auto_increment,
  name        varchar(100) not null,
  description varchar(300) not null,
  category    varchar(20)  not null,
  withdrawn   tinyint(1)   not null,
  tag_id      bigint       null,
  constraint id
    unique (id),
  constraint name
    unique (name)
);

alter table test.product
  add primary key (id);

create table test.shop
(
  id        bigint(100) auto_increment,
  name      varchar(100) not null,
  address   varchar(100) not null,
  lng       double       not null,
  lat       double       not null,
  withdrawn tinyint(1)   not null,
  brand     varchar(100) null,
  constraint address
    unique (address),
  constraint id
    unique (id),
  constraint name
    unique (name)
);

alter table test.shop
  add primary key (id);

create table test.tag
(
  id    bigint(100) auto_increment
    primary key,
  value varchar(45) not null
);

create table test.product_tag
(
  product_id bigint(100) not null,
  tag_id     bigint(100) not null,
  primary key (product_id, tag_id),
  constraint p_id
    foreign key (product_id) references product (id)
      on update cascade on delete cascade,
  constraint t_id
    foreign key (tag_id) references tag (id)
      on update cascade on delete cascade
);

create index p_id_idx
  on test.product_tag (product_id);

create index t_id_idx
  on test.product_tag (tag_id);

create table test.shop_tag
(
  shop_id bigint(100) not null,
  tag_id  bigint(100) not null,
  primary key (shop_id, tag_id),
  constraint s_id
    foreign key (shop_id) references shop (id)
      on update cascade on delete cascade,
  constraint tt_id
    foreign key (tag_id) references tag (id)
      on update cascade on delete cascade
);

create index s_id_idx
  on test.shop_tag (shop_id);

create index tt_id_idx
  on test.shop_tag (tag_id);

create table test.volunteer
(
  id          bigint(100) auto_increment,
  username    varchar(20) not null,
  firstname   varchar(20) not null,
  lastname    varchar(20) not null,
  phone       varchar(10) not null,
  email       varchar(45) not null,
  dateofbirth date        not null,
  dateofreg   datetime    not null,
  constraint email
    unique (email),
  constraint id_UNIQUE
    unique (id),
  constraint username
    unique (username)
);

alter table test.volunteer
  add primary key (id);

create table test.price
(
  product_id   bigint(100) not null,
  shop_id      bigint(100) not null,
  volunteer_id bigint(100) not null,
  value        double      not null,
  timestamp    datetime    not null,
  primary key (product_id, shop_id, volunteer_id, timestamp),
  constraint pp_id
    foreign key (product_id) references product (id)
      on update cascade on delete cascade,
  constraint ss_id
    foreign key (shop_id) references shop (id)
      on update cascade on delete cascade,
  constraint vv_id
    foreign key (volunteer_id) references volunteer (id)
      on update cascade on delete cascade
);

create index shop_id_idx
  on test.price (shop_id);

create index timestamp_idx
  on test.price (timestamp);

create index volunteer_id_idx
  on test.price (volunteer_id);

