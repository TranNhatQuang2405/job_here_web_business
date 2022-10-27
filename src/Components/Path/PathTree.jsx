import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "./PathTree.css"
function PathTree({ className, lastPath }) {

    const location = useLocation();
    const [paths, setPaths] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        let stringPath = location.pathname
        let tmpPathString = stringPath.split("/")
        let tmpPath = []
        tmpPathString = tmpPathString.filter(a => a && a.length > 0)
        tmpPathString.forEach(x => tmpPath.push({ pathName: x, pathId: x }))
        if (tmpPath && tmpPath.length > 0) {
            let lastVar = tmpPath[tmpPath.length - 1].pathName
            let isNumeric = typeof (lastVar) === 'number'
                || (typeof (lastVar) === "string"
                    && lastVar.trim() !== '' && !isNaN(lastVar));
            if (isNumeric)
                tmpPath[tmpPath.length - 1].pathName = lastPath || tmpPath[tmpPath.length - 1]
        }
        setPaths(tmpPath)
    }, [lastPath, location.pathname])

    const creatUrl = (child) => {
        let url = ""
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] !== child) {
                url += "/" + paths[i].pathId
            }
            else {
                url += "/" + paths[i].pathId
                break;
            }
        }
        return url;
    }

    return (
        <div className={className}>
            {paths.map((ele, index) =>
                <Link to={creatUrl(ele)} className="path__link-style" key={index}>/ {t(ele.pathName)}</Link>)}
        </div>
    )
}

export default PathTree