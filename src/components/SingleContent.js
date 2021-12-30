import styled from "styled-components";
import {img_300, unavailable} from "../config/config";
import {Badge} from "@material-ui/core";
import ContentModal from "./ContentModal";
export default function SingleContent (props) {
    const {
        id,
       poster_path,
        title,
        name,
        first_air_date,
        release_date,
        vote_average,
        media_type
    } = props
    console.log(media_type)
        return (
                <ContentModal media_type={media_type} id={id}  >
                        <Content>
                            <Badge badgeContent={vote_average} color="secondary"/>
                            <img className='poster' src={poster_path ? `${img_300}/${poster_path}`:unavailable} alt={title}/>
                            <b className='title'>{title ? title:name}</b>
                            <span className='subTitle'>
                            <span >
                                {media_type ==='TV' ? 'TV Series':"Movie"}
                            </span>
                            <span>
                                {first_air_date ? first_air_date:release_date}
                            </span>
                    </span>
                        </Content>
                </ContentModal>
        );
}
const Content = styled.div`
      display: flex;
      flex-direction: column;
      padding: 5px;
      margin: 5px 0;
      background-color: #282c34;
      border-radius: 10px;
      position: relative;
      font-family: "Montserrat", sans-serif;
      transition: all .3s ease-in;
      &:hover {
        background-color: white;
        color: black;
      }
      .poster {
        border-radius: 10px;
      }

      .title {
        width: 100%;
        text-align: center;
        font-size: 17px;
        padding: 8px 0;
      }

      .subTitle {
        display: flex;
        justify-content: space-between;
        padding-bottom: 3px;
        padding: 0 2px;
        padding-bottom: 3px;
      }
      @media screen and (max-width: 350px){
        .subTitle {
          display: flex;
          flex-direction: column;
          span:not(:last-child){
            margin-bottom: 10px;
          }
        }
      }
    }
`;

