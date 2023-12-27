//github를 서버로 사용하는 상황에서는 파일 업로드가 불가능한 듯 하다.

export default function Uploader() {
  const uploadFile = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/posts`, {
      method: "POST",
      body: e.target.file.files[0],
    })
      .then((response) => response.json())
      .then((datas) => console.log(datas))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={uploadFile}>
      <input type="file" name="file" />
      <input type="submit" value="업로드하기" />
    </form>
  );
}
