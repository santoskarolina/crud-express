import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Category } from "./category.entity"

@Entity({name: "video", schema: "private"})
export class Video {

    @PrimaryGeneratedColumn({type: 'int'})
    video_id: number

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string

    @Column({ type: 'varchar',  nullable: false })
    duration: number

    @ManyToOne(type => Category, category => category.category_id)
    @JoinColumn({name: "category_id"})
    category: Category

    @CreateDateColumn()
    created_at: Date
}