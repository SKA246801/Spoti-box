const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');



class User extends Model {}
User.init({
    id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Datatypes.STRING,
        allowNull: false
    },
    email: {
        type: Datatypes.STRING,
        allowNull: false
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    }
},
    {
        // hooks: {
        //     // set up beforeCreate lifecycle "hook" functionality
        //     async beforeCreate(newUserData) {
        //         newUserData.password = await bcrypt.hash(newUserData.password, 10);
        //         return newUserData;
        //     },

        //     async beforeUpdate(updatedUserData) {
        //         updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        //         return updatedUserData;
        //     }
        // },

        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'user'
    })


module.exports = User;