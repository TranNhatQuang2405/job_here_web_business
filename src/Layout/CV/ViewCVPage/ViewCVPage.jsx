import React, { useState, useEffect, useRef } from "react";
import { CVBody } from "Components/CV";
import { cvBusiness } from "Business";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewCVPage.css";

const ViewCVPage = () => {
  let { cvId } = useParams();
  const [cvData, setCvData] = useState({});
  const navigate = useNavigate();
  const cvRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      let result = await cvBusiness.getCVContent(cvId);
      if (result.data.httpCode === 200) {
        try {
          let cvContent = JSON.parse(result.data.objectData?.cvContent);
          setCvData({
            cvContent: cvContent,
            templateData: { ...result.data.objectData?.cvTemplate },
          });
        } catch (e) {
          console.error(e);
          navigate("/Home");
        }
      } else {
        navigate("/Home");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvId]);

  return (
    <div className="jh-box-item p-3">
      <CVBody cvData={cvData.cvContent} templateData={cvData.templateData} ref={cvRef} />
    </div>
  );
};

export default ViewCVPage;
