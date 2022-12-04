import {
    GetAllProductsResponse,
    mockedNewAdvertisementData,
} from "../../mocks/axiosResponseMock";
import AdvertisementManagement from "../../src/libs/AdvertisementManagement";
import Advertisement from "../../src/types/Advertisement";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AdvertisementManagement", () => {
    beforeEach(() => {
        /*         localStorageMock.clear();

        localStorageMock.setItem("userId", "id01seller");
        localStorageMock.setItem("userRole", "seller");
        localStorageMock.setItem("userToken", "token01seller"); */
    });

    it("Get All Advertisements", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: GetAllProductsResponse,
        });
        const ads: Advertisement[] =
            await AdvertisementManagement.GetAllAdvertisements();
        expect(axios.get).toHaveBeenCalledWith(
            `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all`
        );
        expect(ads).toEqual([
            {
                _id: "637dd4f172ca6c26516c25f0",
                pictures: [
                    "637dd4f172ca6c26516c25f042132039-76e3-4a79-ba86-4f3b71de31a6.jpg",
                    "637dd4f172ca6c26516c25f017aac43e-b6bc-446e-aea4-23682c9d7323.jpg",
                    "637dd4f172ca6c26516c25f044c19900-6437-4712-b779-23734c0489ff.jpg",
                ],
                name: "Tomate",
                pricePerKilogram: 12,
                description: "Tomates de la huerta",
                averageReviewScore: 0,
                category: "Verdura",
                sellerId: {
                    _id: "637dd4d672ca6c26516c25ed",
                    name: "Alba Gonzalez",
                    username: "albaGonzalez",
                },
            },
            {
                _id: "637dd73072ca6c26516c2617",
                pictures: [
                    "637dd73072ca6c26516c2617a9970ddf-75c5-4e62-83c5-7710f9a59369.jpg",
                ],
                name: "Nisperos",
                pricePerKilogram: 30,
                description: "Nísperos de callosa",
                averageReviewScore: 0,
                category: "Fruta",
                sellerId: {
                    _id: "637dd6d072ca6c26516c2614",
                    name: "Josep Martí",
                    username: "josepMarti",
                },
            },
        ]);
    });

    it("should create a new advertisement correctly", async () => {
        const newProductId = "newproduct01";
        mockedAxios.post.mockResolvedValueOnce(
            //lo que devuelve
            newProductId
        );

        const newAdResponse =
            await AdvertisementManagement.CreateNewAdvertisement(
                mockedNewAdvertisementData.id,
                mockedNewAdvertisementData.name,
                mockedNewAdvertisementData.description,
                mockedNewAdvertisementData.pricePerKilogram,
                mockedNewAdvertisementData.category,
                mockedNewAdvertisementData.averageReviewScore,
                mockedNewAdvertisementData.sellerId,
                mockedNewAdvertisementData.pictures
            );

        expect(newAdResponse).toEqual(newProductId);
    });
});
