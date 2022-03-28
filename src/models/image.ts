import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity({ name: "product_images" })
class Image {
    constructor() {}

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    origin_name: string;

    @Column({ type: "varchar" })
    destination: string;

    @Column({ type: "varchar" })
    filename: string;

    @Column({ type: "varchar" })
    path: string;

    @Column({ type: "int" })
    size: number;

    @ManyToOne(
        () => Product, 
        (product) => product.images, { 
            onDelete: 'CASCADE',
        }
    )
    @JoinColumn({ name: "product_id" })
    product: Product;

    public setOriginName(originName: string): Image {
        this.origin_name = originName;

        return this;
    }

    public setDestination(destination: string): Image {
        this.destination = destination;

        return this;
    }

    public setFilename(filename: string): Image {
        this.filename = filename;

        return this;
    }

    public setPath(path: string): Image {
        this.path = path;

        return this;
    }

    public setSize(size: number): Image {
        this.size = size;

        return this;
    }
}

export { Image };