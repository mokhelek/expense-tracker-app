
CREATE TABLE expense (  
    id serial primary key,
    expense text not null,
    amount numeric(8,2) not null,
    total numeric(8,2) not null,
    category_id int not null,
    foreign key (category_id) references category(id)
);

CREATE TABLE category (
    id serial primary key,
    category_type text NOT NULL
);