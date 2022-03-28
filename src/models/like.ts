import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity({ name: "product_likes" })
class Like {
    constructor() {}

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    user_id: string;

    @Column({ type: "boolean" })
    is_like: boolean;

    @ManyToOne(
        () => Product, 
        (product) => product.likes, { 
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({ name: "product_id" })
    product: Product;
    @Column()
    product_id: number;

    public setId(id: number): Like {
        this.id = id;

        return;
    }

    public setUserId(userId: string): Like {
        this.user_id = userId;

        return this;
    }

    public setIsLike(isLike: boolean): Like {
        this.is_like = isLike;

        return this;
    }

    public setProductId(productId: number): Like {
        this.product_id = productId;

        return this;
    }
}

export { Like };