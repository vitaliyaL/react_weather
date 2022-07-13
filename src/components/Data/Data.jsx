import React, { useState, useEffect } from "react";
import { months } from "../../constants/Months";
import "./Data.css";
import { weekDays } from "../../constants/DaysOfWeek";
import moment from "moment";
import { time_arr } from "../../constants/Time";
import Clock from "../Clock/Clock";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";
import { directions } from "../../constants/Direction";
import GaugeChart from "react-gauge-chart";
function Data({ value }) {
  const [list, setList] = useState([]);
  const [time, setTime] = useState("12:00");
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&lang=ru&APPID=0253feb4b272e9d80b20818a745b1ec4`
    )
      .then((res) => {
        if (res.status >= 400) {
          setError(true);
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then((data) => setList(data.list));
  }, [value]);
  console.log(list);
  const getWeekDay = (date) => {
    if (date.toString() === moment().startOf("day")._d.toString())
      return "Сегодня";
    else if (
      date.toString() === moment().startOf("day").add(1, "days")._d.toString()
    )
      return "Завтра";
    else return weekDays[date.getDay()];
  };
  const get_time = (e) => {
    setTime(e.target.value);
  };
  const today_list = list.filter(
    (i) => i.dt_txt.slice(11, 16) === time_arr[moment().format("HH")]
  )[0];
  return (
    <>
      {error ? (
        <p className="city">Город не найден</p>
      ) : (
        <div>
          <p className="city">{value}</p>
          <div className="today">
            <div className="today_left">
              <div className="temp_icon">
                <div className="today_temp">
                  <p>{`${today_list?.main.temp?.toFixed(1)}°`}</p>
                  <span>Сегодня</span>
                </div>
                <div className="left_icon">
                  <img
                    src={`./assets/${today_list?.weather[0].icon}.png`}
                    alt=""
                  />
                </div>
              </div>
              <div className="time_city">
                <div className="time">
                  Время: <Clock />
                </div>
                <p> Город: {value}</p>
              </div>
            </div>
            <div className="gauge">
              <GaugeChart
                nrOfLevels={5}
                colors={["blue","green","yellow","orange","red"]}
                arcWidth={0.3}
                percent={today_list?.main.temp/40}
                cornerRadius={3} 
                needleColor="yellow" 
              />
            </div>
            <div className="today_right">
              <div className="lines">
                <ThermostatIcon className="right_icon" />
                <span>Температура</span>
              </div>
              <div className="lines">
                <OpacityIcon className="right_icon" />
                <span>Давление</span>
                <p>
                  {(today_list?.main.pressure * 0.75006375541921).toFixed(0)} мм
                  ртутного столба
                </p>
              </div>
              <div className="lines">
                <WaterIcon className="right_icon" />
                <span>Осадки</span>
                <p>
                  {today_list?.hasOwnProperty("rain")
                    ? today_list?.weather[0].description
                    : "Без осадков"}
                </p>
              </div>
              <div className="lines">
                <AirIcon className="right_icon" />
                <span>Ветер</span>
                <p>
                  {today_list?.wind.speed} м/c{" "}
                  {directions[Math.round(today_list?.wind.deg / 45) % 8]}
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <select onChange={get_time} className="select">
              <option value="00:00">00:00</option>
              <option value="03:00">03:00</option>
              <option value="06:00">06:00</option>
              <option value="09:00">09:00</option>
              <option value="12:00">12:00</option>
              <option value="15:00">15:00</option>
              <option value="18:00">18:00</option>
              <option value="21:00">21:00</option>
            </select>
            {list
              .filter((i) => i.dt_txt.slice(11, 16) === time)
              .map((i, index) => {
                const mas = i.dt_txt.slice(0, 10).split("-");
                const day = getWeekDay(new Date(+mas[0], +mas[1] - 1, +mas[2]));
                mas.reverse();
                const strDate = `${+mas[0]} ${months[+mas[1] - 1]}`;
                return (
                  <div className="item" key={index}>
                    <div className="weekDay">{day}</div>
                    <hr />
                    <div className="date">{strDate}</div>

                    <hr />
                    <div className="descImg">
                      <img src={`./assets/${i?.weather[0].icon}.png`} />
                    </div>

                    <div className="temp">
                      <b>
                        {i.main.temp_max > 0
                          ? `+${i.main.temp_max?.toFixed(1)}°`
                          : `${i.main.temp_max?.toFixed(1)}°`}
                      </b>
                    </div>
                    <div className="temp_span">
                      {i.main.temp_min > 0
                        ? `+${i.main.temp_min?.toFixed(1)}°`
                        : `${i.main.temp_min?.toFixed(1)}°`}
                    </div>
                    <div className="descTxt">{i.weather[0].description}</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default Data;
