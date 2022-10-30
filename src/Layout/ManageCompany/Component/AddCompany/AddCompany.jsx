import React, { useState } from 'react'
import { Modal, InputGroup, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import "./AddCompany.css"
function AddCompany({ show, onHide }) {

    const { t } = useTranslation()

    const [companyInfo, setCompanyInfo] = useState({
        companyName: "",
        address: "",
        size: "",
        email: ""
    })

    return (
        <Modal className='modal__custom-bg' size="xl" fullscreen='lg-down' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{t("business.company.addCompanyTitle")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="AddCompany__body">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                    </InputGroup>

                    <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            https://example.com/users/
                        </InputGroup.Text>
                        <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" />
                        <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>

                    <InputGroup>
                        <InputGroup.Text>With textarea</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" />
                    </InputGroup>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddCompany