import React, { useState } from 'react'
import "./index.less"

import { UserSwitchOutlined, SendOutlined, CloseOutlined, ShakeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// 异常与错误
import Ees from "../../components/ees"
import Jspe from "../../components/jspe"
import Reject from "../../components/reject"
import Rse from "../../components/rse"

// 接口
import Is from "../../components/is"
import Rs from "../../components/rs"
import Rf from "../../components/rf"

// 访客与访问量
import Vvs from "../../components/vvs"
import Uv from "../../components/uv"
import Pv from "../../components/pv"

// 性能指标
import Pis from "../../components/pis"
import Dom from "../../components/dom"
import Dns from "../../components/dns"
import Fp from "../../components/fp"
import Fcp from "../../components/fcp"
import Ws from "../../components/ws"

const echartsAr = [
    <Ees></Ees>, <Jspe></Jspe>, <Reject></Reject>, 
    <Rse></Rse>, <Is></Is>, <Rs></Rs>, <Rf></Rf>,
    <Vvs></Vvs>,<Uv></Uv>,<Pv></Pv>,
    <Pis></Pis>,<Dom></Dom>,<Dns></Dns>,
    <Fp></Fp>,<Fcp></Fcp>,<Ws></Ws>
]


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('异常与错误', 'sub1', <CloseOutlined />, [
        getItem('汇总', '1'),
        getItem('js语法错误', '2'),
        getItem('未捕获reject', '3'),
        getItem('资源加载异常', '4'),
    ]),
    getItem('接口', 'sub2', <SendOutlined />, [
        getItem('汇总', '5'),
        getItem('请求成功', '6'),
        getItem('请求失败', '7'),
    ]),
    getItem('用户行为数据', 'sub3', <UserSwitchOutlined />, [
        // getItem('汇总', '8'),
        getItem('访客与访问量', '9'),
        getItem('页面停留时间', '10'),
    ]),
    getItem('性能指标', 'sub4', <ShakeOutlined />, [
        getItem('汇总', '11'),
        getItem('DOM Ready', '12'),
        getItem('DNS解析', '13'),
        getItem('FP', '14'),
        getItem('FCP', '15'),
        getItem('白屏', '16'),
    ]),
];

const App = () => {
    const [menuIndex, setMenuIndex] = useState(1)



    console.log(menuIndex)
    const onClick = (e) => {
        setMenuIndex(e.key * 1)
    };

    return (
        <div className='index'>
            <Menu className='index-menu'
                onClick={onClick}
                style={{
                    width: 255,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
            <div>
                {echartsAr[menuIndex - 1]}
            </div>
        </div>

    );
};

export default App;
