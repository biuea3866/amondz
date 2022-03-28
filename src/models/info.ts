import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity({ name: "product_info" })
class Info {
    constructor() {}

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    category: string;

    @Column({ type: "varchar" })
    base: string;

    @Column({ type: "varchar" })
    etc: string;

    @Column({ type: "varchar" })
    plated: string;

    @Column({ type: "varchar" })
    stone: string;

    @Column({ type: "varchar" })
    color_or_pattern: string;

    @Column({ type: "varchar" })
    size: string;

    @Column({ type: "varchar" })
    shape: string;

    @Column({ type: "varchar" })
    weight: string;

    @OneToOne(
        () => Product, 
        (product) => product.info, { 
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({ name: "product_id" })
    product: Product;

    public setCategory(category: string): Info {
        this.category = category;

        return this;
    }

    public setBase(base: string): Info {
        this.base = base;

        return this;
    }

    public setEtc(etc: string): Info {
        this.etc = etc;

        return this;
    }

    public setPlated(plated: string): Info {
        this.plated = plated;

        return this;
    }

    public setStone(stone: string): Info {
        this.stone = stone;

        return this;
    }

    public setColorOrPattern(colorOrPattern: string): Info {
        this.color_or_pattern = colorOrPattern;

        return this;
    }

    public setSize(size: string): Info {
        this.size = size;

        return this;
    }

    public setShape(shape: string): Info {
        this.shape = shape;

        return this;
    }

    public setWeight(weight: string): Info {
        this.weight = weight;

        return this;
    }
}

export { Info };