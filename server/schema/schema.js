const graphql = require('graphql');
const _= require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const { GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull } = graphql;
//dummy
// const book = [
//     {name:'Name of wind',genre:'Fantacy',id:'1',authorid:'2'},
//     {name:'Arts o Ocean',genre:'History',id:'2',authorid:'1'},
//     {name:'Ant and Dove',genre:'Drama',id:'3',authorid:'2'}
// ]
// const author = [
//     {name:'Akash khan',age:12,id:'1'},
//     {name:'Alauddin',age:34,id:'2'},
//     {name:'Nafees Kaiser',age:28,id:'3'}
// ]
// Making schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        author: {
            type: AuthorType,
            resolve(parent,args) {
                //console.log(parent);
                // return _.find(author,{id:parent.authorid});
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: ()=> ({
        id: {type:GraphQLID},
        name: {type:new GraphQLNonNull(GraphQLString)},
        age: {type:new GraphQLNonNull(GraphQLInt)},
        book: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                //console.log(parent)
                // return _.filter(book,{authorid:parent.id})
                return Book.find({authorId:parent.id})
            }
        }
    })
});

// Making root directory
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(book,{id:args.id})
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type:GraphQLID} },
            resolve(parent,args) {
                // return _.find(author,{id:args.id})
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                // return book
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return author
                return Author.find({})
            }
        }
    }
});

//set mutation
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return book.save()
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
