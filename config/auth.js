// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '489337121260525', // your App ID
        'clientSecret'    : '1c9e1c9820ab7ddee00f2eb773254677', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.7/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'pGSmP9DrIttVgU9a26vpgWdyg',
        'consumerSecret'     : '9BzMqujWqLiuK8xViXbVd6NClDN5i1gcOtK1ZLgJZgND7w3NkG',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here',
        'clientSecret'     : 'your-client-secret-here',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    },
	  'jwtAuth': {
			'secretOrKey'     : 'DanhNgonSangNgoi',
			'issuer'          : 'dangthedoan@gmail.com',
			'audience'        : 'ngontu.com'
		}

};
