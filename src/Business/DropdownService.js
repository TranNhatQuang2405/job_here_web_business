import Service from "Config/Api/Service";
import {
    genderDropdown,
    industryDropdown,
    skillDropdown,
    experienceDropdown,
    titleDropdown,
    jobtypeDropdown,
    cityDropdown,
    unitDropdown
} from "Config/Api/ConfigURL";

class DropdownBusiness extends Service {
    GenderDropdown = async () => {
        let result = await this.get(genderDropdown);
        return result;
    };
    IndustryDropdown = async () => {
        let result = await this.get(industryDropdown);
        return result;
    };
    ExperienceDropdown = async () => {
        let result = await this.get(experienceDropdown);
        return result;
    };
    TitleDropdown = async () => {
        let result = await this.get(titleDropdown);
        return result;
    };
    JobtypeDropdown = async () => {
        let result = await this.get(jobtypeDropdown);
        return result;
    };
    CityDropdown = async () => {
        let result = await this.get(cityDropdown);
        return result;
    };
    UnitDropdown = async () => {
        let result = await this.get(unitDropdown);
        return result;
    };
    SkillDropdown = async (id) => {
        let result = await this.get(`${skillDropdown}/${id}`);
        return result;
    };
}

const dropdownBusiness = new DropdownBusiness();

export default dropdownBusiness;
