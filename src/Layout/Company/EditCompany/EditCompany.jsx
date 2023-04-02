import { PathTree } from "Components/Path";
import { CompanyLogo } from "Components/Company";
import { Row, Col, Container, Form, Spinner, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { PencilSquare, Check2, X } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { companyBusiness, uploadBusiness } from "Business";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingPage } from "Layout/Common";
import { EditHeaderModal } from "./Component";
import { InputTextModal, AlertModal } from "Components/Modal";
import company_default_background from "Assets/Images/company_default_background.jpg";
import "./EditCompany.css"

function EditCompany() {

    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [companyInfo, setCompanyInfo] = useState({})
    const [showEditHeader, setShowEditHeader] = useState(false)
    const [showEditContent, setShowEditContent] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingSave, setLoadingSave] = useState(false)

    const [uploadPending, setUploadPending] = useState({
        avatar: false,
        background: false
    })
    const [showAlert, setShowAlert] = useState({
        show: false,
        message: "",
        title: t("business.company.editCompanyTitle"),
        httpCode: 200
    })


    const handleResult = () => {
        setShowAlert({
            show: false,
            message: "",
            title: t("business.company.editCompanyTitle"),
            httpCode: 200
        })
    }

    const handleClose = () => {
        navigate(`/manageCompany/companyInfo/${companyInfo.companyId}`)
    }

    const handleChangeDescription = (data) => {
        setCompanyInfo(prev => {
            return {
                ...prev,
                description: data
            }
        })
        setShowEditContent(false)
    }

    const handleCloseModalEditHeader = (data) => {
        setCompanyInfo(prev => {
            return {
                ...prev,
                ...data
            }
        })
        setShowEditHeader(false)
    }

    const handleChangeAvatar = async (e) => {
        if (e.target.files.length > 0) {
            setUploadPending(prev => {
                return {
                    ...prev,
                    avatar: true
                }
            })
            let result = await uploadBusiness.UploadImage(e.target.files[0])
            if (result && result.data.httpCode === 200) {
                setCompanyInfo((prev) => {
                    const url = result.data.objectData.url
                    return {
                        ...prev,
                        avatarUrl: url
                    };
                });
            }
            else {

            }
            setUploadPending(prev => {
                return {
                    ...prev,
                    avatar: false
                }
            })

        }
    };

    const handleChangeBackground = async (e) => {
        if (e.target.files.length > 0) {
            setUploadPending(prev => {
                return {
                    ...prev,
                    background: true
                }
            })
            let result = await uploadBusiness.UploadImage(e.target.files[0])
            if (result && result.data.httpCode === 200) {
                setCompanyInfo((prev) => {
                    const url = result.data.objectData.url
                    return {
                        ...prev,
                        backgroundUrl: url
                    };
                });
            }
            else {

            }
            setUploadPending(prev => {
                return {
                    ...prev,
                    background: false
                }
            })

        }
    };

    const handleSave = async () => {
        setLoadingSave(true)
        let result = await companyBusiness.UpdateCompany(companyInfo)
        setLoadingSave(false)
        setShowAlert({
            show: true,
            message: result.data.message,
            title: t("business.company.editCompanyTitle"),
            httpCode: result.data.httpCode
        })
    }

    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            let stringPath = location.pathname
            let tmpPath = stringPath.split("/")
            let companyId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0
            let result = await companyBusiness.GetCompanyInfo(companyId);
            if (result.data.httpCode === 200) {
                setCompanyInfo(result.data.objectData)
            } else {
                setCompanyInfo({})
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
        <Form>
            <AlertModal data={showAlert} onHide={handleResult} />
            <PathTree lastPath={companyInfo.companyName} />
            <div className="editCompany__button-bound">
                <Button className="me-3" variant="danger" onClick={handleClose}>
                    <X color="white" size="25" />
                    <span className="manageCompany__buttonAdd-content">{t("business.company.edit.btnCancel")}</span>
                </Button>

                <Button onClick={handleSave} disabled={loadingSave}>
                    {
                        loadingSave ?
                            <Spinner animation="border" /> :
                            <>
                                <Check2 color="white" size="25" />
                                <span className="manageCompany__buttonAdd-content">{t("business.company.edit.btnSave")}</span>
                            </>
                    }
                </Button>
            </div>
            <EditHeaderModal companyInfoParent={companyInfo} show={showEditHeader} handleClose={handleCloseModalEditHeader} />
            <div className="companyInfo__header">

                <div className="CompanyPage__header jh-container jh-box-item mb-3">
                    <div className="CompanyPage__cover-wrapper">
                        <input type="file" className="d-none" id="background" name="background" onChange={handleChangeBackground} />
                        <Form.Label htmlFor="background" className="editCompany__lableBackGround">
                            <PencilSquare size="25" color="black" />
                        </Form.Label>
                        <img
                            src={companyInfo.backgroundUrl || company_default_background}
                            alt=""
                            width="100%"
                            height="236px"
                        />
                    </div>
                    <div className="CompanyPage__company-detail-overview">
                        <div className="CompanyPage__company-logo">
                            <input type="file" className="d-none" id="avatar" name="avatar" onChange={handleChangeAvatar} />
                            <CompanyLogo
                                src={companyInfo.avatarUrl}
                                alt={companyInfo?.companyName || ""}
                                size={130}
                            >
                                <div>
                                    <Form.Label htmlFor="avatar" className="editCompany__lableAvatar">
                                        <PencilSquare size="25" color="black" />
                                    </Form.Label>
                                </div>
                                {
                                    uploadPending.avatar ?
                                        <div className="editCompany__loadingAvatar">
                                            <Spinner animation="border" variant="light" className="editCompany__loadingAvatar-child" />
                                        </div> : <></>
                                }
                            </CompanyLogo>
                        </div>
                        <div className="CompanyPage__company-header-info flex-grow-1">
                            <h1 className="CompanyPage__company-detail-name text-highlight">
                                {companyInfo?.companyName || ""}
                            </h1>
                            <div className="d-flex">
                                {!!companyInfo.urlCompany && (
                                    <p className="CompanyPage__website">
                                        <i className="bi bi-house-door-fill" />{" "}
                                        <a
                                            href={companyInfo.valid_urlCompany}
                                            rel="noreferrer"
                                        >
                                            {companyInfo.urlCompany || t("business.company.info.noUrl")}
                                        </a>
                                    </p>
                                )}
                                {!!companyInfo.email && (
                                    <p className="CompanyPage__company-size">
                                        <i className="bi bi-envelope-fill" /> {companyInfo.email}
                                    </p>
                                )}
                                {!!companyInfo.size && (
                                    <p className="CompanyPage__company-size">
                                        <i className="bi bi-people-fill" /> {companyInfo.size} {t("Employee")}
                                    </p>
                                )}
                            </div>
                            <div>
                                <div className="editCompany__editHeader" onClick={() => setShowEditHeader(true)}>
                                    <PencilSquare size="25" color="black" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <InputTextModal
                content={companyInfo.description}
                title={t("business.company.edit.content.title")}
                show={showEditContent}
                handleDone={handleChangeDescription}
                handleClose={() => setShowEditContent(false)} />
            <div className="editCompany__content-bound">
                <Container className="companyInfo__body mb-3" fluid>
                    <Row>
                        <Col className="companyInfo__body-left">
                            <div>
                                <div className="companyInfo__body-title">
                                    <span className="companyInfo__body-title-line"></span>
                                    {t("business.company.info.about")}
                                </div>
                                <div className="companyInfo__body-content" dangerouslySetInnerHTML={{ __html: companyInfo.description || t("business.company.info.noDescription") }} >
                                </div>
                                <div className="editCompany__editContent" onClick={() => setShowEditContent(true)}>
                                    <PencilSquare size="25" color="black" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Form>
    );
}

export default EditCompany;
