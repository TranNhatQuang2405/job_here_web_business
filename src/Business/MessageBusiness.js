import Service from "Config/Api/Service";
import {
  sendMessage,
  getListChildMessage,
  getListMessage,
  viewAllMessage,
  countMessageNoRead,
  deleteMessage,
} from "Config/Api/ConfigURL";

class MessageBusiness extends Service {
  sendMessage = async ({ userId, companyId, fromUser, content }) => {
    let result = await this.post(sendMessage, { userId, companyId, fromUser, content });
    return result;
  };

  getListChildMessage = async (messageId) => {
    let result = await this.get(`${getListChildMessage}/${messageId}`);
    return result;
  };

  getListMessageCompany = async (companyId) => {
    let result = await this.get(`${getListMessage}/${companyId}`);
    return result;
  };

  viewAllMessageCompany = async (messageId) => {
    let result = await this.post(`${viewAllMessage}/${messageId}`);
    return result;
  };

  countUnreadMessage = async (companyId) => {
    let result = await this.get(`${countMessageNoRead}/${companyId}`);
    return result;
  };

  deleteMessage = async (messageId) => {
    let result = await this.post(`${deleteMessage}/${messageId}`);
    return result;
  };
}

const messageBusiness = new MessageBusiness();
export default messageBusiness;
