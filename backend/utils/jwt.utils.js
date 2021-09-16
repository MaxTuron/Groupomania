// Imports
const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'CLESECRETAMODIF';

// Exports functions
module.exports = {
    generateToken: function(user) {
        return jwt.sign({
                userId: user.id,
                admin: user.admin,
                name: user.name,
                lastName: user.lastName
            },
            JWT_SIGN_SECRET,
            { expiresIn: '4h' }
        )
    },

    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ','') : null;
    },

    getUserId: function(authorization) {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try{
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                    userId = jwtToken.userId;
            } catch(err) {
                console.log('Impossible de vérifier le token')
            }
        } else {
            console.log("Le token n'est pas défini")
        }
        return userId;
    },

    getUserAdmin: function(authorization) {
        let admin = false;
        const token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try{
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                    admin = jwtToken.admin;
            } catch(err) {
                console.log('Impossible de vérifier le token')
            }
        } else {
            console.log("Le token n'est pas défini")
        }
        return admin;
    },

    getUserName: function(authorization) {
        let name = false;
        const token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try{
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                    name = jwtToken.name;
            } catch(err) {
                console.log('Impossible de vérifier le token')
            }
        } else {
            console.log("Le token n'est pas défini")
        }
        return name;
    },

    getUserLastName: function(authorization) {
        let lastName = false;
        const token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try{
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                    lastName = jwtToken.lastName;
            } catch(err) {
                console.log('Impossible de vérifier le token')
            }
        } else {
            console.log("Le token n'est pas défini")
        }
        return lastName;
    }
}