import { DirectoryItemContainer,Body,BackgroundImage } from "./directory-item.styles";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({category}) => {

    const {id,imageUrl,title,route} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return(
        <DirectoryItemContainer onClick={onNavigateHandler} >
            <BackgroundImage
              imageUrl={imageUrl}
            />
            <Body>
              <h2>{title}</h2>
              <span>Shop Now</span>
            </Body>
        </DirectoryItemContainer>
    );
}

export default DirectoryItem;