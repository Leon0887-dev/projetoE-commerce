DROP DATABASE IF EXISTS cafehouse_db;

-- Cria banco de dados
CREATE DATABASE cafehouse_db;

-- Seleciona banco de  dados para uso
USE cafehouse_db;

-- Cria tabela de usuário admin
CREATE TABLE admin_users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    active TINYINT NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Cria tabela de usuário
CREATE TABLE users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    birthdate DATE,
    phone VARCHAR(15),
    cpf VARCHAR(14),
    active TINYINT NOT NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Cria tabela de endereços
CREATE TABLE user_addresses (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    recipient VARCHAR(100),
    address_nickname VARCHAR(100),
    zipcode VARCHAR(9) NOT NULL,
    address VARCHAR(150) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(60),
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    reference VARCHAR(150),
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Cria tabela de imagens de usuários
CREATE TABLE images_users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    created_at DATETIME,
    updated_at DATETIME,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Cria tabela de marcas
CREATE TABLE brands (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    admin_user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);

-- Cria tabela de categorias
CREATE TABLE categories (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    admin_user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);

-- Cria tabela de produtos
CREATE TABLE products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    flavor VARCHAR(60) NOT NULL,
    roast VARCHAR(30) NOT NULL,
    description TEXT(400) NOT NULL,
    content VARCHAR(150) NOT NULL,
    format VARCHAR(45) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    installment INT UNSIGNED NOT NULL,
    sku VARCHAR(45) NOT NULL,
    quantity INT NOT NULL,
    active TINYINT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    brand_id INT UNSIGNED NOT NULL,
    admin_user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brands(id),
    FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);

-- Tabela intermediária de categorias e produtos
CREATE TABLE categories_products(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  category_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Cria tabela de imagens de produtos
CREATE TABLE images_products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    created_at DATETIME,
    updated_at DATETIME,
    admin_user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
);

