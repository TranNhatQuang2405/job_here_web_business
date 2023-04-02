import React from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import "./CVItem.css";
import { useTranslation } from "react-i18next";
import Moment from "moment";
const CVItem = ({ cvData = {} }) => {
    const { t } = useTranslation();

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

    return (
        <div className="CVItem__container mb-2 px-3 pt-3">
            <div>
                <Document
                    error={<div className="CVItem__error"></div>}
                    file={cvData.cvUrl}
                >
                    <Page className="CVItem__iframe" pageNumber={1} />
                </Document>
                {/* <embed title={cvData.cvName} src={cvData.cvUrl} type="application/pdf" className="CVItem__iframe">
                </embed> */}
            </div>
            <div className="CVItem__cv-content">
                <div className="CVItem__cv-name">
                    <a className="CVItem__cv-name-href" href={cvData.cvUrl} target="_blank" rel="noreferrer">
                        {cvData.cvName}
                    </a>
                </div>
                <p className="CVItem__cv-create-date">
                    {t("Create Date")}: {Moment(cvData.createDate).format("DD/MM/YYYY")}
                </p>
                <p className="CVItem__cv-type">{cvData.cvType}</p>
            </div>
        </div>
    );
};

export default CVItem;
