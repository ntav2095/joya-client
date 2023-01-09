import { useEffect } from "react";
import { useSelector } from "react-redux";
import useLazyLoading from '../../hooks/uselazyLoading';

function Lazzy() {
const [lazzy]= useLazyLoading()
  const toggle = useSelector((state) => state.lazy.status);
  console.log("toggle", toggle);
  useEffect(()=>{
if(toggle){
lazzy()
}
  },[toggle])
  return <></>;
}
export default Lazzy;
