import { Router } from "express";
import multer from 'multer';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path'
// import cors from 'cors'
const upload = multer();

const router = Router()


// const HOST = '192.168.30.140';
// const USER = 'root';
// const PASSWORD = 'Asdf123456?';
// const DATABASE = 'primadb';


const HOST = process.env.HOST_DB || 'localhost';
const USER = process.env.USER_DB || 'root';
const PASSWORD = process.env.PASSWORD_DB || 'admin';
const DATABASE = process.env.DATABASE_NAME || 'teguhdb';

// main is run at the end
let singleStoreConnection = await mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
});

// singleStoreConnection.query(`create table if not exists files(
//   file_id bigint NOT NULL AUTO_INCREMENT,
//   file_name varchar(255),
//   file_type varchar(255),
//   file_size bigint,
//   file longblob,
//   PRIMARY KEY ( file_id )
//   );`)

singleStoreConnection.query(`set global max_allowed_packet=1073741824;;`)

// router.use(express.static(__dirname));

// router.use(express.json())
// router.use(cors({ credentials: true, origin: '*' }))
// router.use(express.urlencoded({ extended: true, limit: '1gb' }));


router.get('/detail', (req, res) => {
  res.json({
    title: "Program iseng by Teguh Prasetyo",
    object_title: "Server API save and download some files to and from singlestore",
    how_to_access: {
      Port: process.env.PORT || 8081,
      Location: [
        {
          path: "/",
          method: "GET",
          msg: "You got this hahaha"
        },
        {
          path: " ",
          method: "POST",
          msg: "To upload some file"
        },
        {
          path: " ",
          method: "GET",
          msg: "Query all record in table files without blob file"
        },
        {
          path: " /get-json-by-id/<FILE_ID>",
          method: "GET",
          msg: "Query some record by id in table files without blob file"
        },
        {
          path: " /get-json-by-id-with-blob/<FILE_ID>",
          method: "GET",
          msg: "Query some record by id in table files without blob file"
        },
        {
          path: " /get-json-by-name/<FILE_NAME>",
          method: "GET",
          msg: "Query some record by name in table files without blob file"
        },
        {
          path: " /get-json-by-type/<FILE_TYPE>",
          method: "GET",
          msg: "Query some record by name in table files without blob file"
        },
        {
          path: " /get-file-by-id/<ID_FILES>",
          method: "GET",
          msg: "Download a file on record by id in table files"
        },
      ]
    }
  })
})

