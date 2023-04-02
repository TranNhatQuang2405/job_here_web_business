import React, { useState, useEffect } from "react";
import "./Keyword.css";
import _ from "underscore";
import { LoadingSpinner } from "Components/Loading";
import { IconCircle } from "Components/Icon";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Keyword = () => {
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		setLoading(false);
	};
	if (true)
		return null;
	else
		return (
			<div className="jh-box-item p-3">
				<h4>{t("Popular Keyword")}</h4>
				{loading ? (
					<LoadingSpinner />
				) : (
					<Row>
						{_.map(data, (item, index) => {
							return (
								<Col key={index} md={3} sm={8}>
									<div className="Keyword__item p-3 mt-3">
										<IconCircle name="suitcase" />
										<div>
											<h4>{item.label}</h4>
											<p>
												{item.number} {t("Jobs")}
											</p>
										</div>
									</div>
								</Col>
							);
						})}
					</Row>
				)}
			</div>
		);
};

export default Keyword;
