import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Video } from "./video.entity"

@Entity({name: "categories", schema: "private"})
export class Category {

    @PrimaryGeneratedColumn({type: 'int'})
    category_id: number

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string

    @OneToMany(type => Video, video => video.category)
    videos: Video

    @CreateDateColumn()
    created_at: Date
}