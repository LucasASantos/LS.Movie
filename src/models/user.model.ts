import { BaseModel } from "./base.model";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import * as Bcrypt from "bcryptjs";
import { Vote } from './vote.model';

export enum Roles {
    admin,
    user
}

@Entity('user')
export class User extends BaseModel {
    @Column('varchar', { name: 'name', nullable: false })
    name: string;

    @Column('varchar', { name: 'email', nullable: false })
    email: string;

    @Column('varchar', { name: 'password', nullable: false })
    password: string;

    @Column({
        type: "enum",
        enum: Roles,
        nullable: false,
        name: "role",
    })
    role: Roles;

    @OneToMany(type => Vote, vote => vote.user)
    votes:Promise<Vote[]>;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(): void {
        if (this.password) {
            this.password = Bcrypt.hashSync(this.password, Bcrypt.genSaltSync());
        }
    }

    static getHashPassword(password): string {
        return Bcrypt.hashSync(password, Bcrypt.genSaltSync());
    }

    validatePassword(requestPassword): boolean {
        return Bcrypt.compareSync(requestPassword, this.password);
    }

    constructor(init?: Partial<User>){
        super();
        Object.assign(this, init);
    }

}

