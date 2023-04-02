import React from "react";
import "./JobItemSmall.css";
import { Col } from "react-bootstrap";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { Link } from "react-router-dom";

const JobItemSmall = ({ jobData = {} }) => {

	let tagData = [
		{
			label: `${jobData.salaryMin === jobData.salaryMax
				? jobData.salaryMin
				: `${jobData.salaryMin} - ${jobData.salaryMax}`
				} ${jobData?.unitName ?? ""}`,
		},
		{
			label: jobData?.city?.cityName ?? "",
		},
	];



	return (
		<Col md={4} sm={6} className="JobItemSmall__container">
			<div className="JobItemSmall__feature-job-item">
				<div className="d-flex">
					<Link to={`/manageJob/${jobData?.jobId ?? 0}`} rel="noreferrer">
						<CompanyLogo src={jobData?.avatarUrl ?? null} />
					</Link>
					<div className="JobItemSmall__col-title flex-grow-1">
						<Link
							to={`/Job/${jobData?.jobId ?? 0}`}
							rel="noreferrer"
							className="JobItemSmall__title d-block w-100"
						>
							<strong className="transform-job-title underline-box-job highlight">
								{jobData?.jobName ?? ""}
							</strong>
						</Link>
						<Link
							to={`/Company/${jobData?.companyId ?? 0}`}
							rel="noreferrer"
							className="JobItemSmall__company d-block w-100"
						>
							{jobData?.companyName ?? ""}
						</Link>
					</div>
					<div className="JobItemSmall__col-like">

					</div>
				</div>
				<div className="col-job-info">
					<TagList tagData={tagData} />
				</div>
			</div>
		</Col>
	);
};

export default JobItemSmall;
