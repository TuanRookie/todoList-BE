import pool from "../configs/connectDB";
import bcrypt from "bcrypt"
const saltRounds = 10;
import mysql from "mysql";

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jdbc_demo'
});

const register = async (req, res) => {
    let { name, email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                return res.error(err);
            }
            if (result.length > 0) {
                res.send({ message: "Tai khoan da ton tai!" });
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    pool.execute("INSERT INTO users (name, password,email) VALUES (?,?,?)",
                        [name, hash, email],
                        (err, result) => {
                            console.log(err);
                        }
                    );
                });
            }
        }
    );
}

const loginAuth = async (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;
    db.query(
        "SELECT * FROM users WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                return res.error(err);
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log("session", req.session.user)
                        return res.status(200).json({ status: 'success' })
                    } else {
                        res.send({ message: "Wrong username/password combination!" });
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    );
}


module.exports = {
    register, loginAuth, login
}