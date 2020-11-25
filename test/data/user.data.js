// users_model for test
const users_model = {
    firstName: 'Jennie',
    lastName: 'Kim',
    age: 24,
    email: 'jenniekim@gmail.com',
    id: '0a57b828-9764-4cf4-b50f-504df469a1cd'
}

const post_user_data = {
    firstName: "Ryu", 
    lastName: "Jin", 
    age: 19,
    email: "ryujin@gmail.com"
};

const post_invalid_parameter = {
    firstNam: "Ryu", 
    lastNam: "Jin", 
    ag: 19, 
    emai: "ryujin@gmail.com"
};

export { users_model, post_user_data, post_invalid_parameter };