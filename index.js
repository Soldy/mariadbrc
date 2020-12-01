
'use strict';
const mariadb = require('mariadb');
const setupBase = (require('setuprc')).setupBase;


exports.mariadbrc = function(settings){
    this.setConfig = function (settings){
        if(typeof settings !== 'undefined')
            setup.setup(settings);
        return true;
    }
    this.connect=async function(){
         pool = await mariadb.createPool({
             host            : setup.get('host')+':'+setup.get('port').
             user            : setup.get('user'),
             password        : setup.get('password'),
             database        : setup.get('database'),
             connectionLimit : 5
         });
         return connection = await pool.getConnection();
    }
    this.disconnect= async function(){

    },
    this.functionQuery= async function(func, varArray){
        return await this.qf(func, varArray);
    }
    this.qf = async function(func, varArray){
        varArray = rubishCleaner(varArray);
        return await connection.query(
            "SELECT `"+func+"`("+prepare(varArray)+") AS `id`;"
        );
    }
    this.procedureQuery= async function(procedure, varArray){
        return await this.qp(procedure, varArray);
    }
    this.qp = async function(procedure, varArray){
        varArray = rubishCleaner(varArray);
        return await connection.query(
            "CALL `"+procedure+"`("+prepare(varArray)+");"
        );
    }
    let rubishCleaner=function(varArray){ // only temp. sloution
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
    let prepare = function (varArray){
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
    let status      = 0;
    let connection = "";
    let pool = async function(){
        return false;
    }
    let config = {
        host            : 'localhost',
        user            : 'Soldy',
        password        : 'asdasd',
        database        : 'topSecret',
        connectionLimit : 5
    }

    /*
     * setup  helper
     * @private
     */
    let setup = new setupBase({
        'host':{
            'type'    : 'string',
            'default' : 'localhost'
        },
        'user':{
            'type'    : 'string',
            'default' : 'testUser'
        },
        'password':{
            'type'    : 'string',
            'default' : 'testPass'
        },
        'database':{
            'type'    : 'string',
            'default' : 'testiDB'
        },
        'port':{
            'type'    : 'eger',
            'default' : 3306
        }
    });
    if(typeof settings !== 'undefined')
        setup.setup(settings);
}

