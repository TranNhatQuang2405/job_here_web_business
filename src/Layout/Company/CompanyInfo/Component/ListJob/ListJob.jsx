import React, { useEffect, useState } from 'react'
import { companyBusiness, dropdownBusiness } from 'Business';
import { Spinner } from 'react-bootstrap';
import ListJobItem from '../ListJobItem/ListJobItem';
function ListJob(props) {
    const { companyId } = props
    const [loading, setLoading] = useState(true)
    const [listJob, setListJob] = useState([])
    // const [listCity, setListCity] = useState([])
    // const [listUnit, setListUnit] = useState([])

    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            let prepare = []
            prepare.push(companyBusiness.GetAllJobOfCompany(companyId))
            prepare.push(dropdownBusiness.UnitDropdown());
            let results = await Promise.all(prepare)
            if (!results.find(x => x.data.httpCode !== 200)) {
                let listUnit = results[1].data.objectData
                let listJobTmp = results[0].data.objectData
                let last = listJobTmp.map(e => {
                    let unit = listUnit.find(x => x.unit === e.unit)
                    if (unit)
                        e.unitName = unit.unitName
                    return e
                })
                setListJob(last)
            } else {
                setListJob([])
            }
            setLoading(false)
        };
        if (isSubscribed) first();
        return () => {
            isSubscribed = false;
        };
    }, [companyId])
    if (loading)
        return <div className='w-100 d-flex'><Spinner animation="border" className='mx-auto' /></div>
    return (
        <div>
            {listJob.map(e => <ListJobItem data={e} key={e.jobId} />)}
        </div>
    )
}

export default React.memo(ListJob)