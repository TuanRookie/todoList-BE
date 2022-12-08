import pool from "../configs/connectDB";

let allBook = async (req, res) => {
    let data = [];
    const [rows, fields] = await pool.execute('SELECT * FROM `book`');
    return res.json({
        data: rows
    })
}

let createNewBook = async (req, res) => {
    let { title, author, describes, category, releaseDate, number } = req.body;
    // let { img } = req.file.filename.img;
    // console.log("check", img);
    await pool.execute('insert into book(title, author, describes, category,releaseDate,number) values(?,?,?,?,?,?)', [title, author, describes, category, releaseDate, number]);
}
let updateBook = async (req, res) => {
    let { title, author, describes, category, releaseDate, number, id } = req.body;
    await pool.execute('update book set title=?,author=?,describes=?,category=?,releaseDate=?,number=? where id=?', [title, author, describes, category, releaseDate, number, id]);
}

let detailBook = async (req, res) => {
    let id = req.params.id;
    let [rows, fields] = await pool.execute(`select * from book where id = ?`, [id]);
    return res.json({
        book: rows
    })
}

let deleteBook = async (req, res) => {
    let bookId = req.params.id;
    await pool.execute('delete from book where id =?', [bookId]);
}

module.exports = {
    allBook, createNewBook, updateBook, deleteBook, detailBook
}