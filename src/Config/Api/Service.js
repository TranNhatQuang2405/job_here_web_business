import axios from "axios";
import host from "./Host";

class Service {
	upload = async (suburl, params = {}, header = {}) => {
		let url = host + suburl;
		var headerStorage = localStorage.getItem("header");
		headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
		let result = await axios.post(url, params, {
			headers: {
				"Content-Type": "multipart/form-data",
				...headerStorage,
			},
		});
		return result;
	};

	post = async (suburl, params = {}, header = {}) => {
		let url = host + suburl;
		var headerStorage = localStorage.getItem("header");
		headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
		let result = await axios.post(url, params, {
			headers: {
				...headerStorage,
			},
		});
		return result;
	};

	get = async (suburl, params = {}, header = {}) => {
		let url = host + suburl;
		var headerStorage = localStorage.getItem("header");
		headerStorage = headerStorage ? JSON.parse(headerStorage) : {};
		let result = await axios.get(url, {
			headers: {
				...headerStorage,
			},
		});
		return result;
	};
}

export default Service;
