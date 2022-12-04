import { Category } from "../src/types/Category";
import * as fs from "fs";
import * as path from "path";

// const File = class File {
//     filename: string;
//     properties: FilePropertyBag
//     constructor(
//         parts: (string | Blob | ArrayBuffer | ArrayBufferView)[],
//         filename: string,
//         properties?: FilePropertyBag
//     ) {
//         this.filename = filename;
//
//     }
// };

const GetAllProductsResponse = [
    {
        _id: "637dd4f172ca6c26516c25f0",
        name: "Tomate",
        description: "Tomates de la huerta",
        pricePerKilogram: 12,
        category: "Verdura",
        sellerId: {
            _id: "637dd4d672ca6c26516c25ed",
            name: "Alba Gonzalez",
            username: "albaGonzalez",
            password:
                "$2b$05$5QJQWjgWmtbdH2MmHcCiL.SXo7csZj02VDaMilkjrFmYpTqL0YH76",
            phone_number: "652227577",
            email: "alba@email.com",
            direction: "Avenida Blasco Ibañez, 11, Valencia",
            biography: "New to freshquet :)",
            latitude: 36.01952335,
            longitude: 14.238564982829597,
            userType: "seller",
            __v: 0,
            profile_picture: "637dd4d672ca6c26516c25ed.png",
            adsInSeeLater: [],
        },
        averageReviewScore: 0,
        pictures: [
            "637dd4f172ca6c26516c25f042132039-76e3-4a79-ba86-4f3b71de31a6.jpg",
            "637dd4f172ca6c26516c25f017aac43e-b6bc-446e-aea4-23682c9d7323.jpg",
            "637dd4f172ca6c26516c25f044c19900-6437-4712-b779-23734c0489ff.jpg",
        ],
        __v: 0,
        userInSeeLater: [
            "637dd52f72ca6c26516c25f6",
            "637dd52f72ca6c26516c25f6",
            "637dd52f72ca6c26516c25f6",
            "637dd52f72ca6c26516c25f6",
            "637dd52f72ca6c26516c25f6",
            "637dd52f72ca6c26516c25f6",
        ],
    },
    {
        _id: "637dd73072ca6c26516c2617",
        name: "Nisperos",
        description: "Nísperos de callosa",
        pricePerKilogram: 30,
        category: "Fruta",
        sellerId: {
            _id: "637dd6d072ca6c26516c2614",
            name: "Josep Martí",
            username: "josepMarti",
            password:
                "$2b$05$H.32iKZt/jvdHjsKAki/H.NmikGZ40Sf7gjyuDu/xj3yG0q1tH/Ne",
            phone_number: "652227577",
            email: "josep@email.com",
            direction: "Carretera Alacant, 15, Callosa d'en Sarrià, Alicante",
            biography: "New to freshquet :)",
            latitude: 38.648229,
            longitude: -0.1216127,
            userType: "seller",
            __v: 0,
        },
        averageReviewScore: 0,
        pictures: [
            "637dd73072ca6c26516c2617a9970ddf-75c5-4e62-83c5-7710f9a59369.jpg",
        ],
        __v: 0,
        userInSeeLater: ["637dd52f72ca6c26516c25f6"],
    },
];

const mockedNewAdvertisementData = {
    id: "",
    name: "Zanahorias",
    description: "Zanahorias baby",
    pricePerKilogram: 2,
    category: Category.Verdura,
    averageReviewScore: 0,
    sellerId: "seller01",
    pictures: [
        new File([""], "zanahorias01.jpg"),
        new File([""], "zanahorias02.jpg"),
    ],
};

export { GetAllProductsResponse, mockedNewAdvertisementData };
