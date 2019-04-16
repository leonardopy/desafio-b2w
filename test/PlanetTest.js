const req = require('supertest');

const url = 'http://localhost:8081';

const cTimeout = 60000;

describe('Routes', () => {
    const hasBody = (res) => {
        if (!res.body) throw new Error('faltando corpo da resposta');
    };

    let id;

    it('add fail', (done) => {
        req(url).post('/planetas')
            .send({
                name: 'Planeta Teste',
                terrain: 'Terreno Teste',
                climate: 'Clima Teste'
            })
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404)
            .expect(hasBody)
            .end(done);
    }).timeout(cTimeout);

    it('add success', (done) => {
        req(url).post('/planetas')
            .send({
                name: 'Endor',
                terrain: 'forests, mountains, lakes',
                climate: 'temperate'
            })
            .expect('Content-Type', /json/)
            .expect(({
                body
            }) => {
                id = body.id;
            })
            .expect(200)
            .expect(hasBody)
            .end(done);
    }).timeout(cTimeout);

    it('list', (done) => {
        req(url).get('/planetas')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(hasBody)
            .end(done);
    });

    it('list by name', (done) => {
        req(url).get('/planetas?name=Endor')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(hasBody)
            .end(done);
    });

    it('find by id', (done) => {
        req(url).get('/planetas/5c1296f1600d5a2a6dfb5c44')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .expect(hasBody)
            .end(done);
    });

    it('delete', (done) => {
        req(url).delete(`/planetas/${id}`)
            .expect(200)
            .end(done);
    });
});