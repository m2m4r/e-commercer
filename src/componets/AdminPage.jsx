import AdminRow from "../commons/AdminRow"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import TalleRow from "../commons/TalleRow"

const AdminPage = function(){
    const URL = useLocation().pathname
    const ProductList = useSelector(state=>state.admin)
    return (
    <>
        <div id="adminMargen" class="container">
            <div class="row">
                <div class="col-md-1">ID</div>
                <div class="col-md-2">MARCA</div>
                <div class="col-md-6">MODELO</div>
                <div class="col-md-2">PRECIO</div>
                <div class="col-md-1">DETALLES</div>
            </div>
            {ProductList && ProductList.map((item , i)=>(<AdminRow key={i} producto={item}/>))}
        </div>
    </>
    )
}

export default AdminPage