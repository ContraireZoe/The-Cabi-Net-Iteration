const { buildSchema, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLList, GraphQLBoolean } = require('graphql');
const db = require('../connectPg.js');


//TYPE DEFINITIONS
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        username: { type: GraphQLString },
        spices: {
            type: new GraphQLList(SpiceType),
            async resolve(parent, args) {
                console.log("In the User Type Resolver")
                const spiceList = await db.query(
                `SELECT * FROM spiceTable WHERE assocUser = $1`,
                [parent.username]
                );
                return spiceList.rows
            }
        }
    })
})



const SpiceType = new GraphQLObjectType({
    name: 'Spice',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        remaining: { type: GraphQLInt },
        containersize: { type: GraphQLString },
        assocuser: { type: GraphQLString }
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        spices: {
            type: new GraphQLList(SpiceType),
            args: {username: { type: GraphQLString} },
            async resolve(parent, args) {
                console.log('Inside the Spices Query');
                const spices = await db.query(
                    `SELECT * FROM spiceTable WHERE assocUser = $1`,
                    [args.username]
                )
                return spices.rows;
            }
        },
        login: {
            type: new GraphQLList(UserType), 
            args: {username: {type: GraphQLString}, password: {type: GraphQLString}},
            async resolve(parent, args) {
                console.log("Inside the login Query")
                const user = await db.query(
                  `
                  SELECT * FROM usertable WHERE username = $1 and password = $2`,
                  [args.username, args.password]
                )
                return user.rows;
            }
        },
    }
})

    const RootMutation = new GraphQLObjectType({
        name: 'RootMutation',
        fields: {
            signup : {
                type: GraphQLBoolean,
                args: {username: {type: GraphQLString}, password: {type: GraphQLString}},
                async resolve(parent, args) {
                    console.log("Inside the signup Query")
                    const user = await db.query(
                      `INSERT INTO userTable(username, password) VALUES ($1, $2)`,
                      [args.username, args.password]
                    )
                    return true;
                }
            }
        }
    })


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
    types: [SpiceType],
  });
  