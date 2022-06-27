import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

// COMPONENTS
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

// UTIL
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState(""); // 오늘의 일기(textarea) state
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  // DiaryDispatchContext를 useContext로 불러와서, onCreate 함수를 받아오기
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  // 감정아이템이 클릭되면 발생할 함수를 생성
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      // content의 내용이 없는 경우
      contentRef.current.focus(); // 입력란에 focus
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        // 현재 수정 중이 아닌 경우

        // content의 내용이 존재하면, onCreate함수를 호출
        onCreate(date, content, emotion);
      } else {
        // 현재 수정 중인 경우
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
    // option을 줘서 홈으로 돌아가게 처리
    // { replace: true } : 다시 일기 생성 페이지로 못 오게 처리
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      // edit 페이지에서 랜더하는 DiartEditor에서만 동작

      // 수정일기의 날짜를 불러와서 캘린더에 지정
      setDate(getStringDate(new Date(parseInt(originData.date))));

      // 감정상태도 저장된 값을 불러옴
      setEmotion(originData.emotion);

      // 일기 내용도 저장된 내용을 불러옴
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          // 페이지가 수정하기 인 경우에, 삭제하기 버튼이 나와야함.
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
