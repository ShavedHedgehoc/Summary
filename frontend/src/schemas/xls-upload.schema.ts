import { JSONSchemaType } from "ajv"
import { IXLSData } from "../types/upload"


const uploadItemSchema: JSONSchemaType<IXLSData> = {

    type: "object",
    properties: {
        plant: { type: "string" },
        batch: { type: "string" },
        product: { type: "string" },
        conveyor: { type: "string" },
        apparatus: { type: "string" },
        can: { type: "string" },
        plan: { type: "string" },
        prodMonth: { type: "string" },
        expired: { type: "string" },
        comments: { type: "string" },
    },
    required: [
        "plant",
        "batch",
        "product",
        "conveyor",
        "apparatus",
        "can",
        "plan",
        "prodMonth",
        "expired",
    ],
    additionalProperties: false,
}

export const uploadArraySchema = {
    type: "array",
    items: uploadItemSchema

}