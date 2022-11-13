import React, { memo, useEffect, useState } from "react";
import { Table, FormCheck, Spinner } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import { companyBusiness } from "Business";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import Avatar from "Components/Image/Avatar/Avatar";
import "./ListCompany.css";
import Moment from 'moment';
import { ConfirmModal, AlertModal } from "Components/Modal";

function ListCompany() {
    const [listCompany, setListCompany] = useState([]);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false)
    const [reRender, setReRender] = useState(0)
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: "",
        title: t("business.manage.company.delete"),
        httpCode: 200
    })
    const [companyId, setCompanyId] = useState(0)
    const createUrl = (id) => {
        return `/manageCompany/companyInfo/${id}`
    }
    const handleCloseAlert = () => {
        setShowAlert({
            show: false,
            message: "",
            title: t("business.manage.company.delete"),
            httpCode: 200
        })
    }

    const handleShowConfirm = (id) => {
        setCompanyId(id)
        setShowConfirm(true)
    }

    const handleDelete = async () => {
        let result = await companyBusiness.DeleteCompany(companyId)
        if (result) {
            setShowAlert({
                show: true,
                message: result.data.message,
                title: t("business.manage.company.delete"),
                httpCode: result.data.httpCode
            })
        } else {
            setShowAlert({
                show: true,
                message: t("business.manage.company.delete.fail"),
                title: t("business.manage.company.delete"),
                httpCode: 400
            })
        }
        setShowConfirm(false)
        setReRender(prev => prev + 1)
    }

    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            setLoading(true)
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
    }, [reRender]);
    return (
        <>
            <ConfirmModal
                show={showConfirm}
                title={t("business.manage.company.delete.title")}
                content={t("business.manage.company.delete.content")}
                handleClose={() => setShowConfirm(false)}
                handleSuccess={handleDelete}
            />
            <AlertModal
                data={showAlert}
                onHide={handleCloseAlert} />

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
                        <th className="text-center listCompany__item-center">
                            {t("business.manage.company.table.delete")}
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
                                <Avatar url={ele.avatarUrl} width="80px" className="mx-auto" />
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
                            <td className="text-center listCompany__item-center">
                                <TrashFill size={30} className="cur-pointer" onClick={() => handleShowConfirm(ele.companyId)} />
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
            </Table>
        </>

    );
}

export default memo(ListCompany);
