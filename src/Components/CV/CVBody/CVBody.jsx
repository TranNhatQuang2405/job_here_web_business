import React, { useState, useEffect } from 'react'
import { CVContact, CVHobby, CVExperience, CVSkill, CVTitle, CVImage, CVOverall, CVEducation, CVAward, } from '..'
import "./CVBody.css"
import data from "./CVBodyDefaultData.json"
import { Col, Row } from 'react-bootstrap'
import { LoadingSpinner } from 'Components/Loading'

const CVBody = React.forwardRef((props, ref) => {
    const [templateData, setTemplateData] = useState({})
    const [cvData, setCvData] = useState(props.cvData || data)
    const [changeWidth, setChangeWidth] = useState(props.parentWidth || window.innerWidth)
    const [scale, setScale] = useState(1)
    const [pending, setPending] = useState(true)
    useEffect(() => {
        if (props?.templateData?.structure) {
            const templateDataRe = props?.templateData;
            templateDataRe.structure = JSON.parse(templateDataRe?.structure || {})
            setTemplateData(templateDataRe)
            setPending(false)
        }
        return () => {
        }
    }, [props.templateData])

    const scaleCV = () => {
        let widthScreen = props.parentWidth || window.innerWidth
        let widthCV = 794
        if (widthScreen >= widthCV)
            setScale(1)
        else
            setScale((widthScreen - 16) / widthCV)
    }
    const heighBoundCV = () => {
        let percent = scale
        return 1123 * percent + 16
    }

    useEffect(() => {
        scaleCV()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeWidth])

    useEffect(() => {
        setChangeWidth(props.parentWidth || window.innerWidth)
    }, [props.parentWidth])


    useEffect(() => {
        if (props.cvData) {
            setCvData(props.cvData)
        }
    }, [props.cvData])


    const getExactElement = (cvDetailType, index) => {
        switch (cvDetailType) {
            case "CONTACT":
                if (cvData["CONTACT"])
                    return <CVContact key={index} cvData={cvData["CONTACT"]} />
                return <span className='d-none' key={index}></span>
            case "OVERALL":
                if (cvData["OVERALL"])
                    return <CVOverall key={index} cvData={cvData["OVERALL"]} />
                return <span className='d-none' key={index}></span>
            case "IMAGE":
                return <CVImage key={index} cvData={cvData["IMAGE"]} />
            case "EXPERIENCE":
                if (cvData["EXPERIENCE"])
                    return <CVExperience key={index} cvData={cvData["EXPERIENCE"]} />
                return <span className='d-none' key={index}></span>
            case "SKILL":
                if (cvData["SKILL"])
                    return <CVSkill key={index} cvData={cvData["SKILL"]} />
                return <span className='d-none' key={index}></span>
            case "EDUCATION":
                if (cvData["EDUCATION"])
                    return <CVEducation key={index} cvData={cvData["EDUCATION"]} />
                return <span className='d-none' key={index}></span>
            case "TITLE":
                if (cvData["TITLE"])
                    return <CVTitle key={index} cvData={cvData["TITLE"]} />
                return <span className='d-none' key={index}></span>
            case "HOBBY":
                if (cvData["HOBBY"])
                    return <CVHobby key={index} cvData={cvData["HOBBY"]} />
                return <span className='d-none' key={index}></span>
            case "AWARD":
                if (cvData["AWARD"])
                    return <CVAward key={index} cvData={cvData["AWARD"]} />
                return <span className='d-none' key={index}></span>
            default:
                return <span className='d-none' key={index}></span>
        }
    }
    if (pending) {
        return <LoadingSpinner />
    }
    return (
        <div style={{ height: heighBoundCV() }}>
            <div className="CVBody__box" ref={ref} style={{ transform: `scale(${scale})` }}>
                <Row className="CVBody__row">
                    <Col xs={5} className={`CVBody__left ${templateData?.className}`}>
                        {
                            templateData?.structure?.left.map((cvDetailType, index) => (
                                getExactElement(cvDetailType, index)
                            ))
                        }
                    </Col>
                    <Col xs={7} className="CVBody__right CVTemplate-1">
                        {
                            templateData?.structure?.right.map((cvDetailType, index) => (
                                getExactElement(cvDetailType, index)
                            ))
                        }
                    </Col>
                </Row>
            </div>
        </div>

    )
})

export default CVBody