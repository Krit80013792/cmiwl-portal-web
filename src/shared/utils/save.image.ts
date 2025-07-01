// import { BannerDTO } from "../../../src/application/dtos/BannerDTO";
// import { revalidatePath } from "next/cache";
// import fs from "node:fs/promises";
// import path from 'path';

// /**
//  * Checks whether a given buffer is a JPEG file based on its file signature (magic number).
//  * JPEG files typically start with the bytes: 0xFF 0xD8 0xFF
//  *
//  * @param {Buffer} poBuffer - The buffer to be checked.
//  * @returns {Promise<boolean>} - True if the buffer starts with the JPEG signature; otherwise, false.
//  */
// export async function IsJPG(poBuffer: Buffer): Promise<boolean> {
//     const signature = [0xFF, 0xD8, 0xFF];
//     return signature.every((byte, index) => poBuffer[index] === byte);
// };

// /**
//  * Checks whether a given buffer is a PDF file based on its file signature (magic number).
//  * PDF files typically start with the ASCII characters: "%PDF-", or bytes: 0x25 0x50 0x44 0x46 0x2D
//  *
//  * @param {Buffer} poBuffer - The buffer to be checked.
//  * @returns {Promise<boolean>} - True if the buffer starts with the PDF signature; otherwise, false.
//  */
// export async function IsPDF(poBuffer: Buffer): Promise<boolean> {
//     const signature = [0x25, 0x50, 0x44, 0x46, 0x2D];
//     return signature.every((byte, index) => poBuffer[index] === byte);
// };

// /**
//  * Checks if the provided buffer corresponds to a Microsoft Excel file.
//  * Supports both legacy `.xls` (OLE2/BIFF) and modern `.xlsx` (Office Open XML) formats.
//  *
//  * @param {Buffer} poBuffer - The binary buffer of the file to check.
//  * @returns {Promise<boolean>} - Returns true if the buffer matches either .xls or .xlsx file signature.
//  */
// export async function IsExcel(poBuffer: Buffer): Promise<boolean> {
//     const xlsxSig = [0x50, 0x4B, 0x03, 0x04]; //* .xlsx (ZIP)
//     const xlsSig = [0xD0, 0xCF, 0x11, 0xE0];  //* .xls (OLE2)
//     const isXLSX = xlsxSig.every((byte, i) => poBuffer[i] === byte);
//     const isXLS = xlsSig.every((byte, i) => poBuffer[i] === byte);
//     return isXLS || isXLSX;
// };

// /**
//  * Saves a base64-encoded banner image to the file system.
//  * 
//  * @param {string} psImage - The base64-encoded image string (must be JPEG format).
//  * @param {string} psFileName - The desired filename (without extension).
//  * @returns {Promise<string>} - The file path where the image is stored.
//  * 
//  * @throws {Error} If there is an issue writing the file.
//  */
// export async function SaveBannerImage(psImage: string, psFileName: string): Promise<string> {
//     const sFileName = `${psFileName.replace(/ /g, '_')}.jpg`;
//     const sBase64Data = psImage.replace(/^data:image\/jpeg;base64,/, '');
//     const oBuffer = Buffer.from(sBase64Data, 'base64');

//     if (!await IsJPG(oBuffer)) {
//         throw new Error("Invalid image format");
//     }

//     const sDesPath = path.join(process.cwd(), '../media', 'images', 'banner');
//     const sUsePath = `/areegator/media/images/banner/`;
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), oBuffer as any);
//     revalidatePath("/");
//     return `${sUsePath}${sFileName}`;
// };

// /**
//  * Represents an individual banner item.
//  * @interface
//  */
// interface BannerItem {
//     item: string;
//     img: string;
//     "img-mobile": string;
//     link: string;
// };

// /**
//  * Represents the structure of banner data.
//  * @interface
//  */
// interface BannerData {
//     banner_home: BannerItem[];
// };

