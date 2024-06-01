import postController from './post.js';
import postModel, { cmt as cmtModel } from '../models/post.js';

jest.mock('../models/post');

describe('postController', () => {
  describe('createPost', () => {
    it('should create a new post', async () => {
      const mockReq = {
        body: {
          coords: [1, 2],
          title: 'Test Post',
          image: 'test.jpg',
        },
        decoded: {
          id: 'mockUserId',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockPost = { _id: 'mockPostId' };
      postModel.create.mockResolvedValueOnce(mockPost);

      await postController.createPost(mockReq, mockRes);

      expect(postModel.create).toHaveBeenCalledWith({
        location: { type: 'Point', coordinates: [1, 2] },
        title: 'Test Post',
        image: 'test.jpg',
        userID: 'mockUserId',
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ code: 200, post: mockPost });
    });
  });

  describe('getPosts', () => {
    it('should return posts within the specified distance', async () => {
      const mockReq = {
        body: {
          coords: [1, 2],
          minD: 100,
          maxD: 1000,
          lim: 10,
          skipTo: 0,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockPosts = [{ _id: 'mockPostId1' }, { _id: 'mockPostId2' }];
      postModel.find.mockResolvedValueOnce(mockPosts);

      await postController.getPosts(mockReq, mockRes)

      expect(postModel.find).toHaveBeenCalledWith({
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [1, 2] },
            $minDistance: 100,
            $maxDistance: 1000,
          },
        },
      });
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });

  describe('createCommentOnPost', () => {
    it('should create a comment on a post', async () => {
      const mockReq = {
        body: {
          postID: 'mockPostId',
          msg: 'Test comment',
        },
        decoded: {
          id: 'mockUserId',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockPost = {
        _id: 'mockPostId',
        comments: [],
      };
      const mockComment = {
        _id: 'mockCommentId',
      };
      postModel.findById.mockResolvedValueOnce(mockPost);
      cmtModel.create.mockResolvedValueOnce(mockComment);
      postModel.findByIdAndUpdate.mockResolvedValueOnce(mockPost);

      await postController.createCommentOnPost(mockReq, mockRes);

      expect(postModel.findById).toHaveBeenCalledWith('mockPostId');
      expect(cmtModel.create).toHaveBeenCalledWith({
        msg: 'Test comment',
        userID: 'mockUserId',
        topID: 'mockPostId',
        topType: 'post',
      });
      expect(mockPost.comments).toContain('mockCommentId');
      expect(postModel.findByIdAndUpdate).toHaveBeenCalledWith('mockPostId', mockPost, { new: true });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ code: 200, comment: mockComment });
    });

    it('should handle post not found', async () => {
      const mockReq = {
        body: {
          postID: 'mockPostId',
          msg: 'Test comment',
        },
        decoded: {
          id: 'mockUserId',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      postModel.findById.mockResolvedValueOnce(null);

      await postController.createCommentOnPost(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ code: 404, message: "Post doesnt exist" });
    });
  });
});