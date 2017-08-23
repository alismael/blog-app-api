var mysql = require('mysql');
import { config } from './../config/config';

class CreateBlogDb {
    
    // Run migration when declearing CreateDb class
    constructor () {
        var con = mysql.createConnection({
            host: config.host,
            user: config.mysql.username,
            password: config.mysql.password
        });
        
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query("CREATE DATABASE blog", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });
        });
    }

}

new CreateBlogDb();