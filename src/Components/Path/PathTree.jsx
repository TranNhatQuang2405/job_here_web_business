import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./PathTree.css"
function PathTree({ className }) {

    const location = useLocation();
    const [paths, setPaths] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        let stringPath = location.pathname
        let tmpPath = stringPath.split("/")
        tmpPath = tmpPath.filter(a => a && a.length > 0)
        setPaths(tmpPath)
    }, [location.pathname])

    const creatUrl = (child) => {
        let url = ""
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] !== child) {
                url += "/" + paths[i]
            }
            else {
                url += "/" + paths[i]
                break;
            }
        }
        return url;
    }

    return (
        <div className={className}>
            {paths.map((ele, index) => <Link to={creatUrl(ele)} className="path__link-style" key={index}>/ {t(ele)}</Link>)}
        </div>
    )
}

export default PathTree