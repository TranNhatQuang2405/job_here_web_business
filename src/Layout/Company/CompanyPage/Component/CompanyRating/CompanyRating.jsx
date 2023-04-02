import React from 'react'
import { useTranslation } from 'react-i18next'
import { Rate } from 'antd'
import { LikeFilled, DislikeFilled } from '@ant-design/icons'
import "./CompanyRating.css"

function CompanyRating() {
    const { t } = useTranslation()

    return (
        <div className="CompanyPage__company-info jh-box-item">
            <h4 className="CompanyRating__header">
                {t("companyRating.header")}
            </h4>
            <hr />
            <div>
                <div className="CompanyRating__child">
                    <div className="CompanyRating__child-title">Tiêu đề</div>
                    <div className="d-flex">
                        <Rate
                            disabled
                            className="CompanyPage_rating-start CompanyRating__child-start"
                            defaultValue={3}
                            value={2.7} />
                        <div className="CompanyRating__child-react">
                            <LikeFilled className="CompanyRating__child-like" />
                            {t("companyRating.like")}
                        </div>
                        <div className="CompanyRating__child-react">
                            <DislikeFilled className="CompanyRating__child-dislike" />
                            {t("companyRating.dislike")}
                        </div>
                    </div>
                    <div>
                        Đây là bình luận đemo
                    </div>
                </div>
                <div className="CompanyRating__child">
                    <div className="CompanyRating__child-title">Tiêu đề</div>
                    <div className="d-flex">
                        <Rate
                            disabled
                            className="CompanyPage_rating-start CompanyRating__child-start"
                            defaultValue={3}
                            value={2.7} />
                        <div className="CompanyRating__child-react">
                            <LikeFilled className="CompanyRating__child-like" />
                            {t("companyRating.like")}
                        </div>
                        <div className="CompanyRating__child-react">
                            <DislikeFilled className="CompanyRating__child-dislike" />
                            {t("companyRating.dislike")}
                        </div>
                    </div>
                    <div>
                        Đây là bình luận đemo
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyRating