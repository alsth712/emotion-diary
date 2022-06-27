const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  // App.js 에서 type이 이상한 버튼이 무작위로 생성되는 것을 방지하기 위해서
  // type이 [배열] 내부에 해당하는 타입이 아니라면, default로 나오도록 btnType 생성

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      // type 에 따라서 MyButton_${type} 이 변경되며, className은 문자로만 전달해야하므로,
      // 배열을 " "를 구분자로 해서 JOIN메소드를 통해 합쳐줄 것
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
