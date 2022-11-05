import React, { memo, useState } from 'react'
import { ListCompany, AddCompany } from './Component';
import { useTranslation } from 'react-i18next';
import { PathTree } from 'Components/Path'
import { PlusCircleFill } from 'react-bootstrap-icons';
import "./ManageCompany.css"
import { Button } from 'react-bootstrap';
function ManageCompany() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <AddCompany show={showModal} onHide={() => setShowModal(false)} />
            <div className="manageCompany__header-layout">
                <PathTree className="d-none d-lg-block" />
                <div className="manageCompany__buttonAdd-layout" >
                    <Button onClick={() => setShowModal(true)}>
                        <PlusCircleFill size="25" color="aliceblue" />
                        <span className="manageCompany__buttonAdd-content">{t("business.manage.company.add")}</span>
                    </Button>
                </div>
            </div>
            <h1 className='text-center mt-3 mb-3'>{t("business.manage.company.title")}</h1>
            <ListCompany />
        </div>
    )
}

export default memo(ManageCompany)