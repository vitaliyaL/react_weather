import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
   body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
   }
   .item, .little_item,.today_left, .try{
      background: ${({ theme }) => theme.item};
      color: ${({ theme }) => theme.item_txt};
     }
   .today_right{
      color: ${({ theme }) => theme.item_txt};
     }
   select,.btn,input{
      background: ${({ theme }) => theme.select};
      color: ${({ theme }) => theme.select_txt};
   }
   .today_temp p{
      color: ${({ theme }) => theme.temp_txt};
   }
   .city{
      color: ${({ theme }) => theme.city_txt};
   }
   .lines span, .time_city{
      color: ${({ theme }) => theme.line_txt};
   }
   .container, .little_container{
      background: ${({ theme }) => theme.container};
   }
`;
