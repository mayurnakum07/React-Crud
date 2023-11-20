import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import dayjs from "dayjs";

function Useref() {
  const ref = useRef("");
  const click = useRef(0);
  const [timer, setTimer] = useState(0);
  const [now, setNow] = useState(0);
  const time = useRef(0);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleClick = () => {
    click.current = click.current + 1;
    alert(`You clicked ${click.current} Times!`);
    console.log("Click", click.current, "Times");
  };

  const handleStart = () => {
    setTimer(dayjs());
    setNow(dayjs());
    clearInterval(time.current);
    time.current = setInterval(() => {
      setNow(dayjs());
    }, 10);
  };

  const handleStop = () => {
    clearInterval(time.current);
  };

  let secondPass = 0;
  if (timer != null && now !== null) {
    secondPass = (now - timer) / 1000;
  }

  return (
    <div>
      <div className="App mt-3">
        <h1>UseState</h1>
        <hr className="mb-4" />
        <div
          className={` container col-md-8 `}
          style={{
            padding: "40px 60px",
          }}
        >
          {" "}
          <h3>Auto Focus and Click</h3>
          <input type="text" ref={ref} className="form-control mt-4" />
          <Button className="mt-3" onClick={handleClick}>
            Click Me
          </Button>
        </div>
        <br /> <br />
        <div
          className={` container col-md-8 `}
          style={{
            padding: "40px 60px",
          }}
        >
          {" "}
          <h3>Stop Watch</h3>
          <h1>Time :- {secondPass.toFixed(3)}</h1>
          <Button className="m-3" onClick={handleStart}>
            Start
          </Button>
          <Button className="m-3" onClick={handleStop}>
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Useref;
