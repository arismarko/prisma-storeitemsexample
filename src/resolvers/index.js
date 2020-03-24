import { combineResolvers, skip } from 'graphql-resolvers';


export default {
    Query: {
        getStore:  async (parent, { id }, { prisma }) => {
            const store = await prisma.store({ id });
            return store;
        },
        getItem: async (parent, { id }, { prisma }) => {
            const item = await prisma.item({ id });
            return item;
        }
    },
    Mutation: {
        addStore: async (parent, { location, date,  storename, items}, { prisma }) => {
            try {

                const store = await prisma.createStore({ location, date , storename, 
                    missings: {
                     create: [{item: items[0].item, number: items[0].number}]
                    }
                });

                return store;

            } catch (error) {
                throw new Error(error);
            }
        }
    },
}