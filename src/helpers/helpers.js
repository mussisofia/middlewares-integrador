const fs = require('fs');
const path = require('path');
const usersPath = path.resolve(__dirname, '../database/users.json');

const helper = {
    getAllUsers(){
    const jsonUsers = fs.readFileSync(usersPath, 'utf-8');
    const usersParsed = JSON.parse(jsonUsers);
    return usersParsed;
  },

writeUsers(arrayToTransform){
    const usersJson = JSON.stringify(arrayToTransform, null, " ");
    fs.writeFileSync(usersPath, usersJson);
},

generateNewId(){
    const users = helper.getAllUsers();
    if (users.length == 0) {
        return 1;
    }
    return users.pop().id + 1;
}
}

module.exports = helper;