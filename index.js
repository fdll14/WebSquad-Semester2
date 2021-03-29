const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

const koneksiDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "week1"
})

koneksiDB.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Database terhubung")
    }
})

// get all data
app.get("/api/food", (req, res) => {
    let sql = "SELECT * FROM foods";
    koneksiDB.query(sql, (err, results) => {
        if (err) {
            res.send({
                msg: "failed get data ",
                status: 500,
                err,
            })
        } else {
            res.send({
                msg: "success get data ",
                status: 200,
                results,
            })
        }
    })
})

// add data
app.post("/api/food", (req, res) => {
    let { body } = req;
    let sql = "INSERT INTO foods SET ?";
    koneksiDB.query(sql, body, (err, results) => {
        if (err) {
            res.send({
                msg: "failed add data",
                status: 500,
                err,
            })
        } else {
            let newBody = {
                id: results.insertId,
                ...body,
            };
            res.send({
                msg: "add data success",
                status: 200,
                data: newBody,
            })

        }
    })
})

// get data by id
app.get("/api/food/:id", (req, res) => {
    let { id } = req.params;
    let sql = `SELECT * FROM foods WHERE id =${id}`;
    koneksiDB.query(sql, (err, results) => {
        if (err) {
            res.send({
                msg: "GET DATA ID ERROR",
                status: 500,
                err,
            })
        } else {
            res.send({
                msg: "GET DATA ID SUCCESS",
                status: 200,
                data: results,
            })
        }
    })
})

// delete data by id
app.delete("/api/food/:id", (req, res) => {
    let { id } = req.params;
    let sql = `DELETE FROM foods WHERE id=${id}`;
    koneksiDB.query(sql, (err, results) => {
        if (err) {
            res.send({
                msg: "failed delete data",
                status: 500,
                err,
            })
        } else {
            res.send({
                msg: "success delete data",
                status: 200,
                data: results,
            })
        }
    })
})

// update data
app.put("/api/food/:id", (req, res) => {
    let { id } = req.params;
    let { body } = req;
    let sql = `UPDATE foods SET ? WHERE id=${id}`;
    koneksiDB.query(sql, body, (err, results) => {
        if (err) {
            res.send({
                msg: "Update data failed",
                status: 500,
                err,
            })
        } else {
            let newBody = {
                id,
                ...body,
            }
            res.send({
                msg: "Success update data",
                status: 200,
                data: newBody,
            })
        }
    })
})
app.listen(port, () => {
    console.log("localhost:" + port);
})