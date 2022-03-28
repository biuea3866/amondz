CREATE DATABASE amondz;

use amondz;

create TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    origin_price INT NOT NULL,
    earnable_point_percent INT NOT NULL,
    option VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL,
    is_today_delivery TINYINT(1) NOT NULL
);

create TABLE product_likes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    is_like TINYINT(1) NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE
);

create TABLE product_info(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    base VARCHAR(100) NOT NULL,
    etc VARCHAR(100) NOT NULL,
    plated VARCHAR(100) NOT NULL,
    stone VARCHAR(100) NOT NULL,
    color_or_pattern VARCHAR(100) NOT NULL,
    size VARCHAR(100) NOT NULL,
    shape VARCHAR(100) NOT NULL,
    weight VARCHAR(100) NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE
);


create TABLE product_images(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    origin_name VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    filename VARCHAR(100) NOT NULL,
    path VARCHAR(100) NOT NULL,
    size INT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE
);