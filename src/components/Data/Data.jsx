import React, { useState, useEffect } from "react";
import { months } from "../../constants/Months";
import "./Data.css";
import { weekDays } from "../../constants/DaysOfWeek";
import moment from "moment";
import { time_obj } from "../../constants/Time";
import Clock from "../Clock/Clock";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import WaterIcon from "@mui/icons-material/Water";
import AirIcon from "@mui/icons-material/Air";
import { directions } from "../../constants/Direction";
import Thermometer from "react-thermometer-component";
import { useDispatch, useSelector } from "react-redux";
import { actionWeather } from "../../redux/weather/action";
import { Rings, Watch } from "react-loader-spinner";

function Data({ value }) {
  const [time, setTime] = useState("00:00");

  const dispatch = useDispatch();
  const { weather, error, loading } = useSelector((state) => state.weather);
  useEffect(() => {
    dispatch(actionWeather.getWeather(value));
  }, [value]);
  console.log(weather);
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
  const today_list = weather.filter(
    (i) => i.dt_txt.slice(11, 16) === time_obj[moment().format("HH")]
  )[0];

  if (loading && !error) {
    return <Rings height='100' width='100' color='grey' ariaLabel='loading' />;
  } else
    return (
      <>
        {error ? (
          <p className='city'>Город не найден</p>
        ) : (
          <div>
            <p className='city'>{value}</p>
            <main className='today'>
              <div className='today_left'>
                <div className='temp_icon'>
                  <div className='today_temp'>
                    <img
                      src={`./assets/${today_list?.weather[0].icon}.png`}
                      width='70px'
                    />
                    <p>{`${today_list?.main.temp?.toFixed(1)}°`}</p>
                    <span>Сегодня</span>
                    <div className='time_city'>
                      <div className='time'>
                        Время: <Clock />
                        <Watch height='25' width='25' color='grey' />
                      </div>
                      <div> Город: {value}</div>
                    </div>
                  </div>
                  <div className='thermometr'>
                    <Thermometer
                      theme='light'
                      value={today_list?.main.temp}
                      max='40'
                      steps='4'
                      format='°C'
                      height='240'
                    />
                  </div>
                </div>
              </div>
              <div className='try'>
                <div className='today_right'>
                  <div className='lines'>
                    <ThermostatIcon className='right_icon' fontSize='large' />
                    <span>Температура</span>
                    <p>Ощущается как {today_list?.main.feels_like}°</p>
                  </div>
                  <div className='lines'>
                    <OpacityIcon className='right_icon' fontSize='large' />
                    <span>Давление</span>
                    <p>
                      {(today_list?.main.pressure * 0.75006375541921).toFixed(
                        0
                      )}{" "}
                      мм ртутного столба
                    </p>
                  </div>
                  <div className='lines'>
                    <WaterIcon className='right_icon' fontSize='large' />
                    <span>Осадки</span>
                    <p>
                      {today_list?.hasOwnProperty("rain")
                        ? today_list?.weather[0].description
                        : "Без осадков"}
                    </p>
                  </div>
                  <div className='lines'>
                    <AirIcon className='right_icon' fontSize='large' />
                    <span>Ветер</span>
                    <p>
                      {today_list?.wind.speed} м/c{" "}
                      {directions[Math.round(today_list?.wind.deg / 45) % 8]}
                    </p>
                  </div>
                </div>
              </div>
            </main>
            <div className='little_container'>
              {weather
                .filter((i, index) => {
                  if (index < 8) {
                    return i;
                  }
                })
                .map((i) => {
                  return (
                    <div className='little_item'>
                      <div>{i.dt_txt.slice(11, 16)}</div>
                      <div className='descImg'>
                        <img src={`./assets/${i?.weather[0].icon}.png`} />
                      </div>
                      <div className='temp'>
                        <b>
                          {i.main.temp_max > 0
                            ? `+${i.main.temp_max?.toFixed(1)}°`
                            : `${i.main.temp_max?.toFixed(1)}°`}
                        </b>
                      </div>
                      <div className='temp_span'>
                        {i.main.temp_min > 0
                          ? `+${i.main.temp_min?.toFixed(1)}°`
                          : `${i.main.temp_min?.toFixed(1)}°`}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className='container'>
              <div className='select'>
                <p>Выберите время:</p>
                <select onChange={get_time} className='select'>
                  <option value='00:00'>00:00</option>
                  <option value='03:00'>03:00</option>
                  <option value='06:00'>06:00</option>
                  <option value='09:00'>09:00</option>
                  <option value='12:00'>12:00</option>
                  <option value='15:00'>15:00</option>
                  <option value='18:00'>18:00</option>
                  <option value='21:00'>21:00</option>
                </select>
              </div>
              <div className='cards'>
                {weather
                  .filter((i) => i.dt_txt.slice(11, 16) === time)
                  .map((i, index) => {
                    const mas = i.dt_txt.slice(0, 10).split("-");
                    const day = getWeekDay(
                      new Date(+mas[0], +mas[1] - 1, +mas[2])
                    );
                    mas.reverse();
                    const strDate = `${+mas[0]} ${months[+mas[1] - 1]}`;
                    return (
                      <main className='item' key={index}>
                        <div className='weekDay'>{day}</div>
                        <hr />
                        <div className='date'>{strDate}</div>

                        <hr />
                        <div className='descImg'>
                          <img src={`./assets/${i?.weather[0].icon}.png`} />
                        </div>

                        <div className='temp'>
                          <b>
                            {i.main.temp_max > 0
                              ? `+${i.main.temp_max?.toFixed(1)}°`
                              : `${i.main.temp_max?.toFixed(1)}°`}
                          </b>
                        </div>
                        <div className='temp_span'>
                          {i.main.temp_min > 0
                            ? `+${i.main.temp_min?.toFixed(1)}°`
                            : `${i.main.temp_min?.toFixed(1)}°`}
                        </div>
                        <div className='descTxt'>
                          {i.weather[0].description}
                        </div>
                      </main>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default Data;
