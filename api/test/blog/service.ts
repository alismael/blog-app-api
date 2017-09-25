import { BlogService } from './../../src/modules/blog/services/BlogService'
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

let blogService = new BlogService();

describe('findAll Function', () => {
  it('should return array of blogs', async () => {
    let blogs = await blogService.findAll();
    expect(blogs).to.be.an('array');
  });
});