// /**
//  * Generates a JavaScript file containing banner data and writes it to a designated location.
//  * @param {BannerDTO[]} poaBanner - Array of banner DTOs to be processed.
//  * @returns {Promise<string>} - Returns the file path where the banner script is saved.
//  */
// export async function WriteBannerJs(poaBanner: BannerDTO[]): Promise<string> {
//     const sFileName = `banner_areegator.js`;
//     const oBanners: BannerData = {
//         banner_home: []
//     };
//     for (const [index, banner] of poaBanner.entries()) {
//         oBanners.banner_home.push({
//             item: (index + 1).toString(),
//             img: `${process.env.BASE_URL}${banner?.bannerImagePathDesktop?.replace(/^\/areegator/, '/api')}`,
//             "img-mobile": `${process.env.BASE_URL}${banner?.bannerImagePathMobile?.replace(/^\/areegator/, '/api')}`,
//             link: banner?.bannerRefLink ?? '',
//         });
//     }
//     const oResBody = {
//         data: oBanners,
//         responsecode: "200",
//         responsemessage: "100001",
//         responsedatasource: "DB",
//         responseerror: null
//     };
//     const jsonDataToWrite: any = JSON.stringify(oResBody);
//     const sDesPath = path.join(process.cwd(), '../media', 'Files', 'script', '/');
//     const sUsePath = `/areegator/media/Files/script/`;
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), jsonDataToWrite);
//     return `${sUsePath}${sFileName}`;
// };

// /**
//  * Saves a base64-encoded image as a JPEG file in a specified directory.
//  *
//  * @param {string} psImage - Base64 encoded image string (JPEG format).
//  * @param {string} psFileName - Desired filename without extension.
//  * @param {string} psPathEndpoint - Subdirectory to save the image (e.g., 'recruit', 'product').
//  * @returns {Promise<string>} Resolves to the URL path of the saved image.
//  */
// export async function SaveAwDownloadImage(psImage: string, psFileName: string, psPathEndpoint: string): Promise<string> {
//     const sFileName = `${psFileName.replace(/ /g, '_')}.jpg`;
//     const sBase64Data = psImage.replace(/^data:image\/jpeg;base64,/, '');
//     const oBuffer = Buffer.from(sBase64Data, 'base64');

//     if (!await IsJPG(oBuffer)) {
//         throw new Error("Invalid image format");
//     }

//     const sDesPath = path.join(process.cwd(), '../media', 'awd', `${psPathEndpoint}`); //* psPathEndpoint eg. recruit, product
//     const sUsePath = `/areegator/media/awd/${psPathEndpoint}/`; //* psPathEndpoint eg. recruit, product
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), oBuffer as any);
//     revalidatePath("/");
//     return `${sUsePath}${sFileName}`;
// };

// /**
//  * Saves a Base64-encoded PDF or Excel file to disk.
//  *
//  * @param {string} psFile - Base64-encoded file string (with data URI prefix).
//  * @param {string} psFileName - Desired name of the saved file (without extension).
//  * @returns {Promise<string>} - Publicly accessible path to the saved file.
//  * @throws {Error} If the file format is not PDF or Excel.
//  */
// export async function SaveAwDownloadFile(psFile: string, psFileName: string): Promise<string> {
//     const regex = /^data:(.*);base64,(.*)$/;
//     const matches = regex.exec(psFile);
//     if (!matches) {
//         throw new Error("Invalid base64 file format");
//     }
//     const sBase64Data = matches[2];
//     const oBuffer = Buffer.from(sBase64Data, 'base64');

//     let sExtension: string | null = null;
//     if (await IsPDF(oBuffer)) {
//         sExtension = 'pdf';
//     } else if (await IsExcel(oBuffer)) {
//         sExtension = 'xlsx';
//     }
//     if (!sExtension) {
//         throw new Error("Invalid file format. Only PDF and Excel files are supported.");
//     }

//     const sFileName = `${psFileName.replace(/ /g, '_')}.${sExtension}`;
//     const sDesPath = path.join(process.cwd(), '../media', 'Files', `/`);
//     const sUsePath = `/areegator/media/Files/`;
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), oBuffer as any);
//     revalidatePath("/");
//     return `${sUsePath}${sFileName}`;
// };

// /**
//  * Saves a base64-encoded promotion image to the file system.
//  * 
//  * @param {string} psImage - The base64-encoded image string (must be JPEG format).
//  * @param {string} psFileName - The desired filename (without extension).
//  * @returns {Promise<string>} - The file path where the image is stored.
//  * 
//  * @throws {Error} If there is an issue writing the file.
//  */
// export async function SavePromotionImage(psImage: string, psFileName: string): Promise<string> {
//     const sFileName = `${psFileName.replace(/ /g, '_')}.jpg`;
//     const sBase64Data = psImage.replace(/^data:image\/jpeg;base64,/, '');
//     const oBuffer = Buffer.from(sBase64Data, 'base64');

