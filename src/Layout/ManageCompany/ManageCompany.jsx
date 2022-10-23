import React, { memo } from 'react'
import { ListCompany } from './Component';
import { useTranslation } from 'react-i18next';
import { PathTree } from 'Components/Path'
import { PlusCircleFill } from 'react-bootstrap-icons';
import "./ManageCompany.css"
import { Button } from 'react-bootstrap';
function ManageCompany() {
    const { t } = useTranslation();
    const addCompany = () => {

    }
    return (
        <div>
            <div className="manageCompany__header-layout">
                <PathTree className="d-none d-lg-block" />
                <div className="manageCompany__buttonAdd-layout" >
                    <Button onClick={addCompany}>
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