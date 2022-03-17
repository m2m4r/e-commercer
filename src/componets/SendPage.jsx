import "../styles/form.css";
import { useSelector } from "react-redux";
import SendForm from "../commons/SendForm";

const SendPage = () => {
  const user = useSelector(state=>state.user)
  return user.id?(<SendForm user={user}/>):(<></>);
};

export default SendPage;