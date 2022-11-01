import { Avatar } from "Components/Image";
import { PathTree } from "Components/Path";
import { Row, Col, Container, Form, Spinner, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import background from "Assets/Images/background.jpg"
import "./EditCompany.css"
import { Link45deg, Building, GeoAltFill, PencilSquare, Envelope, Check2, X } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { companyBusiness, uploadBusiness } from "Business";
import { useLocation } from "react-router-dom";
import { LoadingPage } from "Layout/Common";
import { EditHeaderModal } from "./Component";
function EditCompany() {

    const { t } = useTranslation();
    const location = useLocation();
    const [companyInfo, setCompanyInfo] = useState({})
    const [showEditHeader, setShowEditHeader] = useState(false)
    const [loading, setLoading] = useState(true)
    const [uploadPending, setUploadPending] = useState({
        avatar: false,
        background: false
    })


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
            <PathTree lastPath={companyInfo.companyName} />
            <div className="editCompany__button-bound">
                <Button className="me-3" variant="danger">
                    <X color="white" size="25" />
                    <span className="manageCompany__buttonAdd-content">{t("business.company.edit.btnCancel")}</span>
                </Button>
                <Button>
                    <Check2 color="white" size="25" />
                    <span className="manageCompany__buttonAdd-content">{t("business.company.edit.btnSave")}</span>
                </Button>
            </div>
            <EditHeaderModal companyInfoParent={companyInfo} show={showEditHeader} handleClose={handleCloseModalEditHeader} />
            <div className="companyInfo__header">
                <div>
                    <input type="file" className="d-none" id="background" name="background" onChange={handleChangeBackground} />
                    <img src={companyInfo.backgroundUrl || `${background}`} alt="BACKGROUND" className="companyInfo__header-background">
                    </img>
                    <Form.Label htmlFor="background" className="editCompany__lableBackGround">
                        <PencilSquare size="25" color="black" />
                    </Form.Label>
                </div>
                <div className="companyInfo__header-content-bound">
                    <input type="file" className="d-none" id="avatar" name="avatar" onChange={handleChangeAvatar} />
                    <Avatar width="150px" url={companyInfo.avatarUrl} className="companyInfo__header-avatar" >
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
                    </Avatar>
                    <Row className="companyInfo__header-content">
                        <Col lg={12} className="companyInfo__header-companyName">{companyInfo.companyName}</Col>
                        <Col lg={4} xs={12} className="companyInfo__header-text">
                            <Link45deg size={20} className="me-2" />
                            <span>{companyInfo.urlCompany || t("business.company.info.noUrl")}</span>
                        </Col>
                        <Col lg={4} xs={12} className="companyInfo__header-text">
                            <Building size={20} className="me-2" />
                            <span>{companyInfo.size || t("business.company.info.noSize")}</span>
                        </Col>
                        <Col lg={12} xs={12} className="companyInfo__header-text">
                            <GeoAltFill size={20} className="me-2" />
                            <span>{companyInfo.address || t("business.company.info.noAddress")}</span>
                        </Col>
                        <Col lg={12} xs={12} className="companyInfo__header-text">
                            <Envelope size={20} className="me-2" />
                            <span>{companyInfo.email || t("business.company.info.noAddress")}</span>
                        </Col>
                        <div>
                            <div className="editCompany__editHeader" onClick={() => setShowEditHeader(true)}>
                                <PencilSquare size="25" color="black" />
                            </div>
                        </div>
                    </Row>
                </div>

            </div>
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
                                <div className="editCompany__editContent">
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
