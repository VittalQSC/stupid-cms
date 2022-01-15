import { envelop, getDocumentClient, getTableName, tokenSecret } from "./Util";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const usersTable = getTableName('users');

export async function create(event) {
    const body = JSON.parse(event.body);

    if (!body.user) {
        return envelop('User must be specified', 422)
    }

    const newUser = body.user;

    if (!newUser.username) {
        return envelop('Username must be specified.', 422);
    }
    if (!newUser.email) {
        return envelop('Email must be specified.', 422);
    }
    if (!newUser.password) {
        return envelop('Password must be specified.', 422);
    }


    // Add new entry to usersTable
    const encryptedPassword = bcrypt.hashSync(newUser.password, 5);
    const DocumentClient = getDocumentClient();

    if (!DocumentClient) {
        return envelop('db not available', 500);
    }

    await DocumentClient.put({
      TableName: usersTable,
      Item: {
        username: newUser.username,
        email: newUser.email,
        password: encryptedPassword,
      },
    }).promise();

    return envelop({
        user: {
            email: newUser.email,
            token: mintToken(newUser.username),
            username: newUser.username,
        }
    })
}

async function authenticateAndGetUser(event) {
    try {
      const token = getTokenFromEvent(event);
      const decoded = jwt.verify(token, tokenSecret);
      const username = decoded.username;
      const authenticatedUser = await getUserByUsername(username);
      if (!authenticatedUser) { return null; }
      return authenticatedUser.Item;
    } catch (err) {
      return null;
    }
  }

export async function get(event) {
    const authenticatedUser = await authenticateAndGetUser(event);
    if (!authenticatedUser) {
      return envelop('Token not present or invalid.', 422);
    }
    return envelop({
      user: {
        email: authenticatedUser.email,
        token: getTokenFromEvent(event),
        username: authenticatedUser.username,
      }
    });
}

export async function login(event) {
    const body = JSON.parse(event.body);
    const user = body.user;

    const userWithThisEmail = await getUserByEmail(user.email);

    if (!userWithThisEmail) { return envelop('User not found in DB.', 422); }

    if (!userWithThisEmail.Items || !userWithThisEmail.Items[0]) {
      return envelop('User not found in DB.', 422);
    }

    // Attempt to match password
    if (!bcrypt.compareSync(user.password,
        userWithThisEmail.Items[0].password)) {
      return envelop('Wrong password.', 422);
    }

    const authenticatedUser = {
        email: user.email,
        token: mintToken(userWithThisEmail.Items[0].username),
        username: userWithThisEmail.Items[0].username,
      };
    return envelop({ user: authenticatedUser });
}


function getTokenFromEvent(event) {
  return event.headers.Authorization.replace('Bearer ', '').replace('Token ', '');
}

function getUserByUsername(aUsername) {
    const client = getDocumentClient();
    if (!client) {
        return;
    }
    return client.get({
      TableName: usersTable,
      Key: {
        username: aUsername,
      },
    }).promise();
  }

function mintToken(aUsername) {
    return jwt.sign({ username: aUsername },
        tokenSecret, { expiresIn: '2 days' });
}

function getUserByEmail(aEmail) {
  const client = getDocumentClient();
  if (!client) { return null; }

  return client.query({
    TableName: usersTable,
    IndexName: 'email',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': aEmail,
    },
    Select: 'ALL_ATTRIBUTES',
  }).promise();
}