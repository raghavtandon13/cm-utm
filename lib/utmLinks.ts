export const utmLinks = (phone: string) =>
    ({
        salarynow: "https://u40wz.app.link/CredMantra",
        bharatpay: "https://link.postpe.app/CHvc/CML",
        paisa247: `https://hotdeal.g2afse.com/click?pid=574&offer_id=170&sub1=${phone}`,
        none: "https://credmantra.com",
    }) as const;

export type LenderKey = keyof ReturnType<typeof utmLinks>;