//     if (!await IsJPG(oBuffer)) {
//         throw new Error("Invalid image format");
//     }

//     const sDesPath = path.join(process.cwd(), '../media', 'images', 'promotion');
//     const sUsePath = `/areegator/media/images/promotion/`;
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), oBuffer as any);
//     revalidatePath("/");
//     return `${sUsePath}${sFileName}`;
// };

// /**
//  * Saves a base64-encoded video thumbnail image to the file system.
//  * 
//  * @param {string} psImage - The base64-encoded image string (must be JPEG format).
//  * @param {string} psFileName - The desired filename (without extension).
//  * @returns {Promise<string>} - The file path where the image is stored.
//  * 
//  * @throws {Error} If there is an issue writing the file.
//  */
// export async function SaveVideoImage(psImage: string, psFileName: string): Promise<string> {
//     const sFileName = `${psFileName.replace(/ /g, '_')}.jpg`;
//     const sBase64Data = psImage.replace(/^data:image\/jpeg;base64,/, '');
//     const oBuffer = Buffer.from(sBase64Data, 'base64');

//     if (!await IsJPG(oBuffer)) {
//         throw new Error("Invalid image format");
//     }

//     const sDesPath = path.join(process.cwd(), '../media', 'images', 'video');
//     const sUsePath = `/areegator/media/images/video/`;
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), oBuffer as any);
//     revalidatePath("/");
//     return `${sUsePath}${sFileName}`;
// };

// /**
//  * Saves a Base64-encoded PDF or Excel file to disk.
//  *
//  * @param {string} psFile - Base64-encoded file string (with data URI prefix).
//  * @param {string} psFileName - Desired name of the saved file (without extension).
//  * @returns {Promise<string>} - Publicly accessible path to the saved file.
//  * @throws {Error} If the file format is not PDF or Excel.
//  */
// export async function SaveCustomFile(psFile: string, psFileName: string): Promise<string> {
//     const regex = /^data:(.*);base64,(.*)$/;
//     const matches = regex.exec(psFile);
//     if (!matches) {
//         throw new Error("Invalid base64 file format");
//     }
//     const sBase64Data = matches[2];
//     const oBuffer = Buffer.from(sBase64Data, 'base64');

//     let sExtension: string | null = null;
//     if (await IsPDF(oBuffer)) {
//         sExtension = 'pdf';
//     } else if (await IsExcel(oBuffer)) {
//         sExtension = 'xlsx';
//     }
//     if (!sExtension) {
//         throw new Error("Invalid file format. Only PDF and Excel files are supported.");
//     }

//     const sFileName = `${psFileName.replace(/ /g, '_')}.${sExtension}`;
//     const sDesPath = path.join(process.cwd(), '../media', 'Files', 'download');
//     const sUsePath = `/areegator/media/Files/download`;
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), oBuffer as any);
//     revalidatePath("/");
//     return `${sUsePath}/${sFileName}`;
// };

// /**
//  * Saves a base64-encoded news image to the file system.
//  * 
//  * @param {string} psImage - The base64-encoded image string (must be JPEG format).
//  * @param {string} psFileName - The desired filename (without extension).
//  * @returns {Promise<string>} - The file path where the image is stored.
//  * 
//  * @throws {Error} If there is an issue writing the file.
//  */
// export async function SaveNewsImage(psImage: string, psFileName: string): Promise<string> {
//     const sFileName = `${psFileName.replace(/ /g, '_')}.jpg`;
//     const sBase64Data = psImage.replace(/^data:image\/jpeg;base64,/, '');
//     const oBuffer = Buffer.from(sBase64Data, 'base64');

//     if (!await IsJPG(oBuffer)) {
//         throw new Error("Invalid image format");
//     }

//     const sDesPath = path.join(process.cwd(), '../media', 'images', 'news');
//     const sUsePath = `/areegator/media/images/news/`;
//     await fs.mkdir(sDesPath, { recursive: true });
//     await fs.writeFile(path.join(sDesPath, sFileName), oBuffer as any);
//     revalidatePath("/");
//     return `${sUsePath}${sFileName}`;
// };
