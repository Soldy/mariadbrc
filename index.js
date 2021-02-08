/*
 *  @Soldy\mariadbrc\2021.02.08\GPL3 ;
 */
'use strict';
const mariadb = require('mariadb');
const setupBase = (require('setuprc')).setupBase;


/*
 * @param {object} 
 * @prototype
 */
exports.mariadbrc = function(settings){
    /*
     * @param {object} settings
     * @public
     * @return {boolean}
     */
    this.setConfig = function (settings){
        return setup.setup(settings);
    };
    /*
     * @public
     * @return {object}
     */
    this.connect=async function(){
        return await connect();
    };
    /*
     * @public
     * @return {boolean}
     */
    this.disconnect= async function(){

    };
    /*
     * @param {string}
     * @param {array}
     * @public
     * @return {object}
     */
    this.functionQuery= async function(func, varArray){
        return await this.qf(func, varArray);
    };
    /*
     * @param {string}
     * @param {array}
     * @public
     * @return {object}
     */
    this.qf = async function(func, varArray){
        varArray = rubishCleaner(varArray);
        return await connection.query(
            'SELECT `'+func+'`('+prepare(varArray)+') AS `id`;'
        );
    };
    /*
     * @param {string}
     * @param {array}
     * @public
     * @return {array}
     */
    this.procedureQuery= async function(procedure, varArray){
        return await this.qp(procedure, varArray);
    };
    /*
     * @param {string}
     * @param {array}
     * @public
     * @return {arrayt}
     */
    this.qp = async function(procedure, varArray){
        varArray = rubishCleaner(varArray);
        return await connection.query(
            'CALL `'+procedure+'`('+prepare(varArray)+');'
        );
    };
    /*
     * @private
     * @var {{}}
     */
    let connection = '';
    /*
     * @private
     */
    let pool = async function(){
        return false;
    };
    /*
     * setup  helper
     * @private
     */
    const setup = new setupBase({
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
    /*
     * @private
     * @return {object}
     */
    const connect=async function(){
        pool = await mariadb.createPool({
            host            : setup.get(
                'host')+':'+setup.get('port'
            ),
            user            : setup.get('user'),
            password        : setup.get('password'),
            database        : setup.get('database'),
            connectionLimit : 5
        });
        return connection = await pool.getConnection();
    };
    /*
     * @param {array} 
     * @private
     * @return {array}
     */
    const rubishCleaner=function(varArray){ // only temp. sloution
        let map = {
            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            '\'':'&apos;',
            '"':'&quot;'
        };
        for (let i in varArray)
            varArray[i] = varArray[i].toString().replace(
                /[&<>"']/g, 
                function(m) { 
                    return map[m]; 
                });
        return varArray;
    };
    /*
     * @param {object} 
     * @private
     * @return {string}
     */
    const prepare = function (varArray){
        let out = '';
        let s = 0;
        for (let i in varArray){
            if(s>0)
                out+=', ';
            out += '\''+varArray[i]+'\'';
            s++;
        }
        return out;

    };
    /*
     * @param {object} settings
     * @private
     * @return {boolean}
     */
    const setConfig = function (settings){
        if(typeof settings === 'undefined')
            return false;
        setup.setup(settings);
        return true;
    };
    // constructor
    setConfig(settings);
};

