import Index from "../pages/index";

// 异常与错误
import Ees from "../components/ees"
import Jspe from "../components/jspe"
import Reject from "../components/reject"
import Rse from "../components/rse"

// 接口
import Is from "../components/is"
import Rs from "../components/rs"
import Rf from "../components/rf"

// 访客与访问量
import Vvs from "../components/vvs"
import Uv from "../components/uv"
import Pv from "../components/pv"

// 性能指标
import Pis from "../components/pis"
import Dom from "../components/dom"
import Dns from "../components/dns"
import Fp from "../components/fp"
import Fcp from "../components/fcp"


export default[
    {
        path:'/',element:<Index />,
        children:[
            {path:"ees",element:<Ees></Ees>},
            {path:"jspe",element:<Jspe></Jspe>}
        ]
    },

]