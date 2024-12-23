import React from "react";
import { getUserId } from "../reducks/users/selectors"; 
import { useSelector } from "react-redux";

const Home = () => {
   const selector = useSelector(state => state); // ReduxのfooksでRedux全体のstateを受け取る
   const uid = getUserId(selector); // ここでstoreのusersStateの中のuidが取得できる
   return (
      <div>
         <h2>Home</h2>
         <p>{uid}</p>
      </div>
   ) ;
};

export default Home;
