import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export class BaseModel extends BaseEntity{
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id : string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "update_at" })
    updateAt: Date;

    @Column("boolean", { name: "active", default: true })
    active: boolean;

}