router.get('/get-file-by-id/:file_id', async (req, res) => {
  try {

    const outputdir = path.join(path.resolve(), 'outputFile');
    console.log("outputdir", outputdir)

    fs.readdir(outputdir, (err, files) => {
      if (err) throw err;
      // kalo ada file, hapus!!!
      if (files.length > 0)
        files.forEach(async e =>
          await fs.rm(`./outputFile/${e}`, { recursive: true }, (err) => { })
        )
    })

    const file_id = req.params.file_id
    let query = `SELECT * from files where file_id like '%${file_id}%' limit 1`;
    const [result] = await singleStoreConnection.execute(query);

    console.log('query ditemukan')

    if (result.length == 0) return res.status(404).json({ status: "failed", msg: "Not found babi" })



    await fs.writeFile("./outputFile/" + result[0].file_name, result[0].file, (err) => {
      if (err) {
        console.log('Error: ', err);
        return res.status(500).send('An error occurred: ' + err.message);
      } else {
        // return res.status(200).send('ok');
        return res.download("./outputFile/" + result[0].file_name)
      }
    });


  } catch (error) {
    return res.json({ status: "failed", msg: "server error" })
  }
})
router.get('/get-json-by-type/:file_type', async (req, res) => {
  try {
    const file_type = req.params.file_type
    let query = `SELECT file_id, file_name, file_type, file_size from files where file_type like '%${file_type}%'`;
    const [result] = await singleStoreConnection.execute(query);

    if (result.length == 0) return res.status(404).json({ status: "failed", msg: "Not found babi" })

    return res.json({
      status: "success",
      msg: "Data of file without blob",
      data: result
    })

  } catch (error) {
    return res.json({ status: "failed", msg: "server error" })
  }
})
router.get('/get-json-by-name/:file_name', async (req, res) => {
  try {
    const file_name = req.params.file_name
    let query = `SELECT file_id, file_name, file_type, file_size from files where file_name like '%${file_name}%'`;
    const [result] = await singleStoreConnection.execute(query);

    if (result.length == 0) return res.status(404).json({ status: "failed", msg: "Not found babi" })

    return res.json({
      status: "success",
      msg: "Data of file without blob",
      data: result
    })

  } catch (error) {
    return res.json({ status: "failed", msg: "server error" })
  }
})
router.get('/get-json-by-id-with-blob/:file_id', async (req, res) => {
  try {
    const file_id = req.params.file_id
    let query = `SELECT * from files where file_id='${file_id}'`;
    const [result] = await singleStoreConnection.execute(query);

    if (result.length == 0) return res.status(404).json({ status: "failed", msg: "Not found babi" })

    return res.json({
      status: "success",
      msg: "Data of file without blob",
      data: result
    })

  } catch (error) {
    return res.json({ status: "failed", msg: "server error" })
  }
})
router.get('/get-json-by-id/:file_id', async (req, res) => {
  try {
    const file_id = req.params.file_id
    let query = `SELECT file_id, file_name, file_type, file_size from files where file_id='${file_id}'`;
    const [result] = await singleStoreConnection.execute(query);

    if (result.length == 0) return res.status(404).json({ status: "failed", msg: "Not found babi" })

    return res.json({
      status: "success",
      msg: "Data of file without blob",
      data: result
    })

  } catch (error) {
    return res.json({ status: "failed", msg: "server error" })
  }
})


router.get('/limit/:limit', async (req, res) => {
  try {
    const limit = req.params.limit

    let arraylimit = [limit, limit + 4]

    let query = `SELECT file_id, file_name, file_type, file_size, create_at from files order by file_id desc limit ${arraylimit[0]},${arraylimit[1]}`;
    let [rows, fields] = await singleStoreConnection.execute(query);

    return res.json({
      status: "success",
      msg: "Data of file without blob",
      data: rows
      // data: 
    })

  } catch (error) {
    return res.status(404).json({ status: "failed", msg: "server error" })
  }
})
router.get('/', async (req, res) => {
  try {
    let query = "SELECT file_id, file_name, file_type, file_size, create_at from files order by file_id desc";
    let [rows, fields] = await singleStoreConnection.execute(query);
    // result = result.sort((a,b) => (parseInt(a.file_id) > parseInt(b.file_id)) ? 1 : ((parseInt(b.file_id) > parseInt(a.file_id)) ? -1 : 0))
    // rows = rows.sort((a,b) => parseInt(a.file_id) < parseInt(b.file_id)? 1 : 0)
    // console.log(fields)
    // console.log("======================================")

    return res.json({
      status: "success",
      msg: "Data of file without blob",
      data: rows
      // data: 
    })

  } catch (error) {
    return res.status(404).json({ status: "failed", msg: "server error" })
  }
})

router.post('/', upload.any(), async (req, res) => {
  console.log('POST /');
  console.log('Files: ', req.files);


  // console.log(req.files[0].buffer)
  try {
    let query = "INSERT INTO files SET ?",
      values = {
        file_id: null,
        file_name: req.files[0].originalname,
        file_type: req.files[0].mimetype,
        file_size: req.files[0].buffer.length,
        file: req.files[0].buffer
      };
    const result = await singleStoreConnection.query(query, values, function (er, da) {
      if (er) throw er;
      console.log("upload success", da)
    });
    console.log("upload success", result[0].insertId)



    return res.json({ status: "OK", msg: "File uploaded", data: { file_id: result[0].insertId, file_name: values.file_name, file_type: values.file_type, file_size: values.file_size } })
  } catch (error) {
    console.log("error boskuh")
    return res.status(404).json({ status: "failed", msg: "server error" })
  }


});



export { router }