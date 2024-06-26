import { GetArtworkByCreator, AsyncResponse } from "../lib/Interface";
import { URL } from "./Url";

export async function GetListArtworkByCreatorAsync(token: string) {
    try {
        const response = await fetch(`https://${URL}/artworkapi/GetListArtworkByCreator`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        });
        if (!response.ok) {
            throw await response.text();
        }
        if (response.status === 200) {
            const data = await response.json();
            const reponse: AsyncResponse<GetArtworkByCreator[]> = {
                status: "SUCCESS",
                data: data
            };
            return reponse;
        } else {
            const data = await response.text();
            const reponse: AsyncResponse<GetArtworkByCreator[]> = {
                status: "FAIL",
                error: data
            };
            return reponse;
        }
    } catch (error: any) {
        const reponse: AsyncResponse<GetArtworkByCreator[]> = {
            status: "FAIL",
            error: error
        };
        return reponse;
    }
}
