import { PathTree } from 'Components/Path'
import React, { useState, useEffect } from 'react'
import { Col, Form, InputGroup, Row, Spinner, Dropdown, Button } from 'react-bootstrap'
import { dropdownBusiness, companyBusiness, jobBusiness } from 'Business'
import { LoadingPage } from 'Layout/Common'
import { AlertModal, InputTextModal } from 'Components/Modal'
import Moment from 'moment';
import { useTranslation } from 'react-i18next'
import "./AddJob.css"
import { useNavigate } from 'react-router-dom'
function AddJob() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [listCompany, setListCompany] = useState([])
    const [saving, setSaving] = useState(false)
    const [master, setMaster] = useState({})
    const [showEditContent, setShowEditContent] = useState(0)
    const [jobInfo, setJobInfo] = useState({
        title: "",
        companyId: "",
        jobName: "",
        cityId: "",
        gender: "",
        industry: 0,
        skill: "",
        amount: 1,
        description: "",
        benefit: "",
        require: "",
        salaryMin: 0,
        salaryMax: 0,
        unit: "",
        startDate: Moment(Date.now()).format('yyyy-MM-DD'),
        endDate: Moment(Date.now()).format('yyyy-MM-DD'),
    })
    const [loading, setLoading] = useState(true)
    const [loadSkill, setLoadSkill] = useState(false)
    const [listSkill, setListSkill] = useState([])
    const [listSkillSave, setListSkillSave] = useState([])
    const [alert, setAlert] = useState({
        title: "",
        message: "",
        show: false,
        httpCode: 200
    })
    const handleChange = (event) => {
        const { id, value } = event.target;
        setJobInfo((prev) => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    const handleCheck = (e, skill) => {
        e.stopPropagation()
        let skillTmp = listSkillSave.find(x => x.skillId === skill.skillId)
        if (!skillTmp) {
            setListSkillSave(prev => [...prev, skill])
        }
    }

    const handleChangeText = (content) => {
        if (showEditContent === 1) {
            setJobInfo((prev) => {
                return {
                    ...prev,
                    description: content
                }
            })
        } else if (showEditContent === 2) {
            setJobInfo((prev) => {
                return {
                    ...prev,
                    require: content
                }
            })
        } else if (showEditContent === 3) {
            setJobInfo((prev) => {
                return {
                    ...prev,
                    benefit: content
                }
            })
        }
        setShowEditContent(0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        let experienceSave = []
        master.experience.forEach(x => {
            if (x.checked === true)
                experienceSave.push(x.experience)
        })
        let jobTypeSave = []
        master.jobType.forEach(x => {
            if (x.checked === true)
                jobTypeSave.push(x.jobType)
        })
        let skillSave = listSkillSave.map(x => x.skillId)

        if (experienceSave.length === 0) {
            setAlert({
                title: t("business.manage.addJob.error.experience.title"),
                message: t("business.manage.addJob.error.experience"),
                show: true,
                httpCode: 400
            })
        } else if (jobTypeSave.length === 0) {
            setAlert({
                title: t("business.manage.addJob.error.jobType.title"),
                message: t("business.manage.addJob.error.jobType"),
                show: true,
                httpCode: 400
            })
        } else if (skillSave.length === 0) {
            setAlert({
                title: t("business.manage.addJob.error.skill.title"),
                message: t("business.manage.addJob.error.skill"),
                show: true,
                httpCode: 400
            })
        } else {
            let jobInfoCreate = {
                ...jobInfo,
                experiences: experienceSave,
                jobTypes: jobTypeSave,
                skillIds: skillSave,
                startDate: Moment(jobInfo.startDate).format("yyyy/MM/DD"),
                endDate: Moment(jobInfo.endDate).format("yyyy/MM/DD"),
            }
            console.log(jobInfoCreate)
            let result = await jobBusiness.CreateJob(jobInfoCreate)
            if (result && result.data) {
                setAlert({
                    title: t("business.manage.addJob.create.title"),
                    message: result.data.message,
                    show: true,
                    httpCode: result.data.httpCode
                })
            }
        }
        setSaving(false)
    }

    const hideAlert = () => {
        setAlert({
            title: "",
            message: "",
            show: false,
            httpCode: 200
        })
    }

    const handleRemove = (skillId) => {
        let listSkillTmp = listSkillSave ? listSkillSave.filter(x => x.skillId !== skillId) : []
        setListSkillSave([...listSkillTmp])
    }

    const handleChangeIndustry = async (event) => {
        const { value } = event.target;
        handleChange(event)
        setLoadSkill(true)
        const result = await dropdownBusiness.SkillDropdown(value)
        if (result && result.data && result.data.httpCode === 200) {
            let listTmp = result.data.objectData
            setListSkill(listTmp)
            setLoadSkill(false)
        }
    }

    const handleCheckExperience = (e) => {
        let value = e.target.value
        let checked = e.target.checked
        let arrayEx = master.experience
        arrayEx.forEach(x => {
            if (x.experience === value) {
                x.checked = checked
            }
        })
        setMaster(prev => {
            return {
                ...prev,
                experience: [...arrayEx]
            }
        })
    }
    const handleCheckJobType = (e) => {
        let value = e.target.value
        let checked = e.target.checked
        let arrayEx = master.jobType
        arrayEx.forEach(x => {
            if (x.jobType === value) {
                x.checked = checked
            }
        })
        setMaster(prev => {
            return {
                ...prev,
                jobType: [...arrayEx]
            }
        })
    }


    useEffect(() => {
        let isSubscribed = true;
        const first = async () => {
            let prepare = []
            prepare.push(dropdownBusiness.UnitDropdown());
            prepare.push(dropdownBusiness.ExperienceDropdown());
            prepare.push(dropdownBusiness.JobtypeDropdown());
            prepare.push(dropdownBusiness.TitleDropdown());
            prepare.push(dropdownBusiness.CityDropdown());
            prepare.push(dropdownBusiness.GenderDropdown());
            prepare.push(dropdownBusiness.IndustryDropdown());
            prepare.push(companyBusiness.GetListCompanyOwner())
            let results = await Promise.all(prepare)
            if (!results.find(x => x.data.httpCode !== 200)) {
                let unit = results[0].data.objectData
                let experience = results[1].data.objectData
                let jobType = results[2].data.objectData
                let title = results[3].data.objectData
                let city = results[4].data.objectData
                let gender = results[5].data.objectData
                let industry = results[6].data.objectData
                let companyTmp = results[7].data.objectData
                experience.forEach(element => {
                    element.checked = false
                });
                jobType.forEach(element => {
                    element.checked = false
                });
                setMaster({
                    unit: unit,
                    experience: experience,
                    jobType: jobType,
                    title: title,
                    city: city,
                    gender: gender,
                    industry: industry
                })
                setListCompany(companyTmp)
            }
            setLoading(false)

        };
        if (isSubscribed) first();
        return () => {
            isSubscribed = false;
        };
    }, [])

    if (loading)
        return <LoadingPage />
    return (
        <div>
            <PathTree />
            <AlertModal data={alert} onHide={hideAlert} />
            <div>
                <h3 className="text-center">{t("business.manage.addJob.title")}</h3>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="mb-2">
                        <Form.Label htmlFor="companyId">{t("business.company.add.companyName")}</Form.Label>
                        <Form.Select onChange={handleChange} id="companyId" value={jobInfo.companyId} required>
                            <option disabled value={""} hidden>{t("business.manage.addJob.companyName")}</option>
                            {
                                listCompany.map((x, index) => <option key={index} value={x.companyId}>{x.companyName}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} className="mb-2">
                        <Form.Label htmlFor="jobName">{t("business.manage.addJob.jobName.label")}</Form.Label>
                        <InputGroup>
                            <Form.Control
                                onChange={handleChange}
                                id="jobName"
                                placeholder={t("business.manage.addJob.jobName")}
                                value={jobInfo.jobName}
                                required
                            />
                        </InputGroup>
                    </Col>
                    <Col lg={4} className="mb-2">
                        <Form.Label htmlFor="title">{t("business.manage.addJob.titleInput.label")}</Form.Label>
                        <Form.Select onChange={handleChange} id="title" value={jobInfo.title} required>
                            <option disabled value={""} hidden>{t("business.manage.addJob.titleInput")}</option>
                            {
                                master && master.title && master.title.map((x, index) => <option key={index} value={x.title}>{x.titleName}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} className="mb-2">
                        <Form.Label htmlFor="address">{t("business.manage.addJob.address.label")}</Form.Label>
                        <InputGroup>
                            <Form.Control
                                onChange={handleChange}
                                id="address"
                                placeholder={t("business.manage.addJob.address")}
                                value={jobInfo.address}
                                required
                            />
                        </InputGroup>
                    </Col>
                    <Col lg={4} className="mb-2">
                        <Form.Label htmlFor="cityId">{t("business.manage.addJob.city.label")}</Form.Label>
                        <Form.Select onChange={handleChange} id="cityId" value={jobInfo.cityId}>
                            <option disabled value={""}>{t("business.manage.addJob.city")}</option>
                            {
                                master && master.city && master.city.map((x, index) => <option key={index} value={x.cityId}>{x.cityName}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8} className="mb-2">
                        <Form.Label htmlFor="experiences">{t("business.manage.addJob.experiences.label")}</Form.Label>
                        <Row>
                            {
                                master && master.experience && master.experience.map((x, k) =>
                                    <Col lg={4} xs={6} key={k}>
                                        <Form.Check
                                            onChange={handleCheckExperience}
                                            type="checkbox"
                                            checked={x.checked}
                                            label={x.experienceName}
                                            value={x.experience}
                                            name="experiences"
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                    <Col lg={4} className="mb-2">
                        <Form.Label htmlFor="gender">{t("business.manage.addJob.gender.label")}</Form.Label>
                        <Form.Select onChange={handleChange} id="gender" value={jobInfo.gender} required>
                            <option disabled value={""}>{t("business.manage.addJob.gender")}</option>
                            {
                                master && master.gender && master.gender.map((x, index) => <option key={index} value={x.gender}>{x.genderName}</option>)
                            }
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="mb-2">
                        <Form.Label htmlFor="industry">{t("business.manage.addJob.industry.label")}</Form.Label>
                        <Form.Select onChange={handleChangeIndustry} id="industry" value={jobInfo.industry}>
                            <option disabled value={0}>{t("business.manage.addJob.industry")}</option>
                            {
                                master && master.industry && master.industry.map((x, index) => <option key={index} value={x.industryId}>{x.industryName}</option>)
                            }
                        </Form.Select>
                    </Col>
                    <Col lg={6} className="mb-2">
                        <Form.Label htmlFor="skill">{t("business.manage.addJob.skill.label")}</Form.Label>
                        <Dropdown id="skill">
                            <Dropdown.Toggle className="w-100">
                                {loadSkill ? <Spinner animation="border" /> : t("business.manage.addJob.skill")}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    listSkill && listSkill.map((x) =>
                                        <Dropdown.Item key={x.skillId} onClick={(e) => handleCheck(e, x)}>
                                            <Form.Label>{x.skillName}</Form.Label>
                                        </Dropdown.Item>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col className="mb-2">
                        <Form.Label htmlFor="listSkill">{t("business.manage.addJob.listSkill.label")}</Form.Label>
                        <div className="addJob__listSkill-bound">
                            {listSkillSave ?
                                listSkillSave.map((x, key) =>
                                    <div key={key} className="addJob__listSkill-item" onClick={() => handleRemove(x.skillId)}>
                                        {x.skillName}
                                    </div>
                                ) : <></>
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} className="mb-2">
                        <Form.Label htmlFor="companyName">{t("business.manage.addJob.amount.label")}</Form.Label>
                        <InputGroup>
                            <Form.Control
                                onChange={handleChange}
                                id="amount"
                                type="number"
                                min={1}
                                placeholder={t("business.manage.addJob.amount")}
                                value={jobInfo.amount}
                                required
                            />
                        </InputGroup>
                    </Col>
                    <Col lg={8} className="mb-2">
                        <Form.Label htmlFor="jobTypes">{t("business.manage.addJob.jobTypes.label")}</Form.Label>
                        <Row>
                            {
                                master && master.jobType && master.jobType.map((x, k) =>
                                    <Col lg={4} xs={6} key={k}>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={handleCheckJobType}
                                            checked={x.checked}
                                            label={x.jobTypeName}
                                            value={x.jobType}
                                            name="jobTypes"
                                        />
                                    </Col>
                                )
                            }
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} className="mb-2">
                        <Form.Label htmlFor="salaryMin">{t("business.manage.addJob.salary.label")}</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>{t("business.manage.addJob.salaryMin.label")}</InputGroup.Text>
                            <Form.Control
                                onChange={handleChange}
                                type="number"
                                min={0}
                                id="salaryMin"
                                placeholder={t("business.manage.addJob.salaryMin")}
                                value={jobInfo.salaryMin}
                            />
                            <InputGroup.Text>{t("business.manage.addJob.salaryMax.label")}</InputGroup.Text>
                            <Form.Control
                                onChange={handleChange}
                                type="number"
                                min={0}
                                id="salaryMax"
                                placeholder={t("business.manage.addJob.salaryMax")}
                                value={jobInfo.salaryMax}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4} className="mb-2">
                        <Form.Label htmlFor="unit">{t("business.manage.addJob.unit.label")}</Form.Label>
                        <Form.Select onChange={handleChange} id="unit" value={jobInfo.unit}>
                            <option disabled hidden value={""}>{t("business.manage.addJob.unit")}</option>
                            {
                                master && master.unit && master.unit.map((x, index) => <option key={index} value={x.unit}>{x.unitName}</option>)
                            }
                        </Form.Select>
                    </Col>

                </Row>
                <Row>
                    <Col md={8} className="mb-2">
                        <Form.Label htmlFor="salaryMin">{t("business.manage.addJob.date.label")}</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>{t("business.manage.addJob.startDate.label")}</InputGroup.Text>
                            <Form.Control
                                onChange={handleChange}
                                type="date"
                                id="startDate"
                                value={jobInfo.startDate}
                            />
                            <InputGroup.Text>{t("business.manage.addJob.endDate.label")}</InputGroup.Text>
                            <Form.Control
                                onChange={handleChange}
                                type="date"
                                id="endDate"
                                value={jobInfo.endDate}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <InputTextModal
                        content={showEditContent === 1 ?
                            jobInfo.description : showEditContent === 2 ?
                                jobInfo.require : showEditContent === 3 ?
                                    jobInfo.benefit : ""}
                        title={t(`business.job.edit.content.title${showEditContent}`)}
                        show={showEditContent === 0 ? false : true}
                        handleDone={handleChangeText}
                        handleClose={() => setShowEditContent(0)} />
                    <Col xs={12} className="mb-2">
                        <Form.Label htmlFor="description">{t("business.manage.addJob.description.label")}</Form.Label>
                        <div className={`addJob__inputContent ${jobInfo.description ? "" : "custom_placeholder"}`}
                            onClick={() => setShowEditContent(1)}
                            dangerouslySetInnerHTML={{ __html: jobInfo.description || t("business.manage.addJob.description") }}>
                        </div>
                    </Col>
                    <Col xs={12} className="mb-2">
                        <Form.Label htmlFor="require">{t("business.manage.addJob.require.label")}</Form.Label>
                        <div className={`addJob__inputContent ${jobInfo.require ? "" : "custom_placeholder"}`}
                            onClick={() => setShowEditContent(2)}
                            dangerouslySetInnerHTML={{ __html: jobInfo.require || t("business.manage.addJob.require") }}>
                        </div>
                    </Col>
                    <Col xs={12} className="mb-2">
                        <Form.Label htmlFor="benefit">{t("business.manage.addJob.benefit.label")}</Form.Label>
                        <div className={`addJob__inputContent ${jobInfo.benefit ? "" : "custom_placeholder"}`}
                            onClick={() => setShowEditContent(3)}
                            dangerouslySetInnerHTML={{ __html: jobInfo.benefit || t("business.manage.addJob.benefit") }}>
                        </div>
                    </Col>
                </Row>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button variant="danger" onClick={() => navigate("/manageJob")}>{t("business.manage.addJob.cancel")}</Button>
                    <Button type="submit" className="ms-2">{saving ? <Spinner animation="border" /> : t("business.manage.addJob.create")}</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddJob