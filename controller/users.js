import { v4 as uuidv4 } from 'uuid';

// this is our "database"
let users = [
    {
        firstName: "Jennie",
        lastName: "Kim",
        age: 24,
        email: "jenniekim@gmail.com",
        id: "0a57b828-9764-4cf4-b50f-504df469a1cd"
    },
    {
        firstName: "Yeji",
        lastName: "Hwuang",
        age: 19,
        email: "yejihwang@gmail.com",
        id: "9764-0a57b828-4cf4-b50f-504df469a1cd"
    }
];

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

export const createUser = async (req, res) => {
    try {
        if(Object.keys(req.body).toString() === "firstName,lastName,age,email") {
            const user = req.body;
            // we use an spread operator to add the id property
            const userWithId = { ...user, id: uuidv4() };
            users.push(userWithId);
            res.send(`User ${user.firstName} ${user.lastName} added successfully`);
        } else {
            throw '403';
        }
    } catch (err) {
        res.sendStatus(403);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = users.find((user) => user.id === id);
        if(foundUser != undefined){
            res.send(foundUser);
        } else {
            throw '404';
        }
    } catch (err) {
        res.sendStatus(404);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = users.find((user) => user.id === id);
        if(foundUser != undefined){
            // the filter function deletes those who returned false
            users = users.filter((user) => user.id !== id);
            res.send(`User with the id: ${id} deleted`);
        } else {
            throw '404';
        }
    } catch (err) {
        res.sendStatus(404);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, age, email } = req.body;
        const user = users.find((user) => user.id === id);
        if(user != undefined){
            if(firstName){
                user.firstName = firstName;
            }
            if(lastName){
                user.lastName = lastName;
            }
            if(age){
                user.age = age;
            }
            if(email){
                user.email = email;
            }
            res.send(`User with the id: ${id} updated`);
        } else {
            throw '404';
        }
    } catch (err) {
        res.sendStatus(404);
    }
};
