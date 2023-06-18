import Service from "Config/Api/Service";
import { getAllPacket, buyPacket, getBoughtPacket } from "Config/Api/ConfigURL";

class PacketBusiness extends Service {
  getAllPacket = async () => {
    let result = await this.get(getAllPacket);
    return result;
  };

  buyPacket = async (packetId) => {
    let result = await this.post(`${buyPacket}/${packetId}`);
    return result;
  };

  getBoughtPacket = async (companyId) => {
    let result = await this.get(`${getBoughtPacket}/${companyId}`);
    return result;
  };
}

const packetBusiness = new PacketBusiness();

export default packetBusiness;
