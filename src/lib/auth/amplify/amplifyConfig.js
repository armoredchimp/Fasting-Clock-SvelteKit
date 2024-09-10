// import { cognitoData } from "../aws/amplify";
// import { Amplify } from "aws-amplify";
const userPoolId = process.env.USER_POOL_ID
const userPoolClientId = process.env.USER_POOL_CLIENT_ID

const amplifyConfig = {
	Auth: {
		Cognito: {
			userPoolId: userPoolId,
			userPoolClientId: userPoolClientId,
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
