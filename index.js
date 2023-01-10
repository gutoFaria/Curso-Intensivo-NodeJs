// const Person = require('./person')


// const person1 = new Person('Jonh Doe',30)

// person1.greeting()

// const Logger = require('./logger');

// const logger = new Logger();

// logger.on('message',(data) => console.log('Called Listenner', data))

// logger.log('Hello World')
// logger.log('Hi')
// logger.log('How are you?')

const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    // if(req.url ==='/'){
    //     fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
    //         if(err) throw err;
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     })
    // }

    // if(req.url ==='/about'){
    //     fs.readFile(path.join(__dirname,'public','about.html'),(err,content)=>{
    //         if(err) throw err;
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.end(content);
    //     })
    // }

    // if(req.url ==='/api/users'){
    //     const users = [
    //         {name:'bob',age:30},
    //         {name:'ana',age:27},
    //     ]

    //     res.writeHead(200,{'Content-Type':'application/json'});
    //     res.end(JSON.stringify(users))
    // }

    let filePath = path.join(__dirname,'public',req.url === '/'?'index.html': req.url)

    //Extension of file
    let extname = path.extname(filePath)

    //Initial content type
    let contentType = 'text/html'

    switch(extname){
        case '.js':
            contentType='text/javascript';
            break;
        case '.css':
            contentType='text/css';
            break;
        case '.json':
            contentType='application/json';
            break;
        case '.png':
            contentType='image/png';
            break;
        case '.jpg':
            contentType='image/png';
            break;
    }

    //read file

    fs.readFile(filePath,(err,content) => {
        if(err){
            if(err.code =='ENOENT'){
                //Pge not found
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                    if(err) throw err;
                    res.writeHead(200,{'Content-type':'text/html'})
                    res.end(content,'utf8');
                })
            }else{
                //Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }else{
            //Success
            res.writeHead(200,{'Content-Type':contentType });
            res.end(content,'utf8');
        }
    })
})

const PORT =process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));