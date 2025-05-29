// const { where } = require('sequelize');
const  ValidationError  = require('../utils/validation-error');
const { User, Role} = require('../models/index');
const ClientError = require('../utils/client-error');
const { StatusCode, StatusCodes } = require('http-status-codes'); 

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
        if (!user) {
            throw new ClientError(
                'AttributeNotFound',
                'Invalid email sent in the request',
                'Please check the email, as there is no recourd of the email',
                StatusCodes.NOT_FOUND
            )
        }
        return user;
    } catch (error) { 
        console.log(error);
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