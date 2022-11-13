import Service from "Config/Api/Service";
import {
    viewApplication
} from "Config/Api/ConfigURL";

class UserBusiness extends Service {

    ViewApplication = async (id) => {
        let result = await this.post(`${viewApplication}/${id}`);
        return result;
    };

}

const userBusiness = new UserBusiness();

export default userBusiness;
