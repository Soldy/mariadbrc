const mariadb = require('mariadb');


exports.mariadbrc = function(){
    this.rubishCleaner=function(varArray){ // only temp. sloution
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
    this.prepare = function (varArray){
        let out = "";
        let s = 0;
        for (let i in varArray){
            if(s>0)
                out+=", "
            out += "'"+varArray[i]+"'";
            s++;
        }
        return out;

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
        return await connection.query(
            "SELECT `"+func+"`("+this.prepare(varArray)+") AS `id`;"
        );
    }
    this.procedureQuery= async function(procedure, varArray){
        return await this.qp(procedure, varArray);
    }
    this.qp = async function(procedure, varArray){
        varArray = this.rubishCleaner(varArray);
        return await connection.query(
            "CALL `"+procedure+"`("+this.prepare(varArray)+");"
        );
    }
    let status      = 0;
    let connection = "";
    let pool = async function(){
        return false;
    }
    let config = {
        host            : 'localhost',
        user            : 'soldy',
        password        : 'asdasd',
        database        : 'topSecret',
        connectionLimit : 5
    }

}

