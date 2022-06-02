export interface IXLSData {
    plant: string,
    batch: string,
    product: string,
    conveyor: string,
    apparatus: string,
    can: string,
    plan: string,
    prodMonth: string,
    expired: string,
    comments: string,
}

export interface ISummaryUploadData {
    date: string,
    plant: string,
    batch: string,
    product: string,
    conveyor: string,
    apparatus: string,
    can: string,
    plan: string,
    prodMonth: string,
    expired: string,
    comments: string,
    uploaded: boolean | undefined

}

export interface ISummaryCountData {
    date: string,
    plantId: string,
    count: string,
    plant: {
        name: string
    }
}