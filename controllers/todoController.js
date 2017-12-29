var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds137826.mlab.com:37826/todos',{
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useMongoClient: true
});

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);


//var data = [{item: 'cut your nails'},{item: 'walk dog'},{item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports= function(app){

app.get('/todo',function(req,res){

    Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo',{todos: data});
    });
   
});

app.post('/todo',urlencodedParser,function(req,res){

    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });
    //data.push(req.body);
    //res.json(data);
});

app.delete('/todo/:item',function(req,res){

    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        res.json(data);
    });
  // data =  data.filter(function(todo){
    
       // return todo.item.replace(/ /g,'-') !== req.params.item;
  //  });
   
  //  res.json(data);
});

};