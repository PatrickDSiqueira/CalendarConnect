import User from "../database/models/User";

export default class UserRepository {

    static async findOrCreateByEmail(data: any) {

        let user = await User.findOne({
            where: {email: data.email}
        });

        if (user) {

            return user;
        }

        return this.create(data);
    }

    static async create({name, email, picture, id}: any) {

        return await User.create({
            name,
            email,
            picture,
            google_id: id,
        });
    }
}