import { z } from "zod";

const imageNameSchema = z.string().regex(/^[\u0E00-\u0E7Fa-zA-Z0-9-_()%,]+$/, {
    message: "Invalid image name.",
});

const imagePathSchema = z
    .string()
    .refine(
        (val) =>
            val.startsWith("data:image/jpeg;base64,") ||
            val.startsWith("/areegator/media/"),
        {
            message: "Invalid image path.",
        }
    );

const bannerRefLinkSchema = z
    .string()
    .refine(
        (val) =>
            val.startsWith("https://") &&
            val.includes("areegator.com/"),
        {
            message: "Invalid Ref Link.",
        }
    );

export const BannerSchema = z.object({
    bannerId: z.string().optional(),
    bannerImagePathDesktop: imagePathSchema,
    bannerImageNameDesktop: imageNameSchema,
    bannerImagePathMobile: imagePathSchema,
    bannerImageNameMobile: imageNameSchema,
    bannerRefLink: bannerRefLinkSchema,
    bIsActiveOnWeb: z.boolean(),
    bIsActiveOnApp: z.boolean(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateBannerSchema = BannerSchema.omit({ bannerId: true, createdAt: true, updatedAt: true });

export const UpdateBannerSchema = BannerSchema.partial().extend({
    bannerId: z.string().min(1, "Banner ID is required"),
});

const awDownloadTypeSchema = z
    .string()
    .refine(
        (val) =>
            val === "recruit" ||
            val === "product" ||
            val === "welcome-pax",
        {
            message: "Invalid image type.",
        }
    );

const awDownloadImagePathSchema = z
    .string()
    .refine(
        (val) =>
            val.startsWith("data:image/jpeg;base64,") ||
            val.startsWith("data:application/pdf;base64,") ||
            val.startsWith("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,") ||
            val.startsWith("data:application/vnd.ms-excel;base64,") ||
            val.startsWith("/areegator/media/"),
        {
            message: "Invalid image path.",
        }
    );

export const AwDownloadSchema = z.object({
    awDownloadId: z.string().optional(),
    awDownloadType: awDownloadTypeSchema,
    awDownloadHeaderContent: z.string().optional(),
    awDownloadImagePath: awDownloadImagePathSchema,
    awDownloadFileName: imageNameSchema,
    bIsActive: z.boolean(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateAwDownloadSchema = AwDownloadSchema.omit({ awDownloadId: true, createdAt: true, updatedAt: true });

export const UpdateAwDownloadSchema = AwDownloadSchema.partial().extend({
    awDownloadId: z.string().min(1, "AW Download ID is required"),
});

const pageNameSchema = z.string().regex(/^[a-zA-Z0-9-_]+$/, {
    message: "Invalid image name.",
});

const newsTypeSchema = z
    .string()
    .refine(
        (val) =>
            val === "news" ||
            val === "terminate-agents",
        {
            message: "Invalid type.",
        }
    );

const customHttpsLinkSchema = z
    .string()
    .refine(
        (val) =>
            (val.startsWith("https://")) || val === '',
        {
            message: "Invalid Link.",
        }
    );

const newsImageNameSchema = z
    .string()
    .refine(
        (val) => val === "" || /^[\u0E00-\u0E7Fa-zA-Z0-9-_()%,]+$/.test(val),
        { message: "Invalid image name." }
    );

const newsImagePathSchema = z
    .string()
    .refine(
        (val) =>
            val === "" ||
            val.startsWith("data:image/jpeg;base64,") ||
            val.startsWith("/areegator/media/"),
        {
            message: "Invalid image path.",
        }
    );

const IListImagesModelSchema = z.object({
    nIndex: z.number(),
    sImagePath: imagePathSchema,
    sImageName: imageNameSchema,
});

export const NewsSchema = z.object({
    newsId: z.string().optional(),
    newsType: newsTypeSchema,
    newsPageName: pageNameSchema,
    newsHeaderContent: z.string(),
    newsFullContent: z.string()
        .refine((value) => !validateTag(value), {
            message: 'Invalid content.',
        }).optional(),
    newsFooterContent: z.string()
        .refine((value) => !validateTag(value), {
            message: 'Invalid content.',
        }).optional(),
    newsImagePath: newsImagePathSchema,
    newsImageName: newsImageNameSchema,
    newsImageThumbnailPath: imagePathSchema,
    newsImageThumbnailName: imageNameSchema,
    bIsIncludeCustomLink: z.boolean(),
    sCaptionCustomLink: z.string().optional(),
    sCustomLink: customHttpsLinkSchema.optional(),
    sCustomLinkButtonName: z.string().optional(),
    sPostDate: z.date(),
    aListImages: z.array(IListImagesModelSchema),
    bIsActive: z.boolean(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateNewsSchema = NewsSchema.omit({ newsId: true, createdAt: true, updatedAt: true });

export const UpdateNewsSchema = NewsSchema.partial().extend({
    newsId: z.string().min(1, "News ID is required"),
});

const customLinkSchema = z
    .string()
    .refine(
        (val) =>
            (val.startsWith("https://") && val.includes("areegator.com/")) || val === '',
        {
            message: "Invalid Link.",
        }
    );

const customDownloadSchema = z
    .string()
    .refine(
        (val) =>
            val.startsWith("data:image/jpeg;base64,") ||
            val.startsWith("data:application/pdf;base64,") ||
            val.startsWith("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,") ||
            val.startsWith("/areegator/media/") ||
            val === '',
        {
            message: "Invalid file path.",
        }
    );

const customDownloadFileNameSchema = z
    .string()
    .refine((val) => val === '' || /^[\u0E00-\u0E7Fa-zA-Z0-9-_()%,]+$/.test(val), {
        message: 'Invalid image name.',
    });

const validateTag = (value: string) => {
    if (!value || value.trim() === '') return false;
    const patterns = [
        /<script.*?>.*?<\/script>/is,
        /<iframe.*?>.*?<\/iframe>/is,
        /<object.*?>.*?<\/object>/is,
        /<embed.*?>.*?<\/embed>/is,
        /<video.*?>.*?<\/video>/is,
        /<audio.*?>.*?<\/audio>/is,
        /<img[^>]*>/i,
        /on\w+=(["'].*?["']|["']{2})/i,
        /javascript:/i,
        /vbscript:/i,
        /data:text\/html/i,
        /eval\(.*?\)/i,
        /setTimeout\(.*?\)/i,
        /setInterval\(.*?\)/i,
        /document\.cookie/i,
        /document\.write/i,
        /window\.location/i,
        /localStorage/i,
        /sessionStorage/i,
        /&#x3C;.*?&#x3E;/i,
    ];
    return patterns.some((regex) => regex.test(value));
};

export const PromotionSchema = z.object({
    promotionId: z.string().optional(),
    promotionPageName: pageNameSchema,
    promotionHeaderContent: z.string(),
    promotionShortContent: z.string(),
    promotionStartPeriodDate: z.string()
        .transform((val) => {
            const date = new Date(val);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date format");
            }
            return date;
        }),
    promotionEndPeriodDate: z.string()
        .transform((val) => {
            const date = new Date(val);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date format");
            }
            return date;
        }),
    promotionPeriodContent: z.string(),
    promotionFullContent: z.string()
        .refine((value) => !validateTag(value), {
            message: 'Invalid content.',
        }).optional(),
    promotionFooterContent: z.string()
        .refine((value) => !validateTag(value), {
            message: 'Invalid content.',
        }).optional(),
    bIsIncludeMsigLink: z.boolean(),
    bIsIncludeCustomLink: z.boolean(),
    sCaptionCustomLink: z.string().optional(),
    sCustomLink: customLinkSchema.optional(),
    bIsIncludeCustomDownloadLink: z.boolean(),
    sCaptionCustomDownload: z.string().optional(),
    sCustomDownloadPath: customDownloadSchema.optional(),
    sCustomDownloadName: customDownloadFileNameSchema.optional(),
    promotionImagePath: imagePathSchema,
    promotionImageName: imageNameSchema,
    promotionImageThumbnailPath: imagePathSchema,
    promotionImageThumbnailName: imageNameSchema,
    bIsActive: z.boolean(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreatePromotionSchema = PromotionSchema.omit({ promotionId: true, createdAt: true, updatedAt: true });

export const UpdatePromotionSchema = PromotionSchema.partial().extend({
    promotionId: z.string().min(1, "Promotion ID is required"),
});

const videoLinkSchema = z
    .string()
    .refine(
        (val) =>
            val.startsWith("https://") &&
            val.includes("youtube.com/"),
        {
            message: "Invalid Video Link.",
        }
    );

export const VideoSchema = z.object({
    videoId: z.string().optional(),
    videoImageThumbnailPath: imagePathSchema,
    videoImageThumbnailName: imageNameSchema,
    videoHeaderContent: z.string(),
    videoLink: videoLinkSchema,
    bIsActive: z.boolean(),
    createdBy: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateVideoSchema = VideoSchema.omit({ videoId: true, createdAt: true, updatedAt: true });

export const UpdateVideoSchema = VideoSchema.partial().extend({
    videoId: z.string().min(1, "Video ID is required"),
});
