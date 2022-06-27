import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

// COMPONENTS
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

// UTIL
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  // page별 title 변경
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    // 문서객체에서 title이라는 이름이 붙는 모든 elements를 가져오므로, 배열이 반환된다.
    // 반환 배열의 0번째가 title
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary);
      } else {
        // 일기가 없는 경우
        // 경고창 이후, 뒤로 가기로 돌아갈 수 없도록 home으로 보내주기
        alert("존재하지 않는 일기 입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    // data가 없는 경우
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    // data가 있는 경우

    // emotionList 에서 현재 감정점수와 같은 것을 찾는다.
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(parseInt(data.date)))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
