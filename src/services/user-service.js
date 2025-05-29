const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const { ValidationError } = require('sequelize');
// const { use } = require('../routes');

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }
    async create(data) {
        try {
            const user = await this.UserRepository.create(data);
            return user;
        } catch (error) {
            if(error.name = 'SequelizeValidationError') {
                throw error;
            }
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // step 1 -> fetch the user using the email
            const user = await this.UserRepository.getByEmail(email);
            // step 2-> comapare incomming plain password with store encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'incorrect Password'};
            }
            // step 3-> if password match then creaqte a tolen and send it to the user 

            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
            
        } catch (error) {
            if(error.name = 'AttributeNotFound') {
                 throw error;
            }
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'invalid Token'}
            }
            const user = await this.UserRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exist'}
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw error;  
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: "1d"});
            return result;
        } catch (error) {
            console.log("something went wrong in the token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wron in the token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something went wrong in password comparison");
            throw error;
        }
    }

     isAdmin(userId) {
        try {
            return this.UserRepository.isAdmin(userId);
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
     }
}

module.exports = UserService;