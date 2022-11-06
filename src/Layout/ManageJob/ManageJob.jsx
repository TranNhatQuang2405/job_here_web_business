import React, { memo, useState, useEffect } from 'react'
import { PathTree } from 'Components/Path'
import { Button, Form } from 'react-bootstrap'
import { PlusCircleFill } from 'react-bootstrap-icons'
import { companyBusiness } from 'Business'
import "./ManageJob.css"
import { useTranslation } from 'react-i18next'
import { ListJob } from './Component'
import { LoadingPage } from 'Layout/Common'
import { useNavigate } from 'react-router-dom'
function ManageJob() {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [listCompany, setListCompany] = useState([{ companyId: 0, companyName: "All" }])
    const { t } = useTranslation()
    const [currentCompany, setCurrentCompany] = useState(0)
    const changeCompany = (e) => {
        let id = e.target.value
        setCurrentCompany(id)
    }

    const handleAddJob = () => {
        navigate("/manageJob/addJob")
    }

    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            let result = await companyBusiness.GetListCompanyOwner();
            if (result.data.httpCode === 200) {
                let listTmp = result.data.objectData
                listTmp.unshift({ companyId: 0, companyName: "All" })
                setListCompany(listTmp);
                setLoading(false)
            } else {
                setListCompany([]);
                setLoading(false)
            }
        };
        if (isSubscribed) first();
        return () => {
            isSubscribed = false;
        };
    }, []);

    if (loading)
        return <LoadingPage />
    return (
        <div>
            <div className="manageJob__header-layout">
                <PathTree className="d-none d-lg-block" />

                <div className="manageJob__buttonAdd-layout" >
                    <div className="manageJob__dropdownCompany">
                        <Form.Select onChange={changeCompany} value={currentCompany}>
                            {
                                listCompany.map((x, index) => <option key={index} value={x.companyId}>{x.companyName}</option>)
                            }
                        </Form.Select>
                    </div>
                    <Button onClick={handleAddJob}>
                        <PlusCircleFill size="25" color="aliceblue" />
                        <span className="manageJob__buttonAdd-content">{t("business.manage.job.add")}</span>
                    </Button>
                </div>
            </div>

            <h2 className='text-center mt-3 mb-3'>{t("business.manage.job.title")}</h2>
            <ListJob companyId={currentCompany} />
        </div>

    )
}

export default memo(ManageJob)