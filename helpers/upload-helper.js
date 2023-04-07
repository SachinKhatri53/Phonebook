const path = require('path');
module.exports ={
    uploadDir: path.join(__dirname, '../public/uploads'),
    
    isEmpty: function(obj){
        if (obj === undefined || obj === null) {
            return true;
        }
        else if(Object.keys(obj).length === 0){
            return true;
        }
        else{
            return false;
        }
    }
}