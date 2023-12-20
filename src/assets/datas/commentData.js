const comments = [
  {
    id: 1,
    userId: "user1",
    text: "댓글을 적어요",
    postId: 3,
    parentId: 0,
    timeStamp: 1,
  },
  {
    id: 2,
    userId: "user2",
    text: "댓글을 적어요2",
    postId: 3,
    parentId: 0,
    timeStamp: 1,
  },
  {
    id: 3,
    userId: "user3",
    text: "댓글을 적어요3",
    postId: 3,
    parentId: 0,
    timeStamp: 1,
  },
  {
    id: 4,
    userId: "user1",
    text: "대댓글1",
    postId: 3,
    parentId: 1,
    timeStamp: 1,
  },
  {
    id: 5,
    userId: "user2",
    text: "대댓글2",
    postId: 3,
    parentId: 3,
    timeStamp: 1,
  },
  {
    id: 6,
    userId: "user3",
    text: "대댓글3",
    postId: 3,
    parentId: 3,
    timeStamp: 1,
  },
];

export default comments;
