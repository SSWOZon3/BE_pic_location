import chai from 'chai';
import chaiHttp from 'chai-http';
import Review from '../../src/domain/entities/review.js';
import app from '../../src/app.js';
import { reviews } from '../fixtures/reviewFixtures.js';

const expect = chai.expect()
chai.use(chaiHttp);


describe('Review Controller API', () => {
    beforeEach(async (done) => {
        await Review.deleteMany({});
        await Review.insertMany(reviews, done);
    });

    it('should get a single review', async () => {
        const _id = '';
        const response = await chai.request(app).get(`/api/review/${_id}`);
        console.log(response);
    });
});
