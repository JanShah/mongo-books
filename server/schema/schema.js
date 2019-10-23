const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;


//definitions for book 
//this does not depend on books, 
//anything JSON with these properties will work
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            //return a single result. arrays will not work
            resolve(parent,args) {
                return Author.findById(parent.authorID)

            }
         },
    })
});
//end definitions for book 

//definitions for Author
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: { 
            //multiple results should use list object
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                //return an array of results. a single result will not work
                return Book.find({authorID:parent.id})
            }
         },
    })
});
//end definitions for Author

//start root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id)
            }
        },
        //all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent) {
                return Book.find();
            }
        },
        //all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent) {
                return Author.find();
            }
        }
    }
});
// end root query

//Mutations are for adding new data
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addNewAuthor: {
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args) {
                const author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook: {
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorID:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args) {
                const book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorID:args.authorID
                });
                return book.save();
            }
        }
    }
});
//end add new data

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})