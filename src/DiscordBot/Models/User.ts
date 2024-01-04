import { DataTypes, Model } from 'sequelize'
import sequelize from '../Database'

class User extends Model {
	declare id: number
	declare discordID: BigInt
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		discordID: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			unique: true,
		},
	},
	{ tableName: 'users', sequelize }
)

// Better to use migration but i'm lazy
await User.sync({ alter: true })

export default User