import Service from "Config/Api/Service";
import {
  countNotification,
  viewNotification,
  viewNotificationOfCompany,
  getLastsNotificationOfCompany,
} from "Config/Api/ConfigURL";

class NotificationBusiness extends Service {
  countNotification = async (companyId) => {
    let result = await this.get(`${countNotification}/${companyId}`);
    return result;
  };

  getLastsNotificationOfCompany = async (companyId) => {
    let result = await this.get(`${getLastsNotificationOfCompany}/${companyId}`);
    return result;
  };

  viewNotification = async (notiId) => {
    let result = await this.post(`${viewNotification}/${notiId}`);
    return result;
  };

  viewNotificationOfCompany = async (companyId) => {
    let result = await this.post(`${viewNotificationOfCompany}/${companyId}`);
    return result;
  };
}

const notificationBusiness = new NotificationBusiness();

export default notificationBusiness;
