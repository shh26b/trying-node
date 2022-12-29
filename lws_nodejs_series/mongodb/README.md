# MongoDB

## SQL to NoSQL Semantics

- Table -> Collection
- Row -> Document
- Column -> Field

## Mongo Commends

- utils
  - cls
  - show dbs
  - use \<ecommerce>
  - db
  - show collections
- Create
  - db.products.insertOne({name: "iphone 10", price: 100000, category: "smartphone", active: true})
  - db.student.insertMany([{name:"Ajay",age:20}, {name:"Bina",age:24},{name:"Ram",age:23}])
- Read
  - db.student.find()
  - db.student.find().pretty()
  - db.student.find({"age": 24})
  - db.student.find({"age": 24, name: "Ajay"}).pretty()
  - db.products.find({}, {active: 0})
  - db.products.find({category: "smartphone"}).limit(1).pretty()
  - db.products.find({category: "smartphone"}).limit(1).skip(1).pretty()
- Update
  - db.products.updateOne({name: "iphone 10", active: true}, {$set: {price: 120000}})
  - db.products.updateMany({}, {$set: {active: true}})
- Delete
  - db.products.deleteOne({name: "iphone 10"})
  - db.products.deleteMany({active: false})

## mongoose

- Object Data Modeling (ODM)
- Node.js -> mongoose -> MongoDB Driver -> MongoDB
- Benefits of using mongoose:
  - Abstraction from raw low level MongoDB
  - Relationship between NoSQL Data
  - Provides Schema Validation
  - Object - Data Mapping - translation of data into object that our code understands and vice versa
  - ~ 40 - 60% less code compared to raw mangodb package

## Mongoose Model Instance Method

```js
const todoSchema = new mongoose.Schema({title: String...});

const Todo = new mongoose.model("Todo", todoSchema);

const todo = new Todo({"title": "Learn Node.js"})

todo.save();
```

- Create a schema from mongoose.Schema class
- Create a model (which is an another class) from mongoose.model class & pass schema to it
- Create a document using model class
- Call necessary model instance method using document

## Custom Schema

- Custom Model Instance Method
- Custom Model Static Methods
- Custom Model Query Methods
