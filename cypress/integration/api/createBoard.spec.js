const faker= require ('faker');

const accessToken= Cypress.env('gitlab_access_token')

const issue= {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
    }
};

describe('Creates a project issue board', () => {
    it('Successfully creates a project issue board', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}api/v4/boards/4/lists/9/issues/?private_token=${accessToken}`,
            body: {
                name: 'adfs'
            }
        }).then(res=>{
            expect(res.status).eq(201);
            cy.log(`New Project Label created, name: ${res.body.name} | Description: ${res.body.description}`);
        }); 
    });
});