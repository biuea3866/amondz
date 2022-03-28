import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, CreateDateColumn } from "typeorm";
import { Like } from "./like";
import { Info } from "./info";
import { Image } from "./image";

@Entity({ name: "products" })
class Product {
    constructor() {}

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "int" })
    origin_price: number;

    @Column({ type: "int" })
    earnable_point_percent: number;

    @Column({ type: "varchar" })
    option: string;

    @Column({ type: "varchar" })
    content: string;

    @Column({ type: "varchar" })
    brand: string;

    @Column({ type: "boolean" })
    is_today_delivery: boolean;

    @CreateDateColumn({ default: () => "NOW()" })
    created_at: Date

    @OneToMany(
        () => Like, 
        (like) => like.product, { 
            cascade: ['insert', 'update', 'remove']
        }
    )
    likes: Like[];

    @OneToOne(
        () => Info, 
        (info) => info.product, {
            cascade: ['insert', 'update', 'remove']
        }
    )
    info: Info

    @OneToMany(
        () => Image, 
        (image) => image.product, {
            cascade: ['insert', 'update', 'remove']            
        }
    )
    images: Image[];
    
    public setId(id: number): Product {
        this.id = id;

        return;
    }

    public setName(name: string): Product {
        this.name = name;

        return this;
    }

    public setOriginPrice(originPrice: number): Product {
        this.origin_price = originPrice;

        return this;
    }

    public setEarnablePointPercent(earnablePointPercent: number): Product {
        this.earnable_point_percent = earnablePointPercent;

        return this;
    }

    public setOption(option: string): Product {
        this.option = option;

        return this;
    }

    public setContent(content: string): Product {
        this.content = content;

        return this;
    }

    public setBrand(brand: string): Product {
        this.brand = brand;

        return this;
    }

    public setIsTodayDelivery(isTodayDelivery: boolean): Product {
        this.is_today_delivery = isTodayDelivery;

        return this;
    }

    public setCreatedAt(createdAt: Date): Product {
        this.created_at = createdAt;

        return this;
    }

    public setLike(likes: Like[]): Product {
        this.likes = likes

        return this;
    }

    public setImage(images: Image[]): Product {
        this.images = images;

        return this;
    }

    public setInfo(info: Info): Product {
        this.info = info;

        return this;
    }
};

export { Product };