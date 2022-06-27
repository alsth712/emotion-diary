import React from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import MyButton from "../components/MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  // 년,월,일 기준의 시간이 나옴

  // 일기 상세페이지 이동
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  // 일기 상세페이지 이동
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
        {/* {content.slice(0, 25)} : 일기 내용이 너무 길면, 0 ~ 25자까지 잘라서 보여주기 */}
      </div>
      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
