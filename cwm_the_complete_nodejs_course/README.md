# The Complete Node.js Course

## Links

-   https://github.com/shihab4t/vidly.dump

## Why Node.js

-   Great for prototyping and agile development
-   Super fast and highly scalable
-   JavaScript everywhere
-   Cleaner and more consistent codebase
-   Large ecosystem of open-source libs

## Getting Started with Node

-   Node is a runtime environment for executing JS code.
-   Essentially, Node is a C++ program that embeds Chrome’s v8 engine, the fastest JS engine in the world.
-   We use Node to build fast and scalable networking applications. It’s a perfect choice for building RESTful services.
-   Node applications are single-threaded. That means a single thread is used to serve all clients.
-   Node applications are asynchronous or non-blocking by default. That means when the application involves I/O operations (eg accessing the file system or the network), the thread doesn’t wait (or block) for the result of the operation. It is released to serve other clients.
-   This architecture makes Node ideal for building I/O-intensive applications.
-   You should avoid using Node for CPU-intensive applications, such as a video encoding service. Because while executing these operations, other clients have to wait for the single thread to finish its job and be ready to serve them.
-   In Node, we don’t have browser environment objects such as window or the document object. Instead, we have other objects that are not available in browsers, such as objects for working with the file system, network, operating system, etc.

## Node Core

-   We don’t have the window object in Node.
-   The global object in Node is “global”.
-   Unlike browser applications, variables we define are not added to the “global” object.
-   Every file in a Node application is a module. Node automatically wraps the code in each file with an IIFE (Immediately-invoked Function Expression) to create scope. So, variables and functions defined in one file are only scoped to that file and not visible to other files unless explicitly exported.
-   To export a variable or function from a module, you need to add them to module.exports:
    ```js
    module.exports.sayHello = sayHello;
    ```
-   To load a module, use the require function. This function returns the module.exports object exported from the target module:
    ```js
     const logger = require(‘./logger’);
    ```
-   Node has a few built-in modules that enable us to work with the file system, path objects, network, operating system, etc.
-   EventEmitter is one of the core classes in Node that allows us to raise (emit) and handle events. Several built-in classes in Node derive from EventEmitter.
-   To create a class with the ability to raise events, we should extend EventEmitter:
    ```js
    class Logger extends EventEmitter {}
    ```

## NPM

-   Every Node application has a package.json file that metadata about the application. This includes the name of the application, its version, dependencies, etc.
-   We use NPM to download and install 3rd-party packages from NPM registry:
-   All the installed packages and their dependencies are stored under node_modules folders. This folder should be excluded from the source control.
-   Node packages follow semantic versioning: major.minor.patch
-   Useful NPM commands are:

```c
// Install a package
npm i <packageName>
// Install a specific version of a package
npm i <packageName>@<version>
// Install a package as a development dependency
npm i <packageName> —save-dev
// Uninstall a package
npm un <packageName>
// List installed packages
npm list —depth=0
// View outdated packages
npm outdated
// Update packages
npm update
```

-   To install/uninstall packages globally, use -g flag

## Async Programming

-   Promise
    -   Holds the eventual result of an asynchronous operation.

## 08 - Mongoose Data Validation

-   When defining a schema, you can set the type of a property to a SchemaType
    object. You use this object to define the validation requirements for the given
    property.

```js
// Adding validation
new mongoose.Schema({
    name: { type: String, required: true },
});
```

-   Validation logic is executed by Mongoose prior to saving a document to the
    database. You can also trigger it manually by calling the validate() method.
-   Built-in validators:
-   Strings: minlength, maxlength, match, enum
-   Numbers: min, max
-   Dates: min, max
-   All types: required

```js
  // Custom validation
  tags: [
  type: Array,
  validate: {
  validator: function(v) { return v && v.length > 0; },
  message: ‘A course should have at least 1 tag.’
  }
  ]
```

-   If you need to talk to a database or a remote service to perform the validation,
    you need to create an async validator:
    validate: {
    isAsync: true
    validator: function(v, callback) {
    // Do the validation, when the result is ready, call the callback
    callback(isValid);
    }
    }
