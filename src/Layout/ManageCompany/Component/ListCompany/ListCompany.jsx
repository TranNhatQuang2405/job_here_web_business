import React, { memo, useEffect, useState } from "react";
import { Table, FormCheck, Spinner } from "react-bootstrap";
import { companyBusiness } from "Business";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import Avatar from "Components/Image/Avatar/Avatar";
import "./ListCompany.css";
import Moment from 'moment';

function ListCompany() {
    const [listCompany, setListCompany] = useState([]);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true)

    const createUrl = (id) => {
        return `/manageCompany/companyInfo/${id}`
    }

    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            let result = await companyBusiness.GetListCompanyOwner();
            if (result.data.httpCode === 200) {
                setListCompany(result.data.objectData);
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
    return (
        <Table striped bordered hover size="lg" responsive="sm">
            <thead>
                <tr>
                    <th className="text-center listCompany__item-center">#</th>
                    <th className="text-center listCompany__item-center">
                        {t("business.manage.company.table.avatar")}
                    </th>
                    <th className="text-center listCompany__item-center">
                        {t("business.manage.company.table.name")}
                    </th>
                    <th className="text-center listCompany__item-center">
                        {t("business.manage.company.table.createdDate")}
                    </th>
                    <th className="text-center listCompany__item-center">
                        {t("business.manage.company.table.size")}
                    </th>
                    <th className="text-center listCompany__item-center">
                        {t("business.manage.company.table.totalJob")}
                    </th>
                    <th className="text-center listCompany__item-center">
                        {t("business.manage.company.table.status")}
                    </th>
                </tr>
            </thead>
            <tbody>
                {!loading && listCompany.length > 0 ? listCompany.map((ele, index) => (
                    <tr key={index}>
                        <td className="text-center align-self-center listCompany__item-center">
                            <div>{index + 1}</div>
                        </td>
                        <td className="text-center listCompany__item-center">
                            <Avatar src={ele.avatarUrl} width="80px" className="mx-auto" />
                        </td>
                        <td className="listCompany__item-center">
                            <Link to={createUrl(ele.companyId)} className="listCompany__item-link">{ele.companyName}</Link>
                        </td>
                        <td className="text-center listCompany__item-center">
                            <div>{Moment(ele.createdDate).format('DD/MM/YYYY')}</div>
                        </td>
                        <td className="text-center listCompany__item-center">
                            <div>{ele.size}</div>
                        </td>
                        <td className="text-center listCompany__item-center">
                            <div>{ele.totalJob}</div>
                        </td>
                        <td className="text-center listCompany__item-center">
                            <FormCheck type="switch" checked={ele.isActive} disabled />
                        </td>
                    </tr>
                )) :
                    !loading && listCompany.length === 0 ?
                        <tr className="text-center">
                            <td colSpan={100}><div>{t("business.manage.company.table.nothing")}</div></td>
                        </tr>
                        :
                        <tr className="text-center">
                            <td colSpan={100}> <Spinner animation="border" /></td>
                        </tr>
                }
            </tbody>
        </Table >
    );
}

export default memo(ListCompany);
