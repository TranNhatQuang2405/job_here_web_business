import { withTranslation } from "react-i18next";
import vi_icon from "Assets/Images/vi_icon.png";
import en_icon from "Assets/Images/en_icon.png";
import { changeAcceptLanguage } from "Config/Redux/Slice/HeaderRequestSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip, OverlayTrigger, Image } from "react-bootstrap";
import "./ChangeLanguageButton.css";

const ChangeLanguageButton = (props) => {
  const { i18n } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("vn");
      dispatch(changeAcceptLanguage("vi"));
      navigate(0);
    } else {
      i18n.changeLanguage("en");
      dispatch(changeAcceptLanguage("en"));
      navigate(0);
    }
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{t("header.btn.changeLanguage.toolTip")}</Tooltip>}
    >
      <div className="btn_changeLanguage-bound cur-pointer" onClick={changeLanguage}>
        <Image
          src={i18n.language === "en" ? en_icon : vi_icon}
          alt="Language"
          roundedCircle
          className="btn_changeLanguage-img"
        ></Image>
      </div>
    </OverlayTrigger>
  );
};

export default withTranslation("translations")(ChangeLanguageButton);
