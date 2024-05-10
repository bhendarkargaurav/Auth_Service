// const { where } = require('sequelize');
const  ValidationError  = require('../utils/validation-error');
const { User, Role} = require('../models/index');

class UserRepository {

    async create(data) {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        if(error.name = 'SequelizeValidationError') {
            throw new ValidationError(error);
        }
        console.log("Something went wrong in the repository layer");
        throw error;
    }
}

async destroy(userId) {
    try {
        await User.destroy({
            where: {
                id: userId
            }    
        });
        return true;
    } catch (error) {
        console.log("something went wrong in the repository layer");
        throw error;
    }
  }

  async getById(userId) {
    try {
        const user = await User.findByPk(userId, {
            attributes: ['email', 'id' ]
        });
        return user;
    } catch (error) {
        console.log("Something went wrong in the repository layer");
        throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
        const user = await User.findOne({where: {
            email: userEmail
        }});
        return user;
    } catch (error) { 
        console.log("something went wrong in password comparison");
        throw error;
    }
}

//this will tell us whether the user is admin or not

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            console.log(adminRole, user);
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw error;
        }
    }

   }

module.exports = UserRepository;