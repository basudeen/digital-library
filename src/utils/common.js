const dayjs = require('dayjs');1

// convert date format 
const formated_date = async (date) => {
 return dayjs(date).format("DD-MM-YYYY");
}
module.exports=formated_date;