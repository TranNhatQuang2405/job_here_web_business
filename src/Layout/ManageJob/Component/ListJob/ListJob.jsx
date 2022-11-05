import React, { useEffect, useState } from 'react'
import { Table, FormCheck, Spinner } from 'react-bootstrap'
import { Avatar } from 'Components/Image'
import { jobBusiness } from 'Business'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Moment from 'moment';
import "./ListJob.css"
function ListJob({ companyId }) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [listJob, setListJob] = useState([])
    const createUrl = (id) => {
        return `/manageJob/jobInfo/${id}`
    }
    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            if (!loading)
                setLoading(true)
            let result = await jobBusiness.GetListJobManageByCompanyId(companyId);
            if (result.data.httpCode === 200) {
                let listTmp = result.data.objectData
                setListJob(listTmp);
                setLoading(false)
            } else {
                setListJob([]);
                setLoading(false)
            }
        };
        if (isSubscribed) first();
        return () => {
            isSubscribed = false;
        };
    }, [companyId]);
    return (
        <div className="listJob__parent fix_scroll">
            <Table striped bordered hover size="lg" responsive="sm">
                <thead>
                    <tr>
                        <th className="text-center listJob__item-center">#</th>
                        <th className="text-center listJob__item-center">
                            {t("business.manage.job.table.avatar")}
                        </th>
                        <th className="text-center listJob__item-center">
                            {t("business.manage.job.table.name")}
                        </th>
                        <th className="text-center listJob__item-center">
                            {t("business.manage.job.table.createdDate")}
                        </th>
                        <th className="text-center listJob__item-center">
                            {t("business.manage.job.table.endDate")}
                        </th>
                        <th className="text-center listJob__item-center">
                            {t("business.manage.job.table.totalAplly")}
                        </th>
                        <th className="text-center listJob__item-center">
                            {t("business.manage.job.table.status")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && listJob.length > 0 ? listJob.map((ele, index) => (
                        <tr key={index}>
                            <td className="text-center align-self-center listJob__item-center">
                                <div>{index + 1}</div>
                            </td>
                            <td className="text-center listJob__item-center">
                                <Avatar url={ele.avatarUrl} width="80px" className="mx-auto" />
                            </td>
                            <td className="listJob__item-center">
                                <Link to={createUrl(ele.jobId)} className="listJob__item-link">{ele.jobName}</Link>
                            </td>
                            <td className="text-center listJob__item-center">
                                <div>{Moment(ele.createDate).format('DD/MM/YYYY')}</div>
                            </td>
                            <td className="text-center listJob__item-center">
                                <div>{Moment(ele.endDate).format('DD/MM/YYYY')}</div>
                            </td>
                            <td className="text-center listJob__item-center">
                                <div>{ele.totalApplicant}</div>
                            </td>
                            <td className="text-center listJob__item-center">
                                <FormCheck type="switch" checked={ele.isActive} disabled />
                            </td>
                        </tr>
                    )) :
                        !loading && listJob.length === 0 ?
                            <tr className="text-center">
                                <td colSpan={100}><div>{t("business.manage.company.table.nothing")}</div></td>
                            </tr>
                            :
                            <tr className="text-center">
                                <td colSpan={100}> <Spinner animation="border" /></td>
                            </tr>
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ListJob