import { v4 as uuidv4 } from 'uuid';

// this is our "database"
let users = [];

// database model should be like this
/* 
    {
        "firstName": "Jennie",
        "lastName": "Kim",
        "age": 19,
        "email": "jenniekim@gmail.com",
        "id": "0a57b828-9764-4cf4-b50f-504df469a1cd"
    }
*/

export const getUsers = (req, res) => {
    res.send(users);
};

export const createUser = (req, res) => {
    const user = req.body;
    // we use an spread operator to add the id property
    const userWithId = { ...user, id: uuidv4() };
    users.push(userWithId);
    res.send(`User ${user.firstName} ${user.lastName} added successfully`);
};

export const getUserById = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    // the filter function deletes those who returned false
    users = users.filter((user) => user.id !== id);
    res.send(`User with the id: ${id} deleted`);
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, email } = req.body;
    const user = users.find((user) => user.id === id);

    if(firstName)
    {
        user.firstName = firstName;
    }
    if(lastName)
    {
        user.lastName = lastName;
    }
    if(age)
    {
        user.age = age;
    }
    if(email)
    {
        user.email = email;
    }

    res.send(`User with the id: ${id} updated`);
};

