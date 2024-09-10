// import { cognitoData } from "../aws/amplify";

const amplifyConfig = {
	Auth: {
		Cognito: {
			userPoolId: process.env.USER_POOL_ID,
			userPoolClientId: process.env.USER_POOL_CLIENT_ID,
			passwordFormat: {
				minLength: 8,
				requireLowercase: true,
				requireUppercase: true,
				requireNumbers: true,
				requireSpecialCharacters: true
			},
			username: 'true'
		}
	}
};

export default amplifyConfig;
