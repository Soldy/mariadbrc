const mariadb = require('mariadb');


exports.mariadbrc = function(){
    this.rubishCleaner(varArray){ // only temp. sloution
        var map = {
            "&":"&amp;",
            "<":"&lt;",
            ">":"&gt;",
            "'":"&apos;",
            '"':"&quot;"
        };
        for (let i in varArray)
            varArray[i] = varArray[i].toString().replace(
                /[&<>"']/g, 
                function(m) { 
                   return map[m]; 
            });
        return varArray;
    }
    this.setConfig = function (inputConfig){
        for (let i in inputConfig)
             if (typeof config[i] !== "undefined")
                 config[i] = inputConfig[i];
        return true;
    }
    this.connect=async function(){
         pool = await mariadb.createPool(config);
         return connection = await pool.getConnection();
    }
    this.disconnect= async function(){

    },
    this.functionQuery= async function(func, varArray){
        return await this.qf(func, varArray);
    }
    this.qf = async function(func, varArray){
        varArray = this.rubishCleaner(varArray);
        return await conection.query(
            "SELECT `"+func+"`('"+varArray+"') AS `id`;"
        );
    }
    this.procedureQuery= async function(procedure, varArray){
        return await this.qp(procedure, varArray);
    }
    this.qp = async function(procedure, varArray){
        varArray = this.rubishCleaner(varArray);
        return await conection.query(
            "CALL `"+procedure+"`('"+varArray+"') AS `id`;"
        );
    }
    let status      = 0;
    let connetction = "";
    let pool = async function(){
        return false;
    }
    let config = {
        host            : '127.0.0.1',
        user            : 'root',
        password        : '123456',
        database        : 'mails',
        connectionLimit : 5
    }

}