-   Other useful SchemaType properties:
-   Strings: lowercase, uppercase, trim
-   All types: get, set (to define a custom getter/setter)

```js
  price: {
  type: Number,
  get: v => Math.round(v),
  set: v => Math.round(v)
  }
```

## 09 Mongoose- Modeling Relationships Between Connected Data

-   Tow way making relationships
    -   Using references (Normalization) <- CONSISTENCY
    -   Using embedded documents (Denormalization) <- QUERY FAST
-   ObjectId

    ```js
    // _id: 62b47c058a74156ec6405dc7 <- 24 character
    /* 
    12 bytes:
        - first 4 bytes: timestamp
        - second 3 bytes: machine identifier
        - middle 2 bytes: process identifier
        - last 3 bytes: counter
    
    // 1 byte = 8 bits
    // 2 ^ 8 = 256
    // 2 ^ 24 = 16M
    
    // MongoDB Driver generate this objectId
    */
    ```

-   Summery
    Mongoose: Modelling Relationships between Connected Data
    So, in this section, you learned that:
-   To model relationships between connected data, we can either reference a
    document or embed it in another document.
-   When referencing a document, there is really no relationship between these two
    documents. So, it is possible to reference a non-existing document.
-   Referencing documents (normalization) is a good approach when you want to
    enforce data consistency. Because there will be a single instance of an object in
    the database. But this approach has a negative impact on the performance of
    your queries because in MongoDB we cannot JOIN documents as we do in
    relational databases. So, to get a complete representation of a document with its
    related documents, we need to send multiple queries to the database.
-   Embedding documents (denormalization) solves this issue. We can read a
    complete representation of a document with a single query. All the necessary
    data is embedded in one document and its children. But this also means we’ll
    have multiple copies of data in different places. While storage is not an issue
    these days, having multiple copies means changes made to the original
    document may not propagate to all copies. If the database server dies during an
    update, some documents will be inconsistent. For every business, for every
    problem, you need to ask this question: “can we tolerate data being inconsistent
    for a short period of time?” If not, you’ll have to use references. But again, this
    means that your queries will be slower.
    // Referencing a document
    const courseSchema = new mongoose.Schema({
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ‘Author’
    }
    })
    // Referencing a document
    const courseSchema = new mongoose.Schema({
    author: {
    type: new mongoose.Schema({
    name: String,
    bio: String
    })
    }
    })
-   Embedded documents don’t have a save method. They can only be saved in the
    context of their parent.
    // Updating an embedded document
    const course = await Course.findById(courseId);
    course.author.name = ‘New Name’;
    course.save();
-   We don’t have transactions in MongoDB. To implement transactions, we use a
    pattern called “Two Phase Commit”. If you don’t want to manually implement this
    pattern, use the Fawn NPM package:
    // Implementing transactions using Fawn
    try {
    await new Fawn.Task()
    .save(‘rentals’, newRental)
    .update(‘movies’, { \_id: movie.\_id }, { $inc: numberInStock: -1 }})
    .run();
    }
    catch (ex) {
    // At this point, all operations are automatically rolled back
    }
-   ObjectIDs are generated by MongoDB driver and are used to uniquely identify a
    document. They consist of 12 bytes:
-   4 bytes: timestamp
-   3 bytes: machine identifier
-   2 bytes: process identifier
-   3 byes: counter
    -ObjectIDs are almost unique. In theory, there is a chance for two ObjectIDs to be
    equal but the odds are very low (1/16,000,000) for most real-world applications.
    // Validating ObjectIDs
    mongoose.Types.ObjectID.isValid(id);
-   To validate ObjectIDs using joi, use joi-objectid NPM package.

## Deployment

-   `export HTTP_PROXY=http://proxy.server.com:1234`
-   `heroku create`
-   `git push heroku master`
-   `heroku logs`
-   `heroku config:set NODE_ENV=production`
-   `git remote add heroku https://git.heroku.com/vidly-dump-server.git`
