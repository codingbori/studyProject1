const posts = [
  {
    id: 1,
    userid: "user1",
    title: "이젠 뭔가 되는 기분이 들어",
    text: "네이트판에서 맨날 보던 그 포멧 다시 보니 감회가 새롭네요. 예쁘게 만드는 건 디자이너가 알아서 하겠지... 계획서랑 비슷한 모양새를 내기 위해서 강아지 그림도 추가해줄 거예요.",
    imageUrl: [
      { src: "/image/puppy.jpg", alt: "멍멍그림" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "일상",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 2,
    userid: "user1",
    title: "아냐 되지 않아",
    text: "이미지 왜 연결이 되지 않죠?: create-react-app의 문제로, public 폴더에 넣으니까 돌아간다. 실전에서는 서버에 올릴 테니까 괜찮겠지?",
    imageUrl: [
      { src: "", alt: "빈이미지1" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "정보",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 3,
    userid: "user1",
    title: "댓글 테스트 페이지",
    text: "많은 댓글과 대댓글 부탁드립니다.",
    imageUrl: [
      { src: "", alt: "빈이미지1" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 4,
    userid: "user2",
    title: "테스트4: 노이미지 노에러",
    text: "이미지 없어도 에러 안 나나요?",
    imageUrl: [],
    category: "일상",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 5,
    userid: "user3",
    title: "테스트5: 뒤로가면1페이지",
    text: "loremlorem",
    imageUrl: [
      { src: "", alt: "빈이미지1" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "정보",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 6,
    userid: "user2",
    title: "테스트6",
    text: "loremlorem",
    imageUrl: [
      { src: "", alt: "빈이미지1" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 7,
    userid: "user2",
    title: "테스트7",
    text: "loremlorem",
    imageUrl: [
      { src: "", alt: "빈이미지1" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "일상",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 8,
    userid: "user3",
    title: "테스트8",
    text: "loremlorem",
    imageUrl: [
      { src: "", alt: "빈이미지1" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "정보",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 9,
    userid: "user3",
    title: "테스트9",
    text: "loremlorem",
    imageUrl: [
      { src: "", alt: "빈이미지1" },
      { src: "", alt: "빈이미지2" },
    ],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 10,
    userid: "user3",
    title: "테스트10",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 11,
    userid: "user3",
    title: "테스트11",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 12,
    userid: "user3",
    title: "테스트12",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 13,
    userid: "user3",
    title: "테스트13",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 14,
    userid: "user3",
    title: "테스트14",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 15,
    userid: "user3",
    title: "테스트15",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 16,
    userid: "user3",
    title: "테스트16",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 17,
    userid: "user3",
    title: "테스트17",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 18,
    userid: "user3",
    title: "테스트18",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 19,
    userid: "user3",
    title: "테스트19",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 20,
    userid: "user3",
    title: "테스트20",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 21,
    userid: "user3",
    title: "테스트21",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 22,
    userid: "user3",
    title: "테스트22",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 23,
    userid: "user3",
    title: "테스트23",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 24,
    userid: "user3",
    title: "테스트24",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 25,
    userid: "user3",
    title: "테스트25",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 26,
    userid: "user3",
    title: "테스트26",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 27,
    userid: "user3",
    title: "테스트27",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 28,
    userid: "user3",
    title: "테스트28",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 29,
    userid: "user3",
    title: "테스트29",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 30,
    userid: "user3",
    title: "테스트30",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 31,
    userid: "user3",
    title: "테스트31",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 32,
    userid: "user3",
    title: "테스트32",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 33,
    userid: "user3",
    title: "테스트33",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 34,
    userid: "user3",
    title: "테스트34",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 35,
    userid: "user3",
    title: "테스트35",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 36,
    userid: "user3",
    title: "테스트36",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 37,
    userid: "user3",
    title: "테스트37",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 38,
    userid: "user3",
    title: "테스트38",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 39,
    userid: "user3",
    title: "테스트39",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 40,
    userid: "user3",
    title: "테스트40",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 41,
    userid: "user3",
    title: "테스트41",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 42,
    userid: "user3",
    title: "테스트42",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 43,
    userid: "user3",
    title: "테스트43",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 44,
    userid: "user3",
    title: "테스트44",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 45,
    userid: "user3",
    title: "테스트45",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 46,
    userid: "user3",
    title: "테스트46",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 47,
    userid: "user3",
    title: "테스트47",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 48,
    userid: "user3",
    title: "테스트48",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 49,
    userid: "user3",
    title: "테스트49",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 50,
    userid: "user3",
    title: "테스트50",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 51,
    userid: "user3",
    title: "테스트51",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 52,
    userid: "user3",
    title: "테스트52",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 53,
    userid: "user3",
    title: "테스트53",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 54,
    userid: "user3",
    title: "테스트54",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 55,
    userid: "user3",
    title: "테스트55",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 56,
    userid: "user3",
    title: "테스트56",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 57,
    userid: "user3",
    title: "테스트57",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 58,
    userid: "user3",
    title: "테스트58",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 59,
    userid: "user3",
    title: "테스트59",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 60,
    userid: "user3",
    title: "테스트60",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 61,
    userid: "user3",
    title: "테스트61",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 62,
    userid: "user3",
    title: "테스트62",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 63,
    userid: "user3",
    title: "테스트63",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 64,
    userid: "user3",
    title: "테스트64",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 65,
    userid: "user3",
    title: "테스트65",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 66,
    userid: "user3",
    title: "테스트66",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 67,
    userid: "user3",
    title: "테스트67",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 68,
    userid: "user3",
    title: "테스트68",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 69,
    userid: "user3",
    title: "테스트69",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 70,
    userid: "user3",
    title: "테스트70",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 71,
    userid: "user3",
    title: "테스트71",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 72,
    userid: "user3",
    title: "테스트72",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 73,
    userid: "user3",
    title: "테스트73",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 74,
    userid: "user3",
    title: "테스트74",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 75,
    userid: "user3",
    title: "테스트75",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 76,
    userid: "user3",
    title: "테스트76",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 77,
    userid: "user3",
    title: "테스트77",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 78,
    userid: "user3",
    title: "테스트78",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 79,
    userid: "user3",
    title: "테스트79",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 80,
    userid: "user3",
    title: "테스트80",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
  {
    id: 81,
    userid: "user3",
    title: "테스트81",
    text: "loremlorem",
    imageUrl: [{ src: "", alt: "빈이미지1" }],
    category: "공구",
    timeStamp: "",
    clicked: 0,
  },
];

export default posts;
