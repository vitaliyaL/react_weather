import React, { useState, useEffect } from "react";
import { months } from "../../constants/Months";
import "./Data.css";
function Data() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=mogilev&APPID=0253feb4b272e9d80b20818a745b1ec4"
    )
      .then((res) => res.json())
      .then((data) => setList(data.list));
  }, []);
  console.log(list);
  const getWeekDay = (date) => {
    const weekDays = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    return weekDays[date.getDay()];
  };
  return (
    <div className="container">
      {list
        .filter((i) => i.dt_txt.slice(11, 16) === "09:00")
        .map((i, index) => {
          const mas = i.dt_txt.slice(0, 10).split("-");
          const day = getWeekDay(new Date(+mas[0], +mas[1] - 1, +mas[2]));
          mas.reverse();
          const strDate = `${+mas[0]} ${months[+mas[1] - 1]}`;
          return (
            <div className="item" key={index}>
              <div className="date">{strDate}</div>
              <hr />
              <div className="weekDay">{day}</div>
              <hr />
              <div className="desc">
                <div className="descImg">
                  <img
                    src={`http://openweathermap.org/img/w/${i.weather[0].icon}.png`}
                  />
                </div>
                <div className="descTxt">{i.weather[0].description}</div>
              </div>
              <div className="time">Время: {i.dt_txt.slice(11, 16)}</div>
              <div className="temp">
                Температура воздуха: <b>{`${(i.main.temp_max - 273.15).toFixed(1)} °C`}</b>
              </div>
              <div className="wind">Скорость ветра: <b>{i.wind.speed}</b></div>
            </div>
          );
        })}
    </div>
  );
}

export default Data;
