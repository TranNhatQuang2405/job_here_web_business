import React, { useEffect, memo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { PathTree } from 'Components/Path';
import { jobBusiness, dropdownBusiness } from 'Business';
import "./JobInfo.css"
import { LoadingPage } from 'Layout/Common';
import { Avatar } from 'Components/Image';
function JobInfo() {

    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [jobInfo, setJobInfo] = useState({})
    console.log(jobInfo)
    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            let stringPath = location.pathname
            let tmpPath = stringPath.split("/")
            let jobId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0
            let prepare = []
            prepare.push(dropdownBusiness.UnitDropdown());
            prepare.push(dropdownBusiness.ExperienceDropdown());
            prepare.push(dropdownBusiness.JobtypeDropdown());
            prepare.push(dropdownBusiness.TitleDropdown());
            prepare.push(jobBusiness.GetJobInfo(jobId));
            let results = await Promise.all(prepare)
            if (!results.find(x => x.data.httpCode !== 200)) {
                setJobInfo(results[4].data.objectData)
            }
            setLoading(false)

        };
        if (isSubscribed) first();
        return () => {
            isSubscribed = false;
        };
    }, [location.pathname])
    if (loading)
        return <LoadingPage />
    return (
        <div>
            <PathTree lastPath={jobInfo.jobName} />
            <div className="jobInfo__header">
                <Avatar width="120px" />
                <div className="jobInfo__header-content">
                    <div className="jobInfo__header-content-jobName">{jobInfo.jobName}</div>
                    <div className="jobInfo__header-content-companyName">ALo</div>
                    <div className="jobInfo__header-content-date">aaa</div>
                </div>
            </div>
            <div className="jobInfo__body"></div>
        </div>
    )
}

export default memo(JobInfo)