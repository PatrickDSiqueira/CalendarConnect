import {
    Model,
    Column,
    DataType,
    CreatedAt,
    UpdatedAt,
} from "sequelize-typescript";

export default class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })

    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
    })
    declare google_id: string;

    @Column({
        type: DataType.STRING,
    })
    declare picture: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}