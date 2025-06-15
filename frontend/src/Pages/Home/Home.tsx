import { Image} from "./HomeStyle.ts";

import HomeImage from "../../../public/homeImage.png";

import PageContainer from "../../Components/PageContainer/PageConteiner.tsx";
import {ProductMenuGenerator} from "../../Components/ProductMenuGenerator/ProductMenuGenerator.tsx";

export default function Home() {

    return (

            <PageContainer>
                <div style={{paddingTop:"8em"}}>
                    <Image src={HomeImage} alt="Home Image" />
                </div>
                <ProductMenuGenerator/>
            </PageContainer>

    );
}