-- Cria tabela intermediária de imagens e produtos
CREATE TABLE products_images (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    image_product_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (image_product_id) REFERENCES images_products(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Cria tabela de pedidos
CREATE TABLE orders (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(45) NOT NULL,
    total_price INT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    user_id INT UNSIGNED NOT NULL,
    user_address_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (user_address_id) REFERENCES user_addresses(id)
);

-- Cria tabela intermediária de pedidos e produtos
CREATE TABLE orders_products (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    quantity INT NULL,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insere dados em admin_users
INSERT INTO admin_users (first_name, last_name, email, password, active, created_at, updated_at)
VALUES 
	("Ligia", "Pretel Eimantas", "ligia@email.com", "123", "1", "2022-09-07 21:29:00", "2022-09-07 15:01:00"),
	("Bruno", "Sanches", "bruno@email.com", "123", "1", "2022-09-07 21:29:00", "2022-09-07 15:01:00");
    
-- Insere dados em users
INSERT INTO users (first_name, last_name, email, password, birthdate, phone, cpf, active, created_at, updated_at)
VALUES 
	("Ana", "Silva Soares", "ana@email.com", "123", "2000-03-25", "(11)99758-4142", "111.222.555-88", "1", "2022-09-07 15:00:00", "2022-09-07 15:00:00"),
	("Alan", "Souza", "alan@email.com", "123", "1970-05-12", "(41)97241-2035", "333.444.555-99", "1", "2022-09-07 15:00:00", "2022-09-07 15:00:00");
    
-- Insere dados em user_addresses
INSERT INTO user_addresses (recipient, address_nickname, zipcode, address, number, complement, district, city, state, reference, user_id)
VALUES 
	("Ana Silva Soares", "Casa", "03233-200", "Rua das Samambaias", "23", "Casa dos fundos", "Santa Paula", "São Caetano do Sul", "São Paulo", "Portão vermelho", 1 ),
	("Alan Souza", "Trabalho", "05502-020", "Av. Vital Brasil", "1510", "Offices Tower - Cj. 31", "Cruzeiro", "Curitiba", "Paraná", "Próximo ao Clube", 2 );
    
-- Insere dados em images_users
INSERT INTO images_users (name, created_at, updated_at, user_id)
VALUES 
	("img_perfil01.jpg", "2022-09-07 15:00:00", "2022-09-07 15:00:00", 1 ),
	("img_perfil02.jpg", "2022-09-07 15:00:00", "2022-09-07 15:00:00", 2 );
    
-- Insere dados em brands
INSERT INTO brands (name, admin_user_id)
VALUES 
	("Bravo Café", 1 ),
	("Butti Coffee", 2 ),
    ("Três Corações", 2 ),
    ("Pilão", 2 ),
    ("Orfeu", 1 ),
    ("Coffee++", 1 );   
    
-- Insere dados em categories
INSERT INTO categories (name, admin_user_id)
VALUES 
	("Grãos", 1 ),
	("Moídos", 2 ),
    ("Cápsulas", 2 ),
    ("Sachês", 2 );
    
-- Insere dados em products
INSERT INTO products (name, flavor, roast, description, content, format, price, installment, sku, quantity, active, created_at, updated_at, brand_id, admin_user_id)
VALUES 
	("Café em Grãos - Cooffe++", "Notas florais, mel e rapadura", "Média", "O resultado deste café é uma bebida encorpada, de sabor adocicado, com notas de chocolate e frutas amarelas e de aroma intenso. Além disso, sua acidez proporciona um sabor de longa duração.", "1 embalagem de 250g de café extraforte em grãos", "Grãos torrados", 29.90, 2, "COF5800", 14, "1", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 6, 1),
    ("Café em Grãos - Cooffe++", "Frutas cítricas e mel", "Escura", "O resultado deste café é uma bebida encorpada, de sabor adocicado, com notas de chocolate e frutas amarelas e de aroma intenso. Além disso, sua acidez proporciona um sabor de longa duração.", "1 embalagem de 500g de café em grãos", "Grãos torrados", 39.90, 2, "COF4800", 10, "1", "2022-09-02 15:00:00", "2022-09-02 15:00:00", 6, 1),
    ("Café em Cápsula - Três Corações", "Cítrico", "Média", "O Café Filtrado TRES 3 Corações é o tradicional café brasileiro filtrado da 3 Corações agora, na versão cápsula da TRES®. Super prático para quem vive na correria e não abre mão de qualidade e do sabor de um bom café filtrado no dia a dia. Um café que marca memória, com sabor cítrico, corpo médio e alta acidez.", "1 Cartucho com 10 Cápsulas de 7,5g cada", "Cápsulas de alumínio", 19.90, 1, "CAP3200", 40, "1", "2022-09-03 15:00:00", "2022-09-03 15:00:00", 3, 2),
    ("Café em Cápsula Gourmet - Três Corações", "Frutado, caramelo e chocolate", "Média", "O Café Filtrado Gourmet em cápsula TRES 3 Corações com origem do Cerrado Mineiro e da Mogiana Paulista é cultivado entre 800 e 1.000 metros de altitude. Este café filtrado em cápsula apresenta baixa acidez e sabores frutados, de caramelo e chocolate. Conheça este blend perfeito para os apreciadores de cafés filtrados suaves e aromáticos. ", "1 Cartucho com 10 Cápsulas de 7,5g cada", "Cápsulas de alumínio", 16.90, 1, "CAP3500", 60, "1", "2022-09-04 15:00:00", "2022-09-04 15:00:00", 3, 2),
    ("Café com Leite em Sachê - Bravo", "Frutado, caramelo e chocolate", "Média", "O Café Filtrado Gourmet em cápsula TRES 3 Corações com origem do Cerrado Mineiro e da Mogiana Paulista é cultivado entre 800 e 1.000 metros de altitude. Este café filtrado em sachê apresenta baixa acidez e sabores frutados, de caramelo e chocolate. ", "10 sachês com 20g cada", "Sachês", 15.90, 1, "SACH2100", 32, "1", "2022-08-05 15:00:00", "2022-08-05 15:00:00", 1, 2),
    ("Cappucino Classic - Butti", "Cacau e canela", "Clara", "A linha de Cappuccinos Sachês é mais uma facilidade para você, que adora aproveitar os sabores da vida. Possui embalagens práticas, perfeitas para preparar a qualquer hora e lugar. Embalado em Sachês com 20g. Classic – Elaborado à base de café, leite, cacau e canela. Seu sabor, textura aveludada e cremosidade, distinguem-no dos demais.", "10 sachês com 20g cada", "Sachês", 22.90, 1, "SACH270000", 50, "1", "2022-07-05 15:00:00", "2022-07-05 15:00:00", 2, 2),
	("Café Torrado e Moído - Orfeu", "Nozes e caramelo", "Média", "O resultado é um café que além de possuir sabores e aromas marcantes, também se diferencia pelo propósito de difundir boas práticas em toda a sua cadeia produtiva. Produzido para os apaixonados por cafés especiais!", "1 embalagem de 250g de café extraforte moído", "Torrado e moído", 25.90, 1, "COM7712", 47, "1", "2022-08-06 15:00:00", "2022-08-06 15:00:00", 5, 2),
    ("Café Torrado e Moído - Orfeu", "Frutas cítricas", "Média", "O resultado é um café que além de possuir sabores e aromas marcantes, também se diferencia pelo propósito de difundir boas práticas em toda a sua cadeia produtiva. Produzido para os apaixonados por cafés especiais!", "1 embalagem de 250g de café extraforte moído", "Torrado e moído", 35.90, 1, "COM0258", 12, "1", "2022-08-08 15:00:00", "2022-08-08 15:00:00", 5, 2);
    
-- Insere dados em categories_products
INSERT INTO categories_products (category_id, product_id)
VALUES 
	(1, 1 ),
	(1, 2 ),
    (3, 3 ),
    (3, 4 ),
    (4, 5 ),
    (4, 6 ),
    (2, 7 ),
    (2, 8 );
    
-- Insere dados em images_products
INSERT INTO images_products (name, created_at, updated_at, admin_user_id)
VALUES 
	("img_produto.jpg", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 1),
	("img_produto2.jpg", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 1),
    ("1660949507034capsula_cafe05.jpg", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 2),
    ("1660067991337capsula_cafe04.png", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 2),
    ("img_produto3.jpg", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 2),
    ("img_produto4.jpg", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 2),
    ("img_produto5.jpg", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 2),
    ("img_produto6.jpg", "2022-09-01 15:00:00", "2022-09-01 15:00:00", 2);

-- Insere dados em products_images - Tabela intermediária
INSERT INTO products_images (image_product_id, product_id)
VALUES 
	(1, 1 ),
	(2, 2 ),
    (3, 3 ),
    (4, 4 ),
    (5, 5 ),
    (6, 6 ),
    (7, 7 ),
    (8, 8 );
    
-- Insere dados em orders
INSERT INTO orders (status, total_price, created_at, updated_at, user_id, user_address_id)
VALUES 
	("Em processamento", 89.90, "2022-09-07 15:00:00", "2022-09-07 15:00:00", 1, 1 ),
    ("Entregue", 29.90, "2022-08-07 15:00:00", "2022-08-07 15:00:00", 1, 1 ),
    ("Em processamento", 59.90, "2022-09-05 15:00:00", "2022-09-05 15:00:00", 2, 2 ),
    ("Entregue", 109.90, "2022-06-07 15:00:00", "2022-06-07 15:00:00", 2, 2 );
    
-- Insere dados em orders_products
INSERT INTO orders_products (quantity, order_id, product_id)
VALUES 
	(2, 1, 1),
    (1, 1, 3),
    (1, 2, 5),
    (2, 3, 2),
    (1, 4, 6),
    (1, 4, 7),
    (1, 4, 8);