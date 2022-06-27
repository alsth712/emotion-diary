import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

// COMPONENTS
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  // DiaryStateContext가 제공하는 diaryList data를 받아와주도록 하자.

  // page별 title 변경
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  // diaryList에서 우리가 찾는 id와 일치하는 일기를 찾아서 불러내주기
  // edit 컴포넌트가 마운트 된 경우에 수행할 것
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        // targetDiary 의 id가 잘못 전달되었을 경우의 설정
        alert("존재하지 않는 일기 입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
  // originData 가 존재하면, DiaryEditor 를 랜더
};

export default Edit;
